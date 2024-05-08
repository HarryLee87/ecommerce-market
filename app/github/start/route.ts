import { redirect } from 'next/navigation';

export function GET() {
  const baseURL = 'https://github.com/login/oauth/authorize';
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: 'read:user, user:email',
    allow_signup: 'true',
  };
  const formattedParmas = new URLSearchParams(params).toString();
  //   console.log(formattedParmas.toString());
  const finalUrl = `${baseURL}?${formattedParmas}`;
  return redirect(finalUrl);
}
