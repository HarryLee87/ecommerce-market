import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContent {
  id?: number;
}
// this getSettion function is getting cookie from broswer
export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    // we can open the cookie, named 'de-ca', and we crypt the id inside the seesion(seesion.id)
    cookieName: 'de-ca',
    password: process.env.COOKIE_PASSWORD!,
  });
}
