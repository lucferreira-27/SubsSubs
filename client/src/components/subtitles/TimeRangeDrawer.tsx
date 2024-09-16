import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { FaChevronDown, FaStepForward, FaStepBackward, FaUndo } from 'react-icons/fa';

interface TimeRangeDrawerProps {
  timeRange: number[];
  maxTime: number;
  onTimeRangeChange: (values: number[]) => void;
  formatTime: (seconds: number) => string;
  onShortcutToggle: (type: 'skipOpening' | 'skipEnding') => void;
  onReset: () => void;
  activeShortcuts: { skipOpening: boolean; skipEnding: boolean };
}

const TimeRangeDrawer: React.FC<TimeRangeDrawerProps> = ({
  timeRange,
  maxTime,
  onTimeRangeChange,
  formatTime,
  onShortcutToggle,
  onReset,
  activeShortcuts,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 text-light hover:text-accent transition-colors duration-300"
      >
        <span>Filter</span>
        <FaChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 animate-fade-in">
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => onShortcutToggle('skipOpening')}
              className={`px-3 py-1 text-xs rounded-md transition-colors duration-300 flex items-center space-x-1 ${
                activeShortcuts.skipOpening
                  ? 'bg-accent text-primary'
                  : 'bg-gray-700 text-light hover:bg-gray-600'
              }`}
            >
              <FaStepForward />
              <span>Skip Opening</span>
            </button>
            <button
              onClick={() => onShortcutToggle('skipEnding')}
              className={`px-3 py-1 text-xs rounded-md transition-colors duration-300 flex items-center space-x-1 ${
                activeShortcuts.skipEnding
                  ? 'bg-accent text-primary'
                  : 'bg-gray-700 text-light hover:bg-gray-600'
              }`}
            >
              <FaStepBackward />
              <span>Skip Ending</span>
            </button>
            <button
              onClick={onReset}
              className="px-3 py-1 text-xs bg-gray-700 text-light rounded-md hover:bg-gray-600 transition-colors duration-300 flex items-center space-x-1"
            >
              <FaUndo />
              <span>Reset</span>
            </button>
          </div>
          <Range
            values={timeRange}
            step={1}
            min={0}
            max={maxTime}
            onChange={onTimeRangeChange}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                className="h-4 flex w-full items-center"
              >
                <div
                  ref={props.ref}
                  className="h-1 w-full rounded-full bg-secondary"
                  style={{
                    background: getTrackBackground({
                      values: timeRange,
                      colors: ['#2d4059', '#ff5722', '#2d4059'],
                      min: 0,
                      max: maxTime,
                    }),
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                className={`w-2 h-4 bg-accent shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 ${
                  isDragged ? 'scale-y-110' : ''
                } transition-transform duration-100`}
              />
            )}
          />
          <div className="flex justify-between text-xs text-light mt-1">
            <span>{formatTime(timeRange[0])}</span>
            <span>{formatTime(timeRange[1])}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeRangeDrawer;