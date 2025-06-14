import { cn } from '@/lib/utils';
import React from 'react';

export interface AppLogoProps {
  className?: string;
  size?: number;
  onClick?: () => void;
}

export const AppLogo: React.FC<AppLogoProps> = ({ className, size = 100, onClick }) => {
  return (
    <div className={cn(className)} onClick={onClick}>
      <svg width={size} height={size} viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
        <title>Sili-Bot</title>
        <defs>
          <filter id="silibot-dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"></feGaussianBlur>
            <feOffset dx="1" dy="2" result="offsetblur"></feOffset>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"></feFuncA>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
          <filter id="silibot-frosted-glass-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
        <g transform="rotate(8) translate(-10, -8)" filter="url(#silibot-dropshadow)">
          <line
            x1="50"
            y1="20"
            x2="50"
            y2="10"
            stroke="#BCC0FF"
            strokeWidth="2"
            strokeLinecap="round"
          ></line>
          <circle cx="50" cy="8" r="4" fill="#FFD700"></circle>
          <circle cx="50" cy="8" r="1.5" fill="#FFEAA7"></circle>
          <rect
            x="25"
            y="20"
            width="50"
            height="50"
            rx="10"
            ry="10"
            fill="rgba(142, 150, 255, 0.5)"
            filter="url(#silibot-frosted-glass-blur)"
          ></rect>
          <rect
            x="25"
            y="20"
            width="50"
            height="50"
            rx="10"
            ry="10"
            fill="transparent"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1"
          ></rect>
          <g
            style={{
              stroke: 'white',
              fill: 'none',
              strokeWidth: '2.5',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          >
            <circle cx="42" cy="45" r="5" style={{ fill: 'white', stroke: 'none' }}></circle>
            <circle cx="43" cy="46" r="2" style={{ fill: '#2c3e50', stroke: 'none' }}></circle>
            <polyline points="62,42 57,45 62,48"></polyline>
            <path d="M 40 60 Q 50 68, 60 60"></path>
          </g>
        </g>
      </svg>
    </div>
  );
};
