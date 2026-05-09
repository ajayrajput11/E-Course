import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 bg-gray-50 text-center">

      {/* Illustration */}
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/404-error-illustration-download-in-svg-png-gif-file-formats--page-not-found-web-maintenance-pack-design-development-illustrations-4842126.png"
        alt="404 Not Found"
        className="w-72 md:w-96"
      />

      {/* Title */}
      <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-800">
        404 Not Found
      </h1>

      {/* Description */}
      <p className="mt-3 text-gray-600 text-lg max-w-lg">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
