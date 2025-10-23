
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-t-brand-orange border-brand-border rounded-full animate-spin"></div>
      <p className="mt-4 text-white text-lg">Rendering your image...</p>
      <p className="mt-2 text-sm text-brand-light">This may take a moment.</p>
    </div>
  );
};
