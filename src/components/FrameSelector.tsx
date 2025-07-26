import React from 'react';
import type { Frame } from '../App';

interface FrameSelectorProps {
  frames: Frame[];
  selectedFrame: Frame | null;
  onFrameSelect: (frame: Frame) => void;
}

// Helper function to get frame type description
const getFrameTypeDescription = (frameId: string): string => {
  if (frameId === 'frame1' || frameId === 'frame3') {
    return 'Circular • Profile Picture';
  }
  if (frameId === 'frame2') {
    return 'Bottom Left • Full Coverage';
  }
  if (frameId === 'frame4') {
    return 'Bottom Center • Large Frame';
  }
  if (frameId === 'frame5') {
    return 'Bottom Right • Large Frame';
  }
  if (frameId === 'frame6') {
    return 'Bottom Right • Large Frame';
  }
  return 'Standard Frame';
};

const FrameSelector: React.FC<FrameSelectorProps> = ({
  frames,
  selectedFrame,
  onFrameSelect,
}) => {
  if (frames.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No frames available</p>
        <p className="text-gray-600 text-sm mt-1">Add frame images to public/photos/ folder</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {frames.map((frame) => (
        <button
          key={frame.id}
          onClick={() => onFrameSelect(frame)}
          className={`group relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
            selectedFrame?.id === frame.id
              ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/25'
              : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
          }`}
        >
          <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden mb-2 sm:mb-3 relative">
            <img
              src={frame.imageUrl}
              alt={frame.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-500 text-xs">Frame Preview</div>';
                }
              }}
            />
            {selectedFrame?.id === frame.id && (
              <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div className="text-center">
            <p className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200 truncate mb-1">
              {frame.name}
            </p>
            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-200 leading-tight">
              {getFrameTypeDescription(frame.id)}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default FrameSelector;