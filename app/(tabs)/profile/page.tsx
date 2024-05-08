import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';

async function getUser() {
  const session = await getSession();
  // session may or may not have ID
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  // if the session is not found, notFound will trigger response
  notFound();
}

export default async function Profile() {
  // 1. get user's Data
  const user = await getUser();
  // instead of making onClick function, use form for server action
  // because if onClick is created, we need the component for client component
  // logOut function is inline server action
  const logOut = async () => {
    'use server';
    // destory the sesstion
    const session = await getSession();
    await session.destroy();
    redirect('/');
  };
  return (
    <div>
      <h1>Welcome! {user?.username}</h1>
      <form action={logOut}>
        <button>Log out</button>
        {/* this is other way to use server action with input instead of button */}
        {/* <input type="submit" value="Log out" /> */}
      </form>
    </div>
  );
}
