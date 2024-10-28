// app/notifications/loading.tsx
export default function NotificationsLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-800 rounded-lg p-6 animate-pulse">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full" />
              <div className="h-4 bg-gray-700 rounded w-48" />
            </div>
            <div className="h-4 bg-gray-700 rounded w-20" />
          </div>
          <div className="h-4 bg-gray-700 rounded w-3/4 ml-10" />
        </div>
      ))}
    </div>
  )
}
