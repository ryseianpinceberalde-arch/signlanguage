import { useId } from 'react'
import { Scan, Sparkles, Activity } from 'lucide-react'

type Point = [number, number]
const fingers: Point[][] = [
  [
    [346, 417],
    [397, 366],
    [438, 332],
    [469, 301],
  ],
  [
    [342, 326],
    [354, 237],
    [364, 167],
    [369, 112],
  ],
  [
    [295, 306],
    [285, 209],
    [280, 135],
    [276, 80],
  ],
  [
    [250, 320],
    [230, 232],
    [214, 171],
    [202, 124],
  ],
  [
    [213, 354],
    [181, 290],
    [161, 244],
    [145, 208],
  ],
]
const wrist: Point = [282, 488]
const silhouette =
  'M229 558L231 489C207 465 197 425 197 375L127 219C114 190 144 180 157 202L207 292L183 134C178 104 208 97 217 125L259 274L255 82C255 51 287 48 294 78L316 275L348 109C355 80 386 86 385 116L371 324C369 360 378 368 398 350L455 286C475 263 497 285 481 308L424 384C413 428 385 467 345 490L350 558Z'

function FingerMesh({ points, index }: { points: Point[]; index: number }) {
  const width = index === 0 ? 15 : index === 4 ? 12 : 15
  const rings: { x: number; y: number; dx: number; dy: number }[] = []
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]
    const b = points[i + 1]
    const length = Math.hypot(b[0] - a[0], b[1] - a[1])
    for (let j = 0; j < 4; j++) {
      const t = j / 4
      const radius = width * (1 - (i + t) * 0.09)
      rings.push({
        x: a[0] + (b[0] - a[0]) * t,
        y: a[1] + (b[1] - a[1]) * t,
        dx: (-(b[1] - a[1]) / length) * radius,
        dy: ((b[0] - a[0]) / length) * radius,
      })
    }
  }
  return (
    <g className="finger-mesh">
      {rings.map((ring, i) => {
        const next = rings[i + 1]
        return (
          <g key={i}>
            <path
              d={`M${ring.x - ring.dx},${ring.y - ring.dy} Q${ring.x},${ring.y + 6} ${ring.x + ring.dx},${ring.y + ring.dy}`}
            />
            {next && (
              <path
                d={`M${ring.x - ring.dx},${ring.y - ring.dy}L${next.x + next.dx},${next.y + next.dy}M${ring.x + ring.dx},${ring.y + ring.dy}L${next.x + next.dx},${next.y + next.dy}M${ring.x - ring.dx},${ring.y - ring.dy}L${next.x - next.dx},${next.y - next.dy}`}
              />
            )}
          </g>
        )
      })}
    </g>
  )
}

export default function HandTracking() {
  const uid = useId().replace(/:/g, '')
  const allPoints = [wrist, ...fingers.flat()]
  return (
    <div
      className="hand-scene"
      role="img"
      aria-label="Illustration of an open hand with connected landmark points, showing the idea of computer vision hand tracking. No live camera is connected."
    >
      <div className="scene-aura" />
      <div className="scene-grid" />
      <div className="scene-orbit orbit-one" />
      <div className="scene-orbit orbit-two" />
      <span className="scene-coordinate coordinate-top">
        CV / HAND LANDMARKS
      </span>
      <span className="scene-coordinate coordinate-side">
        COMPUTER VISION → HUMAN CONNECTION
      </span>
      <div className="camera-corner corner-tl" />
      <div className="camera-corner corner-tr" />
      <div className="camera-corner corner-bl" />
      <div className="camera-corner corner-br" />
      <svg
        className="hero-hand"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`${uid}-fill`}
            x1="240"
            y1="60"
            x2="365"
            y2="560"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#60fce1" stopOpacity=".13" />
            <stop offset=".55" stopColor="#23cabb" stopOpacity=".08" />
            <stop offset="1" stopColor="#142d56" stopOpacity=".01" />
          </linearGradient>
          <linearGradient
            id={`${uid}-edge`}
            x1="276"
            y1="70"
            x2="350"
            y2="560"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a0fff0" stopOpacity=".8" />
            <stop offset=".6" stopColor="#31d1ba" stopOpacity=".4" />
            <stop offset="1" stopColor="#1a4470" stopOpacity="0" />
          </linearGradient>
          <filter
            id={`${uid}-glow`}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <clipPath id={`${uid}-clip`}>
            <path d={silhouette} />
          </clipPath>
        </defs>
        <g className="hand-model">
          <path
            d={silhouette}
            fill={`url(#${uid}-fill)`}
            stroke={`url(#${uid}-edge)`}
            strokeWidth="1.2"
          />
          <g
            clipPath={`url(#${uid}-clip)`}
            stroke="#5fedda"
            strokeWidth=".6"
            opacity=".3"
          >
            {Array.from({ length: 18 }, (_, i) => (
              <path
                key={`p${i}`}
                d={`M185 ${320 + i * 15} Q283 ${350 + i * 10} 416 ${315 + i * 14}M${192 + i * 12} 292 Q${260 + i * 7} 413 ${210 + i * 10} 578`}
              />
            ))}
            {Array.from({ length: 9 }, (_, i) => (
              <path
                key={`d${i}`}
                opacity=".45"
                d={`M174 ${315 + i * 25} L395 ${505 - i * 17}M192 ${505 - i * 25} L385 ${315 + i * 21}`}
              />
            ))}
          </g>
          {fingers.map((points, index) => (
            <FingerMesh key={index} points={points} index={index} />
          ))}
          <g
            stroke="#73f7dd"
            strokeWidth="1.5"
            strokeLinejoin="round"
            opacity=".75"
          >
            {fingers.map((points, index) => (
              <polyline
                key={index}
                points={[wrist, ...points].map((p) => p.join(',')).join(' ')}
              />
            ))}
            <polyline points={fingers.map((p) => p[0].join(',')).join(' ')} />
          </g>
          <g stroke="#8aeedc" strokeWidth=".65" opacity=".3">
            <path d="M213 354L295 306L346 417L250 320L342 326L282 488M231 489L346 417M213 354L330 398L250 320M229 558L282 488L350 558" />
          </g>
          {allPoints.map(([x, y], index) => (
            <g
              key={index}
              className="tracking-node"
              style={{ animationDelay: `${index * 0.13}s` }}
            >
              <circle
                cx={x}
                cy={y}
                r="9"
                fill="#51ffdb"
                opacity=".35"
                filter={`url(#${uid}-glow)`}
              />
              <circle
                cx={x}
                cy={y}
                r={index === 0 ? 5 : 3.6}
                fill="#0b2a2b"
                stroke="#a8fff0"
                strokeWidth="1.7"
              />
              <circle cx={x} cy={y} r="1.3" fill="#d5fff7" />
            </g>
          ))}
          <g fill="#74bfb7" fontFamily="monospace" fontSize="8">
            <text x="284" y="72">
              12
            </text>
            <text x="378" y="109">
              08
            </text>
            <text x="478" y="299">
              04
            </text>
            <text x="291" y="504">
              00
            </text>
          </g>
        </g>
        <g
          stroke="#60e6cf"
          strokeOpacity=".28"
          strokeWidth=".8"
          strokeDasharray="3 5"
        >
          <path d="M82 200H115L145 208M370 113L426 88H491M346 417L420 446H512" />
        </g>
      </svg>
      <div className="scene-scan" />
      <div className="tracking-label label-top">
        <span className="tracking-icon">
          <Scan size={17} />
        </span>
        <span>
          Hand tracking<small>LANDMARK VISUALIZATION</small>
        </span>
        <span className="status-dot" />
      </div>
      <div className="tracking-label label-right">
        <span className="mini-spark">
          <Sparkles size={14} />
        </span>
        <span>
          Gesture processing<small>FROM MOVEMENT TO MEANING</small>
        </span>
      </div>
      <div className="tracking-label label-bottom">
        <Activity size={15} />
        <span>
          Landmarks detected<small>ILLUSTRATED REFERENCE</small>
        </span>
        <span className="signal-bars">
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="scene-caption">
        <span className="tiny-cross">+</span> CONCEPT VISUALIZATION{' '}
        <span>NOT A LIVE CAMERA FEED</span>
      </div>
    </div>
  )
}
