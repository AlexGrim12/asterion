export type NotificationStatus = 'pending' | 'completed' | 'in-progress'
export type NotificationPriority = 'low' | 'medium' | 'high'
export type NotificationType =
  | 'fall-detection'
  | 'room-service'
  | 'emergency'
  | 'maintenance'

// types/notifications.ts
// types/notifications.ts

export interface Notification {
  _id: string
  track_id: string
  timestamp: string
  description: string
  images: string[] // Asegúrate de que esto esté tipado como string[]
  type: string
  status: string
  created_at: string
  id: string
}

export interface FilterOptions {
  type: string
  priority: string
  status: string
}

// types/notifications.ts
export interface INotification {
  _id?: string
  id: string
  userId: string
  userName: string
  roomNumber: string
  type: 'fall-detection' | 'room-service' | 'emergency' | 'maintenance'
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'completed' | 'in-progress'
  title: string
  description: string
  createdAt: Date
}

export interface NotificationFilters {
  userId?: string
  type?: INotification['type']
  priority?: INotification['priority']
  status?: INotification['status']
}
