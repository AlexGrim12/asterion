'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Clock, AlertCircle, User, BedDouble, Tag, AlertTriangle } from 'lucide-react'

// Define types for our notifications
type BaseNotification = {
  _id: string;
  id: string;
  status: string;
  description: string;
  createdAt?: string;
  created_at?: string;
}

type GuestNotification = BaseNotification & {
  userId: string;
  userName: string;
  roomNumber: string;
  title?: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
}

type SystemNotification = BaseNotification & {
  track_id: string;
  timestamp: string;
  images?: string[];
}

type NotificationType = GuestNotification | SystemNotification;

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'bg-red-500 text-white';
    case 'medium':
      return 'bg-yellow-500 text-white';
    case 'low':
      return 'bg-green-500 text-white';
    default:
      return 'bg-blue-500 text-white';
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-500 text-white';
    case 'pending':
      return 'bg-yellow-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export default function AllNotifications() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/notifications')
      const data = await res.json()
      setNotifications(data)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const isGuestNotification = (notification: NotificationType): notification is GuestNotification => {
    return 'userName' in notification
  }

  const filteredNotifications = notifications.filter((notification) =>
    notification.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (isGuestNotification(notification) && notification.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    ('track_id' in notification && notification.track_id.includes(searchTerm))
  )

  const getTimestamp = (notification: NotificationType) => {
    if (isGuestNotification(notification)) {
      return notification.createdAt
    }
    return notification.created_at || notification.timestamp
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">All Notifications</h1>
        <p className="text-gray-400 mt-2">Manage and filter all system notifications</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by description, name, or track ID..."
              className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-1/4 mb-4" />
              <div className="h-4 bg-gray-700 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification._id}
              onClick={() => router.push(`/notifications/${notification._id}`)}
              className="bg-gray-800 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  {isGuestNotification(notification) ? (
                    <>
                      <User className="text-gray-400" size={20} />
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {notification.userName}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <BedDouble size={16} />
                          <span>Room {notification.roomNumber}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                      System Alert #{notification.track_id}
                    </h3>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  {isGuestNotification(notification) && (
                    <>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(notification.priority)}`}>
                        {notification.priority}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-700 text-white">
                        {notification.type}
                      </span>
                    </>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(notification.status)}`}>
                    {notification.status}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{notification.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{new Date(getTimestamp(notification)).toLocaleString()}</span>
                </div>
              </div>

              {'images' in notification && notification.images && (
                <div className="flex space-x-2 mt-4">
                  {notification.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Notification image ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}