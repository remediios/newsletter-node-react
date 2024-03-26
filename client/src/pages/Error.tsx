import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const Error = () => {
  const error = useRouteError();
  console.error(error);

  if (!isRouteErrorResponse(error)) {
    return <div>Something wrong happened...</div>;
  }

  return (
    <div className="text-center">
      <h1 className="text-red-700 font-semibold tracking-tight text-4xl">
        Oops!
      </h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.data}</i>
      </p>
    </div>
  );
};
