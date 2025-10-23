
import React from 'react';

interface SiteContextPreviewProps {
  thumbnailUrl: string;
  description: string;
}

export const SiteContextPreview: React.FC<SiteContextPreviewProps> = ({ thumbnailUrl, description }) => {
  return (
    <div className="w-64 bg-brand-dark border border-brand-border rounded-lg shadow-2xl p-3 z-30 animate-fade-in">
      <img src={thumbnailUrl} alt="Site context preview" className="w-full rounded-md mb-2 object-cover aspect-[4/3] bg-brand-panel" loading="lazy" />
      <p className="text-xs text-brand-light">{description}</p>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
