'use client';

import { useFormStatus } from 'react-dom';

interface BtnProps {
  text: string;
}

export default function Button({ text }: BtnProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn py-2 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? 'Loading...' : text}
    </button>
  );
}
