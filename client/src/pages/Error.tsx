import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const Error = () => {
  const error = useRouteError();
  console.error(error);

  if (!isRouteErrorResponse(error)) {
    return <div>Something wrong happen.</div>;
  }

  return (
    <div className="text-center text-red-700">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.data}</i>
      </p>
    </div>
  );
};
