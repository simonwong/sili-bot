import type React from 'react';
import { cn } from '@/lib/utils';

export interface AppLogoProps {
  className?: string;
  size?: number;
  onClick?: () => void;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  className,
  size = 100,
  onClick,
}) => {
  return (
    <div className={cn(className)} onClick={onClick}>
      <svg
        height={size}
        viewBox="0 0 72 72"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Sili-Bot</title>
        <defs>
          <filter height="130%" id="silibot-dropshadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="1" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA slope="0.3" type="linear" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="silibot-frosted-glass-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
        <g
          filter="url(#silibot-dropshadow)"
          transform="rotate(8) translate(-10, -8)"
        >
          <line
            stroke="#BCC0FF"
            strokeLinecap="round"
            strokeWidth="2"
            x1="50"
            x2="50"
            y1="20"
            y2="10"
          />
          <circle cx="50" cy="8" fill="#FFD700" r="4" />
          <circle cx="50" cy="8" fill="#FFEAA7" r="1.5" />
          <rect
            fill="rgba(142, 150, 255, 0.5)"
            filter="url(#silibot-frosted-glass-blur)"
            height="50"
            rx="10"
            ry="10"
            width="50"
            x="25"
            y="20"
          />
          <rect
            fill="transparent"
            height="50"
            rx="10"
            ry="10"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1"
            width="50"
            x="25"
            y="20"
          />
          <g
            style={{
              stroke: 'white',
              fill: 'none',
              strokeWidth: '2.5',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          >
            <circle
              cx="42"
              cy="45"
              r="5"
              style={{ fill: 'white', stroke: 'none' }}
            />
            <circle
              cx="43"
              cy="46"
              r="2"
              style={{ fill: '#2c3e50', stroke: 'none' }}
            />
            <polyline points="62,42 57,45 62,48" />
            <path d="M 40 60 Q 50 68, 60 60" />
          </g>
        </g>
      </svg>
    </div>
  );
};
