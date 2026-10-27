import { useId } from 'react';
export default function OrbitSculpture({ focus }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      className={`orbit-sculpture focus-${focus}`}
      viewBox="0 0 560 560"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${id}-metal`}
          x1="100"
          y1="60"
          x2="420"
          y2="470"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f0ffdb" />
          <stop offset=".22" stopColor="#91c5a7" />
          <stop offset=".42" stopColor="#edf9d3" />
          <stop offset=".56" stopColor="#376e55" />
          <stop offset=".72" stopColor="#b8d6a7" />
          <stop offset="1" stopColor="#e2f9ca" />
        </linearGradient>
        <radialGradient id={`${id}-core`}>
          <stop stopColor="#deedba" />
          <stop offset=".5" stopColor="#8eae80" />
          <stop offset="1" stopColor="#294d3b" />
        </radialGradient>
        <filter id={`${id}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="13" />
        </filter>
      </defs>
      <ellipse
        cx="280"
        cy="467"
        rx="122"
        ry="17"
        fill="#071f19"
        opacity=".45"
        filter={`url(#${id}-shadow)`}
      />
      <g className="sculpture-body">
        <circle cx="280" cy="260" r="54" fill={`url(#${id}-core)`} />
        {Array.from({ length: 29 }, (_, i) => (
          <ellipse
            key={i}
            cx="280"
            cy="260"
            rx={166 - Math.sin((i / 28) * Math.PI) * 27}
            ry={64 + Math.sin((i / 28) * Math.PI) * 19}
            transform={`rotate(${i * 6.43 - 38} 280 260)`}
            stroke={`url(#${id}-metal)`}
            strokeWidth="2.6"
            opacity={0.7 + i / 100}
          />
        ))}
        <ellipse
          cx="280"
          cy="260"
          rx="184"
          ry="77"
          transform="rotate(-38 280 260)"
          stroke="#d6ecc3"
          strokeWidth="1"
          opacity=".45"
        />
        <ellipse
          cx="280"
          cy="260"
          rx="197"
          ry="95"
          transform="rotate(38 280 260)"
          stroke="#b7dba7"
          strokeWidth=".6"
          opacity=".3"
          strokeDasharray="3 7"
        />
        <g className="orbit-satellite">
          <circle cx="448" cy="183" r="8" fill="#e1f1bd" />
          <circle cx="448" cy="183" r="15" stroke="#e1f1bd" opacity=".25" />
        </g>
      </g>
      <path d="M65 115h20m-10-10v20M475 400h20m-10-10v20" stroke="#b6d8bb" opacity=".6" />
    </svg>
  );
}
