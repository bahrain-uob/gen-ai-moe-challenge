import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Layout } from '../Layout';

export default function ErrorPage() {
  const error = useRouteError();
  console.log('Executed');

  if (!isRouteErrorResponse(error)) {
    throw error;
  }

  return (
    <Layout>
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText}</i>
        </p>
      </div>
    </Layout>
  );
}
