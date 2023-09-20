import React from "react";

const ErrorPage = ({ error }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Error</h2>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorPage;
