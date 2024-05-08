'use client';

import FormBtn from '@/components/button';
import FormInput from '@/components/input';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { login } from './actions';

export default function LogIn() {
  //   const onClick = async () => {
  //     const response = await fetch("/api/users", {
  //       method: "POST",
  //       body: JSON.stringify({ username: "harry", password: "1234" }),
  //     });
  //     console.log(await response.json());
  //   };

  const [state, dispatch] = useFormState(login, null);

  // const handleForm = async (formData: FormData) => {
  //   console.log(formData.get('email'), formData.get('password00'));
  //   ('use server');
  //   console.log('i run in the server!');
  // };

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Hello!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
        />
        <FormBtn text="Log in" />
      </form>
      {/* <span onClick={onClick}><FormBtn loading={false} text="Log in" /></span> */}
      <SocialLogin />
    </div>
  );
}
