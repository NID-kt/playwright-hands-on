'use client';

import { useState } from 'react';

const containerClass = 'h-48 w-96 p-8 bg-white shadow-md rounded-lg';
const buttonClass =
  'bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline';

function Form({
  onSubmit,
}: { onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <form onSubmit={onSubmit} className={containerClass}>
      <div className='h-full flex flex-col'>
        <div className='h-full'>
          <label
            htmlFor='name'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            名前
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <button type='submit' className={buttonClass}>
          送信
        </button>
      </div>
    </form>
  );
}

function SubmissionMessage({ onReset }: { onReset: () => void }) {
  return (
    <div className={containerClass}>
      <div className='h-full flex flex-col'>
        <p className='text-3xl text-blue-800 h-full'>送信完了</p>
        <button type='button' onClick={onReset} className={buttonClass}>
          戻る
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  return submitted ? (
    <SubmissionMessage onReset={handleReset} />
  ) : (
    <Form onSubmit={handleSubmit} />
  );
}
