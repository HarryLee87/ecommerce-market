'use server';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
  // if(user){
  //   return true
  // } else {
  //   return false
  // }
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, 'An account with this email does not exist'),
  password: z
    .string({
      required_error: 'Password is requried',
    })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(prevState: any, formData: FormData) {
  // console.log(prevState);
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // console.log(formData.get("email"), formData.get("password"));
  // console.log('I run in the server');
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    // console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // console.log(result.data);
    // find a user with the email
    // if the user is found, check passweord hash
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? 'xxxx'
    );
    // log the user in
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      // whenever session is changed, it should be saved.
      await session.save(); // this code is not persisted in the cookie
      // redirect('/profile')
      redirect('/profile');
    } else {
      return {
        fieldErrors: {
          password: ['Wrong Password.'],
          email: [],
        },
      };
    }
  }
}
