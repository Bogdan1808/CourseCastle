export default function Loading() {
  return (
    <div className="min-h-screen bg-castle-wall relative">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-300 border-t-transparent mx-auto mb-4"></div>
          <p className="text-amber-300 pixel-text">Loading Courses...</p>
        </div>
      </div>
    </div>
  )
}