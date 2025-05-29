
import { useState } from 'react';
import { ConversionTab } from '@/types';

const CONVERSION_TABS: ConversionTab[] = [
  { id: 'jpg-to-png', label: 'JPG to PNG', fromFormat: 'jpg', toFormat: 'png', description: 'Convert JPEG images to PNG format' },
  { id: 'png-to-jpg', label: 'PNG to JPG', fromFormat: 'png', toFormat: 'jpg', description: 'Convert PNG images to JPEG format' },
  { id: 'heic-to-jpg', label: 'HEIC to JPG', fromFormat: 'heic', toFormat: 'jpg', description: 'Convert HEIC images to JPEG format' },
  { id: 'webp-to-png', label: 'WebP to PNG', fromFormat: 'webp', toFormat: 'png', description: 'Convert WebP images to PNG format' },
  { id: 'webp-to-jpg', label: 'WebP to JPG', fromFormat: 'webp', toFormat: 'jpg', description: 'Convert WebP images to JPEG format' },
  { id: 'pdf-to-jpg', label: 'PDF to JPG', fromFormat: 'pdf', toFormat: 'jpg', description: 'Convert PDF pages to JPEG images' },
  { id: 'jpg-to-pdf', label: 'JPG to PDF', fromFormat: 'jpg', toFormat: 'pdf', description: 'Convert JPEG images to PDF format' },
  { id: 'any-to-webp', label: 'Any to WebP', fromFormat: 'jpg', toFormat: 'webp', description: 'Convert any image to WebP format' },
];

interface ConversionTabsProps {
  activeTab: string;
  onTabChange: (tab: ConversionTab) => void;
}

export const ConversionTabs = ({ activeTab, onTabChange }: ConversionTabsProps) => {
  return (
    <div className="w-full">
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {CONVERSION_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab)}
              className={`
                whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mb-4">
        {CONVERSION_TABS.map((tab) => (
          activeTab === tab.id && (
            <p key={tab.id} className="text-gray-600 text-sm">
              {tab.description}
            </p>
          )
        ))}
      </div>
    </div>
  );
};
