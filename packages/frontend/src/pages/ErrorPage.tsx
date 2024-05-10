import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Layout } from '../Layout';

export default function ErrorPage() {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    throw error;
  }

  return (
    <Layout>
      <div>
        <h1 className="text-4xl font-light mb-6">Oops!</h1>
        <p className="mb-3">Sorry, an unexpected error has occurred </p>
        <p className="font-mono">
          -- {error.statusText} ({error.status})
        </p>
      </div>
    </Layout>
  );
}
