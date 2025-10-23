
import React, { useState, useRef, useEffect } from 'react';
import { SiteContextPreview } from './SiteContextPreview';
import { siteContextOpts } from '../data/siteContexts';

type SiteContextOption = typeof siteContextOpts[number];

interface CustomDropdownProps {
  label: string;
  value: string;
  options: readonly SiteContextOption[];
  descriptions: { [key in SiteContextOption]: string };
  thumbnails: { [key in SiteContextOption]: string };
  onChange: (value: SiteContextOption) => void;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  value,
  options,
  descriptions,
  thumbnails,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<SiteContextOption | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleOptionClick = (option: SiteContextOption) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-brand-light mb-1">
        {label}
      </label>
      <div ref={wrapperRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-brand-panel border border-brand-border rounded-md px-3 py-2 text-left flex justify-between items-center focus:ring-brand-orange focus:border-brand-orange"
        >
          <span className="truncate">{value}</span>
          <svg className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {isOpen && hoveredOption && (
          <div className="absolute left-0 bottom-full mb-2 z-30 hidden md:block" style={{width: '256px'}}>
            <SiteContextPreview
              thumbnailUrl={thumbnails[hoveredOption]}
              description={descriptions[hoveredOption]}
            />
          </div>
        )}

        {isOpen && (
          <ul className="absolute z-20 w-full mt-1 bg-brand-panel border border-brand-border rounded-md shadow-lg max-h-60 overflow-y-auto">
            {options.map(option => (
              <li
                key={option}
                onMouseEnter={() => setHoveredOption(option)}
                onMouseLeave={() => setHoveredOption(null)}
                onClick={() => handleOptionClick(option)}
                className={`px-3 py-2 text-sm cursor-pointer ${
                  value === option
                    ? 'bg-brand-orange text-white'
                    : 'text-brand-lighter hover:bg-brand-border'
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};