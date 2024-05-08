'use server';

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import getSession from '@/lib/session';

const checkUsername = (username: string) => {
  const pattern = /^(potato|tomato)$/i;
  return !pattern.test(username);
};

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
    },
  });
  // if (user) {
  //   return false;
  // } else {
  //   return true;
  // }
  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user) === false;
};

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;
// const usernameSchema = z.string();
// const emailSchema = z.string().max(255).email();
// const passwordSchema = z.string().min(8).max(15);
// const confirmPasswordSchema = z.string().min(8).max(15);
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: 'Username must be a string',
        required_error: 'Where is my username?',
      })
      .toLowerCase()
      .trim()
      .transform((username) => `${username}`)
      .refine(checkUsername, 'No patatoes allowed!!')
      .refine(checkUniqueUsername, (val) => ({
        message: `${val} This username is already taken`,
      })),
    // .refine(checkUsername, (val) => ({
    //   message: `${val} is already taken.`,
    // })),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(checkUniqueEmail, (val) => ({
        message: `${val} is already registered!`,
      })),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(3),
  })
  .refine(checkPassword, {
    message: 'Both passwords should match.',
    path: ['confirm_password'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  console.log(cookies());
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };
  //   console.log(data);
  //   usernameSchema.parse(data.username);

  //   try {
  //     formSchema.parse(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  const result = await formSchema.safeParseAsync(data);
  //   console.log(result);
  if (!result.success) {
    // console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
    // hash password
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    console.log(hashedPassword);
    // save the user to db
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    console.log(user);
    // log the user in
    const session = await getSession();
    session.id = user.id;
    await session.save();
    // redirect "/home"
    redirect('/profile');
  }
}
