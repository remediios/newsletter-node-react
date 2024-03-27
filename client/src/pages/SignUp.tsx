/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEventHandler, useEffect, useState } from 'react';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setEmail(target.value);
  };

  const handleSignUp = () => {
    if (!email) return setErrorMessage('Email is required');
    setErrorMessage('');
    console.log(email);
  };

  useEffect(() => {
    if (email) setErrorMessage('');
  }, [errorMessage]);

  return (
    <div>
      <div className="m-4 mb-10 text-center text-3xl font-bold">
        <h1>
          Welcome to the
          <span className="text-blue-600"> Newsletter Service</span>
        </h1>
        <h4 className="text-lg py-2">
          Sign the newsletter and be the first to get notified about recent
          content!
        </h4>
      </div>
      <div className="flex flex-col text-center justify-center">
        <div className="flex flex-col w-full items-center">
          <span className="text-gray-500 text-sm text-start mb-1 text-opacity-70">
            Enter your email address
          </span>
          <span className="text-red-700 text-sm text-start mb-1 text-opacity-70">
            {errorMessage}
          </span>
          <input
            value={email}
            placeholder="john@doe.com"
            onChange={handleEmailChange}
            className="border border-blue-600 w-2/5 p-2 rounded"
          />
          <button
            onClick={handleSignUp}
            className="bg-blue-800 text-white rounded-lg p-2 m-3 w-1/5 hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
