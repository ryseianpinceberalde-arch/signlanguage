import { useState, type FormEvent } from 'react'
import {
  ArrowUpRight,
  CameraOff,
  Check,
  Hand,
  Info,
  ScanLine,
  Sparkles,
  Type,
} from 'lucide-react'
import './ProjectPreview.css'

const modes = ['Auto', 'Letter', 'Number', 'Word'] as const
type Mode = (typeof modes)[number]

const modeSamples: Record<Mode, { text: string; description: string }> = {
  Auto: {
    text: 'Hello',
    description: 'Automatic mode · predefined word sample',
  },
  Letter: { text: 'A', description: 'Letter mode · predefined letter sample' },
  Number: { text: '1', description: 'Number mode · predefined number sample' },
  Word: { text: 'Hello', description: 'Word mode · predefined word sample' },
}

const sampleLabels = ['A', 'B', '1', '2', 'HELLO']
const landmarkPoints = [
  [157, 235],
  [129, 216],
  [106, 193],
  [82, 176],
  [61, 163],
  [128, 171],
  [115, 134],
  [108, 104],
  [102, 78],
  [154, 157],
  [150, 115],
  [146, 82],
  [141, 54],
  [180, 161],
  [184, 124],
  [186, 95],
  [188, 72],
  [203, 174],
  [218, 145],
  [227, 123],
  [233, 105],
]

function PreviewHand() {
  return (
    <svg
      className="preview-hand"
      viewBox="0 0 310 290"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="preview-hand-fill"
          x1="75"
          y1="60"
          x2="227"
          y2="270"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#58edd0" stopOpacity=".12" />
          <stop offset="1" stopColor="#58edd0" stopOpacity=".02" />
        </linearGradient>
        <filter id="preview-node-glow">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <ellipse
        cx="156"
        cy="149"
        rx="118"
        ry="118"
        stroke="#58edd0"
        strokeOpacity=".07"
      />
      <ellipse
        cx="156"
        cy="149"
        rx="89"
        ry="89"
        stroke="#58edd0"
        strokeOpacity=".05"
      />
      <path
        d="M132 266 128 227C108 211 99 194 76 182L55 168C42 158 55 144 68 151L103 172 89 83C87 65 109 61 115 79L133 141 128 57C127 40 150 37 154 53L164 136 175 71C178 55 200 58 200 75L194 146 222 102C231 87 248 98 243 113L221 177C219 204 213 226 191 241L189 267"
        fill="url(#preview-hand-fill)"
        stroke="#58edd0"
        strokeOpacity=".3"
        strokeWidth="1.3"
      />
      <g
        stroke="#58edd0"
        strokeWidth="1.25"
        strokeOpacity=".62"
        strokeLinejoin="round"
      >
        <path d="M157 235 129 216 106 193 82 176 61 163M157 235 128 171 115 134 108 104 102 78M157 235 154 157 150 115 146 82 141 54M157 235 180 161 184 124 186 95 188 72M157 235 203 174 218 145 227 123 233 105M128 171 154 157 180 161 203 174" />
        <path
          d="M129 216 154 157M128 171 180 161M154 157 203 174M180 161 157 235"
          strokeOpacity=".18"
          strokeDasharray="3 4"
        />
      </g>
      {landmarkPoints.map(([x, y], index) => (
        <g key={index}>
          <circle
            cx={x}
            cy={y}
            r="6"
            fill="#58edd0"
            fillOpacity=".18"
            filter="url(#preview-node-glow)"
          />
          <circle
            cx={x}
            cy={y}
            r={index === 0 ? 4.5 : 3}
            fill="#07131b"
            stroke="#77f7dd"
            strokeWidth="1.4"
          />
        </g>
      ))}
      <path
        d="M21 52V29H44M266 29H289V52M289 238V261H266M44 261H21V238"
        stroke="#58edd0"
        strokeOpacity=".65"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default function ProjectPreview() {
  const [mode, setMode] = useState<Mode>('Auto')
  const [input, setInput] = useState('Hello')
  const [sample, setSample] = useState<string | null>(null)
  const [error, setError] = useState('')

  function submitSample(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = input.trim().toUpperCase()
    if (!sampleLabels.includes(value)) {
      setSample(null)
      setError(
        value
          ? 'Try a sample label: A, B, 1, 2, or Hello.'
          : 'Enter a sample label to preview the interface.',
      )
      return
    }
    setError('')
    setSample(value)
  }

  return (
    <section
      id="preview"
      className="section container project-preview"
      aria-labelledby="preview-heading"
    >
      <div className="preview-section-heading">
        <div>
          <p className="eyebrow">05 / INTERACTIVE PREVIEW</p>
          <h2 id="preview-heading">
            A glimpse of
            <br />
            <span>the conversation.</span>
          </h2>
        </div>
        <p>
          From movement to meaning. Explore a little of what the project
          interface is designed to do.
        </p>
      </div>

      <div className="preview-dashboard">
        <div className="preview-toolbar">
          <div className="preview-toolbar-brand">
            <Hand size={17} strokeWidth={1.7} />
            <span>Recognition workspace</span>
          </div>
          <span className="preview-demo-badge">
            <span /> INTERFACE DEMO
          </span>
        </div>
        <div className="preview-workspace">
          <div className="preview-camera-panel">
            <div className="preview-panel-label">
              <span>
                <ScanLine size={14} /> INPUT VISUALIZATION
              </span>
              <span className="preview-camera-status">
                <CameraOff size={13} /> Camera off
              </span>
            </div>
            <div className="preview-viewport">
              <div className="preview-viewport-grid" />
              <PreviewHand />
              <div className="preview-viewport-caption">
                <span className="preview-status-dot" /> Hand landmark
                illustration
              </div>
              <span className="preview-viewport-corner">SAMPLE VIEW</span>
            </div>
            <div className="preview-mode-row">
              <span>Recognition mode</span>
              <div
                className="preview-modes"
                role="group"
                aria-label="Choose a demonstration recognition mode"
              >
                {modes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={mode === item}
                    onClick={() => setMode(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="preview-output-panel">
            <div className="preview-panel-label">
              <span>
                <Type size={14} /> TEXT OUTPUT
              </span>
              <Sparkles size={14} />
            </div>
            <div
              className="preview-recognition"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="preview-small-label">
                Sample recognized text
              </span>
              <div className="preview-recognized-text">
                {modeSamples[mode].text}
                <span className="preview-text-caret" />
              </div>
              <p>
                <Check size={13} /> {modeSamples[mode].description}
              </p>
            </div>
            <form
              className="preview-translate"
              onSubmit={submitSample}
              noValidate
            >
              <label htmlFor="preview-sign-input">
                Text to sign <span>INTERFACE SAMPLE</span>
              </label>
              <div className="preview-input-wrap">
                <input
                  id="preview-sign-input"
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value)
                    setError('')
                    setSample(null)
                  }}
                  maxLength={30}
                  placeholder="Try Hello"
                  autoComplete="off"
                  aria-describedby="preview-input-help preview-form-status"
                  aria-invalid={Boolean(error)}
                />
                <button type="submit" aria-label="Preview text-to-sign sample">
                  <ArrowUpRight size={19} />
                </button>
              </div>
              <p id="preview-input-help" className="preview-input-help">
                Try A, B, 1, 2, or Hello.
              </p>
              <div
                id="preview-form-status"
                className={`preview-form-status${error ? ' has-error' : ''}`}
                role="status"
              >
                {error ||
                  (sample
                    ? `“${sample}” selected. Verified sign media is not yet connected to this preview.`
                    : 'Select a sample to explore the interface. Sign demonstrations will appear here when connected.')}
              </div>
            </form>
          </div>
        </div>
        <div className="preview-dashboard-footer">
          <Info size={13} />
          <p>
            Project interface preview. Predefined demonstration data; no camera
            or AI model is connected. Hand illustration is not a sign lesson.
          </p>
        </div>
      </div>
    </section>
  )
}
