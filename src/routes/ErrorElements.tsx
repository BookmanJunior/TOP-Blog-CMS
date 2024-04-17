import { useRouteError, Link, isRouteErrorResponse } from 'react-router-dom';
import '../styles/ErrorElement.scss';

export default function ErrorElement() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <ErrorContent errorMsg={error.statusText} />;
  }

  if (error instanceof Error) {
    return <ErrorContent errorMsg={error.message} />;
  }
}

function ErrorContent({ errorMsg }: { errorMsg: string }) {
  return (
    <div className="error-element">
      <h1>Error</h1>
      <h2>{errorMsg}</h2>
      <Link to={'/'}>Go back to main page</Link>
    </div>
  );
}
