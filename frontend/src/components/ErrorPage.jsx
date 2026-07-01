import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-6">
      <div className="text-center">
        {/* Error Code */}
        <h1 className="text-8xl font-bold text-primary">404</h1>

        {/* Message */}
        <h2 className="text-3xl font-bold mt-4">Oops! Page Not Found</h2>

        <p className="text-gray-500 mt-4 max-w-md mx-auto">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/">
            <button className="btn btn-primary">Go Home</button>
          </Link>

          <button
            className="btn btn-outline"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
