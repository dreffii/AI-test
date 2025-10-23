
import React from 'react';
import { ImageUploader } from './ImageUploader';
import { RenderOptions } from '../types';
import { CustomDropdown } from './CustomDropdown';
import { siteContextOpts, siteContextDescriptions, siteContextThumbnails } from '../data/siteContexts';

interface SidebarProps {
  renderOptions: RenderOptions;
  setRenderOptions: React.Dispatch<React.SetStateAction<RenderOptions>>;
  onRender: () => void;
  onResetControls: () => void;
}

const SelectControl: React.FC<{
  label: string;
  name: keyof RenderOptions;
  value: string;
  options: readonly string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ label, name, value, options, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-brand-light mb-1">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-brand-panel border border-brand-border rounded-md px-3 py-2 focus:ring-brand-orange focus:border-brand-orange"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const CheckboxControl: React.FC<{
  label: string;
  name: keyof RenderOptions;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer text-brand-light hover:text-white">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="accent-brand-orange h-4 w-4 rounded"
    />
    {label}
  </label>
);

const viewAngleOpts = ["Default Angle", "Professional Archviz", "Eye-Level", "High-Angle", "Low-Angle", "Aerial / Drone", "Close-up", "Wide Shot", "Bird's Eye View", "View From Inside (Building to Outside)"] as const;
const aspectRatioOpts = ["1:1", "16:9", "9:16", "4:3", "3:4"] as const;
const depthOfFieldOpts = ["None", "Subtle", "Moderate", "Strong"] as const;
const motionBlurOpts = ["None", "Light", "Medium", "Heavy"] as const;
const timeOfDayOpts = ["Day", "Soft Daylight", "Midday Sun", "Night", "Golden Hour", "Blue Hour", "Dawn", "Dusk", "Archviz Daylight", "Purple Hour", "Evening", "Sunrise", "Sunset", "Early Morning", "Late Afternoon", "Twilight", "Moonlit Night", "Foggy Morning", "Overcast Noon", "Rainy Afternoon", "Stormy Evening", "Snowy Morning", "Winter Sunset", "Summer Sunrise", "Autumn Evening", "Spring Twilight", "Cloudy Afternoon", "Evening Glow", "Evening Mist", "Warm Sunset", "Cold Sunrise", "Night with Streetlights", "Misty Morning", "Foggy Evening", "Purple Twilight"] as const;
const weatherOpts = ["Clear", "Overcast", "Rainy", "Light Rain", "Stormy", "Foggy", "Snowy"] as const;
const windStrengthOpts = ["None", "Light Breeze", "Strong Wind"] as const;
const interiorLightsOpts = ["On", "Off"] as const;
const activeReflectionOpts = ["None", "Subtle", "Moderate", "Strong"] as const;
const renderStyleOpts = ["Photorealistic", "Ultra Realistic", "Interior Design", "Isometric", "Axonometric View", "Architectural Presentation", "Explosion Analysis", "Handmade Wooden Model", "Concept Sketch", "Under Construction", "Architect's Desk", "Mood Board"] as const;
const moodStyleOpts = ["neutral", "modern", "minimalist", "classic", "futuristic", "conceptual", "organic", "artistic", "natural", "surreal", "urban", "abstract", "industrial", "romantic", "dramatic", "luxurious", "dark", "bright", "cinematic", "fantasy", "storytelling"] as const;

export const Sidebar: React.FC<SidebarProps> = ({ renderOptions, setRenderOptions, onRender, onResetControls }) => {
  const handleFileChange = (field: 'inputImage' | 'referenceImage') => (file: File | null) => {
    setRenderOptions(prev => ({ ...prev, [field]: file }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRenderOptions(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setRenderOptions(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRenderOptions(prev => ({ ...prev, [name]: value }));
  };

  return (
    <aside className="w-full md:w-96 bg-brand-dark p-4 rounded-lg flex flex-col flex-shrink-0">
      <div className="flex-grow space-y-6 overflow-y-auto pr-2">
        <div className="flex items-center gap-2">
          <button className="text-brand-light hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold">Controls</h2>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">1. Input Image</h3>
          <ImageUploader label="Upload your image" onFileSelect={handleFileChange('inputImage')} />
          <div className="mt-4 text-sm text-brand-light">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="imageStyle" className="accent-brand-orange" defaultChecked/> Default Image</label>
              <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="imageStyle" className="accent-brand-orange"/> Style Image 1</label>
              <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="imageStyle" className="accent-brand-orange"/> Style Image 2</label>
            </div>
            <p className="text-xs mt-2 text-gray-400">* Note: It is recommended to convert the Input Image Styles for the best AI recognition.</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">2. Reference Image (Style)</h3>
          <ImageUploader label="Upload reference image" onFileSelect={handleFileChange('referenceImage')} />
          <p className="text-xs mt-2 text-gray-400">* Function: Used for referencing ideas, style, lighting, materials. Not 100% accurate.</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">3. Creative Controls</h3>
            <button 
              onClick={onResetControls}
              className="text-sm text-brand-light hover:text-brand-orange transition-colors underline"
              title="Reset all creative controls to default"
            >
              Reset
            </button>
          </div>
          <div className="space-y-4">
            <SelectControl label="🎥 View / Camera Angle" name="viewAngle" value={renderOptions.viewAngle} options={viewAngleOpts} onChange={handleSelectChange} />
            <SelectControl label="🖼️ Aspect Ratio" name="aspectRatio" value={renderOptions.aspectRatio} options={aspectRatioOpts} onChange={handleSelectChange} />
            <SelectControl label="🔍 Depth of Field" name="depthOfField" value={renderOptions.depthOfField} options={depthOfFieldOpts} onChange={handleSelectChange} />
            <SelectControl label="💨 Motion Blur" name="motionBlur" value={renderOptions.motionBlur} options={motionBlurOpts} onChange={handleSelectChange} />
            <SelectControl label="🌞 Time of Day" name="timeOfDay" value={renderOptions.timeOfDay} options={timeOfDayOpts} onChange={handleSelectChange} />
            <SelectControl label="🌦 Weather" name="weather" value={renderOptions.weather} options={weatherOpts} onChange={handleSelectChange} />
            <SelectControl label="🌬 Wind Strength" name="windStrength" value={renderOptions.windStrength} options={windStrengthOpts} onChange={handleSelectChange} />
            <SelectControl label="💡 Interior Lights" name="interiorLights" value={renderOptions.interiorLights} options={interiorLightsOpts} onChange={handleSelectChange} />
            <SelectControl label="✨ Active Reflection" name="activeReflection" value={renderOptions.activeReflection} options={activeReflectionOpts} onChange={handleSelectChange} />
            <SelectControl label="🎨 Render Style" name="renderStyle" value={renderOptions.renderStyle} options={renderStyleOpts} onChange={handleSelectChange} />
            
            <CustomDropdown 
              label="🏙 Site Context"
              value={renderOptions.siteContext}
              options={siteContextOpts}
              descriptions={siteContextDescriptions}
              thumbnails={siteContextThumbnails}
              onChange={(newValue) => setRenderOptions(prev => ({ ...prev, siteContext: newValue }))}
            />
            
            <div>
              <label htmlFor="additionalSitePrompt" className="block text-sm font-medium text-brand-light mb-1">
                Additional Prompt (optional)
              </label>
              <textarea
                id="additionalSitePrompt"
                name="additionalSitePrompt"
                value={renderOptions.additionalSitePrompt}
                onChange={handleTextAreaChange}
                rows={3}
                className="w-full bg-brand-panel border border-brand-border rounded-md px-3 py-2 focus:ring-brand-orange focus:border-brand-orange"
                placeholder="Add any extra description or context for the site..."
              />
            </div>

            <SelectControl label="🎭 Mood / Style" name="moodStyle" value={renderOptions.moodStyle} options={moodStyleOpts} onChange={handleSelectChange} />

            <div className="pt-2">
                <h4 className="font-semibold text-md mb-2">🛠 Add Objects</h4>
                <div className="grid grid-cols-2 gap-2">
                    <CheckboxControl label="🪑 Furniture" name="addFurniture" checked={renderOptions.addFurniture} onChange={handleCheckboxChange} />
                    <CheckboxControl label="🚗 Vehicles" name="addVehicles" checked={renderOptions.addVehicles} onChange={handleCheckboxChange} />
                    <CheckboxControl label="🧑 People" name="addPeople" checked={renderOptions.addPeople} onChange={handleCheckboxChange} />
                    <CheckboxControl label="🌳 Trees & Veg." name="addTrees" checked={renderOptions.addTrees} onChange={handleCheckboxChange} />
                    <CheckboxControl label="🪑 Street Furniture" name="addStreetFurniture" checked={renderOptions.addStreetFurniture} onChange={handleCheckboxChange} />
                    <CheckboxControl label="🌟 Foreground" name="addForegroundElements" checked={renderOptions.addForegroundElements} onChange={handleCheckboxChange} />
                </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex-shrink-0">
        <button
          onClick={onRender}
          className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg shadow-lg"
          aria-label="Generate AI rendering"
        >
          Generate Image
        </button>
      </div>
    </aside>
  );
};