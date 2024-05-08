import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  console.log(request);
  return Response.json({
    ok: true,
  });
}

export async function POST(request: NextRequest) {
  //   request.cookies.get('here name of cookie');   // get cookie
  const data = await request.json();
  console.log('log the user in!!');
  return Response.json(data);
}
