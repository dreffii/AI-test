
import React from 'react';

interface HeaderProps {
    onRender: () => void;
}

const NavButton: React.FC<{ children: React.ReactNode; active?: boolean; onClick?: () => void }> = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm rounded-md transition-colors ${
      active
        ? 'bg-brand-orange text-white'
        : 'bg-brand-panel hover:bg-brand-border text-brand-lighter'
    }`}
  >
    {children}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ onRender }) => {
  return (
    <header className="bg-brand-green text-white shadow-lg">
      <div className="container mx-auto px-4 py-2 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-wider">3DMILI.ORG - APPS AUTO RENDERING™</h1>
          <p className="text-xs text-green-200">AI-POWERED PROMPT GENERATION TOOL FOR ARCHITECTURAL AND INTERIOR RENDERING FROM 3D MODELS LIKE SKETCHUP, 3DS MAX, REVIT...</p>
        </div>
        <nav className="w-full flex flex-wrap justify-center items-center gap-2 mt-3 pb-2 border-b border-green-700">
            <NavButton active onClick={onRender}>Render AI - Exterior</NavButton>
            <NavButton>Render AI - Interior</NavButton>
            <NavButton>New Angle</NavButton>
            <NavButton>Zoom Detail</NavButton>
            <NavButton>Edit Image</NavButton>
            <NavButton>Sharpen Image</NavButton>
            <NavButton>Image to Video</NavButton>
            <NavButton>Other Utilities</NavButton>
            <div className="ml-auto hidden md:block">
                <button className="bg-brand-panel hover:bg-brand-border text-brand-lighter px-4 py-2 text-sm rounded-md flex items-center gap-2">
                    EN English
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </nav>
      </div>
    </header>
  );
};
