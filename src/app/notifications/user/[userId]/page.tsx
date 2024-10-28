// app/notifications/user/[userId]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Notification } from '@/app/types/notifications'
import { Clock, Tag, User } from 'lucide-react'

export default function UserNotifications() {
  const params = useParams()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<{
    name: string
    room: string
  } | null>(null)

  useEffect(() => {
    fetchUserNotifications()
  }, [params.userId])

  const fetchUserNotifications = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/notifications?userId=${params.userId}`)
      const data = await res.json()
      if (data.length > 0) {
        setUserInfo({
          name: data[0].userName,
          room: data[0].roomNumber,
        })
      }
      setNotifications(data)
    } catch (error) {
      console.error('Error fetching user notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const groupNotificationsByDate = (notifications: Notification[]) => {
    const groups: { [key: string]: Notification[] } = {}
    notifications.forEach((notification) => {
      const date = new Date(notification.createdAt).toLocaleDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(notification)
    })
    return groups
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-500',
      'in-progress': 'bg-blue-500/20 text-blue-500',
      completed: 'bg-green-500/20 text-green-500',
    }
    return (
      colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-500'
    )
  }

  const groupedNotifications = groupNotificationsByDate(notifications)

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* User Info Header */}
      {userInfo && (
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 rounded-full p-3">
              <User className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{userInfo.name}</h1>
              <p className="text-gray-400">Habitación {userInfo.room}</p>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Timeline */}
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
        Object.entries(groupedNotifications).map(
          ([date, dateNotifications]) => (
            <div key={date} className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="text-gray-400" />
                <h2 className="text-xl font-semibold text-white">{date}</h2>
              </div>

              <div className="space-y-4">
                {dateNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-gray-800 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-white">
                        {notification.title}
                      </h3>
                      <span className="text-sm text-gray-400">
                        {new Date(notification.createdAt).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 mb-3">
                      <Tag size={16} className="text-gray-400" />
                      <span className="text-gray-400">{notification.type}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                          notification.status
                        )}`}
                      >
                        {notification.status}
                      </span>
                    </div>

                    <p className="text-gray-300">{notification.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        )
      )}
    </div>
  )
}
