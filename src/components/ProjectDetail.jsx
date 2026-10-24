import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useCallback, useRef } from 'react'
import { FiArrowLeft, FiGithub, FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from 'react-icons/fi'
import projects from '../data/projects'

/* ─── Lightbox with Zoom ─── */
function Lightbox({ screenshots, initialIndex, projectTitle, onClose }) {
  const [current, setCurrent]         = useState(initialIndex)
  const [isAnimating, setIsAnimating] = useState(false)
  const [zoom, setZoom]               = useState(1)
  const [offset, setOffset]           = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging]   = useState(false)
  const containerRef   = useRef(null)
  const mousePos       = useRef({ x: 0, y: 0 })   // relative to container center
  const zoomRef        = useRef(1)                  // mirror of zoom for wheel handler
  const offsetRef      = useRef({ x: 0, y: 0 })    // mirror of offset for wheel handler
  const dragOrigin     = useRef(null)
  const lastPinchDist  = useRef(null)

  const MIN_ZOOM = 1
  const MAX_ZOOM = 5
  const STEP     = 0.5
  const total    = screenshots.length

  const clampZoom = (z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z))

  /* keep refs in sync so the wheel handler (closure) always has latest values */
  const syncState = (newZoom, newOffset) => {
    zoomRef.current   = newZoom
    offsetRef.current = newOffset
    setZoom(newZoom)
    setOffset(newOffset)
  }

  const resetZoom = useCallback(() => {
    syncState(1, { x: 0, y: 0 })
  }, [])

  /* zoom toward a given screen-space pivot point (relative to container center) */
  const zoomToward = useCallback((pivotX, pivotY, delta) => {
    const oldZoom   = zoomRef.current
    const oldOffset = offsetRef.current
    const newZoom   = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, oldZoom + delta))
    if (newZoom === oldZoom) return
    // image-space point under the pivot cursor:
    //   screenPos = containerCenter + zoom * imagePoint + offset
    //   => imagePoint = (pivotPos - oldOffset) / oldZoom
    const imgX = (pivotX - oldOffset.x) / oldZoom
    const imgY = (pivotY - oldOffset.y) / oldZoom
    // new offset so that same image point stays under cursor:
    //   newOffset = pivotPos - newZoom * imagePoint
    const newOffset = newZoom === 1
      ? { x: 0, y: 0 }
      : { x: pivotX - imgX * newZoom, y: pivotY - imgY * newZoom }
    syncState(newZoom, newOffset)
  }, [])

  const zoomIn  = useCallback(() => zoomToward(0, 0, STEP),  [zoomToward])
  const zoomOut = useCallback(() => zoomToward(0, 0, -STEP), [zoomToward])

  const goTo = useCallback((index) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((index + total) % total)
    syncState(1, { x: 0, y: 0 })
    setTimeout(() => setIsAnimating(false), 250)
  }, [isAnimating, total])

  const prev = useCallback(() => goTo(current - 1), [current, goTo])
  const next = useCallback(() => goTo(current + 1), [current, goTo])

  /* keyboard + scroll wheel */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape')               { if (zoom > 1) resetZoom(); else onClose() }
      if (e.key === 'ArrowLeft'  && zoom === 1) prev()
      if (e.key === 'ArrowRight' && zoom === 1) next()
      if (e.key === '+' || e.key === '=')   zoomIn()
      if (e.key === '-')                     zoomOut()
      if (e.key === '0')                     resetZoom()
    }
    const handleWheel = (e) => {
      e.preventDefault()
      // Compute cursor position relative to the container's center
      if (!containerRef.current) return
      const rect    = containerRef.current.getBoundingClientRect()
      const pivotX  = e.clientX - (rect.left + rect.width  / 2)
      const pivotY  = e.clientY - (rect.top  + rect.height / 2)
      const delta   = e.deltaY < 0 ? STEP : -STEP
      const oldZoom = zoomRef.current
      const oldOff  = offsetRef.current
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, oldZoom + delta))
      if (newZoom === oldZoom) return
      const imgX      = (pivotX - oldOff.x) / oldZoom
      const imgY      = (pivotY - oldOff.y) / oldZoom
      const newOffset = newZoom === 1
        ? { x: 0, y: 0 }
        : { x: pivotX - imgX * newZoom, y: pivotY - imgY * newZoom }
      syncState(newZoom, newOffset)
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('wheel', handleWheel, { passive: false })
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('wheel', handleWheel)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next, zoomIn, zoomOut, resetZoom, zoom])

  /* mouse drag-to-pan */
  const onMouseDown = (e) => {
    if (zoom <= 1) return
    e.preventDefault()
    setIsDragging(true)
    dragOrigin.current = { x: e.clientX - offset.x, y: e.clientY - offset.y }
  }
  const onMouseMove = (e) => {
    // always track mouse position relative to container center (for cursor-aware zoom)
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mousePos.current = {
        x: e.clientX - (rect.left + rect.width  / 2),
        y: e.clientY - (rect.top  + rect.height / 2),
      }
    }
    if (!isDragging || zoom <= 1 || !dragOrigin.current) return
    const newOff = { x: e.clientX - dragOrigin.current.x, y: e.clientY - dragOrigin.current.y }
    offsetRef.current = newOff
    setOffset(newOff)
  }
  const onMouseUp = () => { setIsDragging(false); dragOrigin.current = null }

  /* touch pinch + drag */
  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      lastPinchDist.current = Math.hypot(dx, dy)
    } else if (e.touches.length === 1 && zoom > 1) {
      setIsDragging(true)
      dragOrigin.current = { x: e.touches[0].clientX - offset.x, y: e.touches[0].clientY - offset.y }
    }
  }
  const onTouchMove = (e) => {
    if (e.touches.length === 2 && lastPinchDist.current != null) {
      e.preventDefault()
      const dx   = e.touches[0].clientX - e.touches[1].clientX
      const dy   = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const ratio = dist / lastPinchDist.current
      // midpoint of the two fingers as pivot (relative to container center)
      if (containerRef.current) {
        const rect   = containerRef.current.getBoundingClientRect()
        const midX   = (e.touches[0].clientX + e.touches[1].clientX) / 2
        const midY   = (e.touches[0].clientY + e.touches[1].clientY) / 2
        const pivotX = midX - (rect.left + rect.width  / 2)
        const pivotY = midY - (rect.top  + rect.height / 2)
        const oldZoom = zoomRef.current
        const oldOff  = offsetRef.current
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, oldZoom * ratio))
        const imgX    = (pivotX - oldOff.x) / oldZoom
        const imgY    = (pivotY - oldOff.y) / oldZoom
        const newOffset = newZoom === 1
          ? { x: 0, y: 0 }
          : { x: pivotX - imgX * newZoom, y: pivotY - imgY * newZoom }
        syncState(newZoom, newOffset)
      }
      lastPinchDist.current = dist
    } else if (e.touches.length === 1 && isDragging && zoom > 1 && dragOrigin.current) {
      const newOff = { x: e.touches[0].clientX - dragOrigin.current.x, y: e.touches[0].clientY - dragOrigin.current.y }
      offsetRef.current = newOff
      setOffset(newOff)
    }
  }
  const onTouchEnd = () => { setIsDragging(false); lastPinchDist.current = null }

  const zoomPct = Math.round(zoom * 100)

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
      onClick={zoom === 1 ? onClose : undefined}
    >
      {/* ── Top bar ── */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 z-20"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-white/70 text-sm font-medium">
          {projectTitle} — {current + 1} / {total}
        </span>

        {/* Zoom controls */}
        <div className="flex items-center gap-1.5">
          {/* Zoom out */}
          <button
            id="lightbox-zoom-out-btn"
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Zoom out"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>

          {/* Zoom % badge — click resets */}
          <button
            id="lightbox-zoom-reset-btn"
            onClick={resetZoom}
            className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/25 text-white text-xs font-mono font-semibold transition-colors min-w-[52px] text-center"
            aria-label="Reset zoom"
            title="Klik untuk reset zoom"
          >
            {zoomPct}%
          </button>

          {/* Zoom in */}
          <button
            id="lightbox-zoom-in-btn"
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Zoom in"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>

          <div className="w-px h-5 bg-white/20 mx-1" />

          {/* Close */}
          <button
            id="lightbox-close-btn"
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
            aria-label="Close lightbox"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Image area ── */}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden flex items-center justify-center"
        style={{
          paddingTop: 56,
          paddingBottom: total > 1 ? 72 : 16,
          paddingLeft: 60,
          paddingRight: 60,
          cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
          userSelect: 'none',
        }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          key={current}
          src={screenshots[current]}
          alt={`${projectTitle} screenshot ${current + 1}`}
          draggable={false}
          className="rounded-lg shadow-2xl select-none"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            animation: 'lightbox-fade 0.22s ease',
            transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.18s ease',
          }}
        />

        {/* Zoom hint at 100% */}
        {zoom === 1 && (
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 text-white/55 text-xs pointer-events-none whitespace-nowrap"
            style={{ animation: 'hint-fade 3s ease forwards' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 flex-shrink-0">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
            Scroll atau klik + untuk zoom
          </div>
        )}
      </div>

      {/* ── Prev / Next (hidden when zoomed) ── */}
      {total > 1 && zoom === 1 && (
        <>
          <button
            id="lightbox-prev-btn"
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
            aria-label="Previous screenshot"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          <button
            id="lightbox-next-btn"
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
            aria-label="Next screenshot"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* ── Thumbnail strip ── */}
      {total > 1 && (
        <div
          className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 px-4 py-3 overflow-x-auto z-10"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {screenshots.map((src, i) => (
            <button
              key={i}
              id={`lightbox-thumb-${i}`}
              onClick={() => goTo(i)}
              className={`flex-shrink-0 rounded overflow-hidden transition-all duration-200 ${
                i === current
                  ? 'ring-2 ring-white opacity-100 scale-110'
                  : 'opacity-40 hover:opacity-70'
              }`}
              style={{ width: 48, height: 32 }}
              aria-label={`Go to screenshot ${i + 1}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      )}

      {/* Shortcut hint saat zoom aktif */}
      {zoom > 1 && (
        <div className="absolute bottom-4 right-4 px-3 py-2 rounded-xl bg-black/60 text-white/45 text-xs z-20 pointer-events-none leading-relaxed">
          <div>🖱 Scroll — zoom</div>
          <div>✋ Drag — geser gambar</div>
          <div>Esc — reset zoom</div>
        </div>
      )}

      <style>{`
        @keyframes lightbox-fade {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes hint-fade {
          0%, 50% { opacity: 0.7; }
          100%    { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

const ICON_MAP = {
  accuracy: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  speed: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  star: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
}

function MetricCard({ metric }) {
  const icon = ICON_MAP[metric.icon] ?? ICON_MAP.accuracy

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(99,102,241,0.06) 100%)',
        borderColor: 'rgba(99,102,241,0.2)',
      }}
      className="relative rounded-xl border p-5 flex flex-col gap-3 group hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all duration-300"
    >
      {/* Icon badge */}
      <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Stat value */}
      <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 tracking-tight leading-none">
        {metric.value}
      </div>

      {/* Label */}
      <div className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
        {metric.label}
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-indigo-200 dark:bg-indigo-700/60" />

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {metric.description}
      </p>
    </div>
  )
}

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Project Not Found</h1>
          <Link to="/" className="text-blue-500 dark:text-blue-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">

        {/* Back button */}
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-6 sm:mb-8"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-wrap items-start gap-4 mb-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50">
              {project.title}
            </h1>
            <span className={`px-3 py-1 text-xs rounded-full font-medium ${
              project.status.includes('production')
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : project.status.includes('development')
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
              {project.status}
            </span>
          </div>
          <p className="text-lg text-gray-500 dark:text-gray-400 italic mb-4">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <FiGithub className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
            Overview
          </h2>
          <div className="space-y-4">
            {project.fullDescription.map((paragraph, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Impact & Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-1">
              Impact &amp; Metrics
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Measured outcomes from testing, user evaluation, and real-world deployment.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
              ))}
            </div>
          </div>
        )}

        {/* Screenshots */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Screenshots
          </h2>
          {project.screenshots.length > 0 ? (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Klik gambar untuk melihat lebih jelas. Gunakan tombol ← → atau keyboard untuk navigasi.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.screenshots.map((src, index) => (
                  <button
                    key={index}
                    id={`screenshot-${index}`}
                    onClick={() => setLightboxIndex(index)}
                    className="group relative rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all duration-200 hover:border-indigo-400/60 dark:hover:border-indigo-500/60 hover:shadow-lg dark:hover:shadow-slate-900/50"
                    aria-label={`View ${project.title} screenshot ${index + 1} in fullscreen`}
                  >
                    <img
                      src={src}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    {/* Zoom overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-200">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-gray-800 dark:text-gray-100 text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 shadow-md">
                        <FiZoomIn className="w-3.5 h-3.5" />
                        Lihat penuh
                      </div>
                    </div>
                    {/* Index badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-semibold bg-black/50 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {index + 1} / {project.screenshots.length}
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600 p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Screenshots coming soon</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Add images to{' '}
                <code className="px-2 py-0.5 bg-gray-100 dark:bg-slate-700 rounded text-xs">
                  app/public/screenshots/
                </code>{' '}
                and update the data file.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>

    {/* Lightbox */}
    {lightboxIndex !== null && (
      <Lightbox
        screenshots={project.screenshots}
        initialIndex={lightboxIndex}
        projectTitle={project.title}
        onClose={() => setLightboxIndex(null)}
      />
    )}
    </>
  )
}

export default ProjectDetail
