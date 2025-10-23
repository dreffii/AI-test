
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ResultPanel } from './components/ResultPanel';
import { RenderOptions } from './types';
import { renderWithAi } from './services/geminiService';
import { LoadingSpinner } from './components/LoadingSpinner';

const initialRenderOptions: Omit<RenderOptions, 'inputImage' | 'referenceImage'> = {
  viewAngle: 'Default Angle',
  aspectRatio: '1:1',
  depthOfField: 'None',
  motionBlur: 'None',
  timeOfDay: 'Day',
  weather: 'Clear',
  windStrength: 'None',
  interiorLights: 'On',
  activeReflection: 'None',
  renderStyle: 'Photorealistic',
  siteContext: 'Enhance Only (No Context)',
  additionalSitePrompt: '',
  moodStyle: 'neutral',
  addFurniture: false,
  addVehicles: false,
  addPeople: false,
  addTrees: true,
  addStreetFurniture: false,
  addForegroundElements: false,
};


const App: React.FC = () => {
  const [renderOptions, setRenderOptions] = useState<RenderOptions>({
    ...initialRenderOptions,
    inputImage: null,
    referenceImage: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'result' | 'history'>('result');

  const handleRender = async () => {
    if (!renderOptions.inputImage) {
      setError('Input image is required.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    setActiveTab('result');

    try {
      const result = await renderWithAi(renderOptions);
      if(result) {
        setGeneratedImage(result);
        setHistory(prev => [result, ...prev]);
      } else {
        setError('Failed to generate image. The model did not return an image.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResetControls = () => {
    setRenderOptions(prev => ({
      ...initialRenderOptions,
      inputImage: prev.inputImage, // Keep existing images
      referenceImage: prev.referenceImage,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-darker">
      {isLoading && <LoadingSpinner />}
      <Header onRender={handleRender} />
      <main className="flex-grow flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
        <Sidebar 
          renderOptions={renderOptions} 
          setRenderOptions={setRenderOptions} 
          onRender={handleRender}
          onResetControls={handleResetControls}
        />
        <ResultPanel 
          generatedImage={generatedImage} 
          history={history}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          error={error}
        />
      </main>
    </div>
  );
};

export default App;