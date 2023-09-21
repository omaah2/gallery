const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-10 h-10 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin"></div>
          <div className="text-xl font-semibold text-purple-800">Loading...</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
