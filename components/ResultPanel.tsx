
import React from 'react';

interface ResultPanelProps {
  generatedImage: string | null;
  history: string[];
  activeTab: 'result' | 'history';
  setActiveTab: (tab: 'result' | 'history') => void;
  error: string | null;
}

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? 'text-brand-orange border-b-2 border-brand-orange'
        : 'text-brand-light hover:text-white border-b-2 border-transparent'
    }`}
  >
    {children}
  </button>
);

export const ResultPanel: React.FC<ResultPanelProps> = ({ generatedImage, history, activeTab, setActiveTab, error }) => {
  return (
    <div className="flex-grow bg-brand-dark p-4 rounded-lg flex flex-col">
      <div className="border-b border-brand-border flex-shrink-0">
        <TabButton active={activeTab === 'result'} onClick={() => setActiveTab('result')}>Result</TabButton>
        <TabButton active={activeTab === 'history'} onClick={() => setActiveTab('history')}>History</TabButton>
      </div>

      <div className="flex-grow mt-4 overflow-auto">
        {activeTab === 'result' && (
          <div className="w-full h-full flex items-center justify-center">
            {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
            {generatedImage ? (
                <img src={generatedImage} alt="Generated result" className="max-w-full max-h-full object-contain rounded-lg"/>
            ) : (
                !error && <div className="text-brand-light">Your generated image will appear here.</div>
            )}
          </div>
        )}
        {activeTab === 'history' && (
           history.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {history.map((img, index) => (
                <div key={index} className="aspect-square bg-brand-panel rounded-lg overflow-hidden">
                  <img src={img} alt={`History item ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
           ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-light">
                Your render history is empty.
            </div>
           )
        )}
      </div>
    </div>
  );
};
