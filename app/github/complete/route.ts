import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  //get temporary gitub code after code text
  const code = request.nextUrl.searchParams.get('code');
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  // exchange the code to token by usding POST
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code: code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;

  // send POST request to this URL
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });
  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }
  //make a request
  const userProfileResponse = await fetch('https://api.github.com/user', {
    // send the token inside Authorization header
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    // by Nextjs's default, Nextjs automatically caches the returned values of getch in the data cache on the server, because this request has to be different by every single user.
    cache: 'no-cache',
  });
  const { id, avatar_url, login } = await userProfileResponse.json();
  const user = await db.user.findUnique({
    where: {
      //id + '' => because the json provides the id as number. need to change it to string, refering the prisma model
      github_id: id + '',
    },
    select: {
      id: true,
    },
  });
  // if the user exists, we don't need to make new account, and let the user log in and then take the user into profile page.
  if (user) {
    const session = await getSession();
    session.id = user.id;
    await session.save();
    return redirect('/profile');
  }
  // if the user does'nt exist, need to create new account.
  const newUser = await db.user.create({
    data: {
      username: login,
      github_id: id + '',
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });
  // let the new user log in
  const session = await getSession();
  session.id = newUser.id;
  await session.save();
  return redirect('/profile');
  //   return Response.json({ code });
  //   return Response.json({ userProfileData });
}
