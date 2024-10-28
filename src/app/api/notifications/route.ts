import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { INotification, NotificationFilters } from '@/app/types/notifications'
import { Collection, Db, ObjectId } from 'mongodb'
import { z } from 'zod'

// Schema de validación para los filtros
const filterSchema = z.object({
  userId: z.string().optional(),
  type: z
    .enum(['fall-detection', 'room-service', 'emergency', 'maintenance'])
    .optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  status: z.enum(['pending', 'completed', 'in-progress']).optional(),
})

// Schema de validación para actualización de estado
const updateSchema = z.object({
  id: z.string(),
  status: z.enum(['pending', 'completed', 'in-progress']),
})

async function getNotificationsCollection(): Promise<
  Collection<INotification>
> {
  const client = await clientPromise
  const db: Db = client.db('fall_detection')
  return db.collection<INotification>('falls')
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Construir objeto de filtros desde searchParams
    const filters: NotificationFilters = {
      userId: searchParams.get('userId') || undefined,
      type: (searchParams.get('type') as INotification['type']) || undefined,
      priority:
        (searchParams.get('priority') as INotification['priority']) ||
        undefined,
      status:
        (searchParams.get('status') as INotification['status']) || undefined,
    }

    // Validar filtros
    const validatedFilters = filterSchema.parse(filters)

    // Remover undefined values
    const query = Object.fromEntries(
      Object.entries(validatedFilters).filter(([_, v]) => v !== undefined)
    )

    const collection = await getNotificationsCollection()

    const notifications = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()

    const formattedNotifications = notifications.map((notification) => ({
      ...notification,
      id: notification._id?.toString(),
      _id: notification._id?.toString(),
    }))

    return NextResponse.json(formattedNotifications)
  } catch (error) {
    console.error('Database Error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid filter parameters', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar el cuerpo de la solicitud
    const { id, status } = updateSchema.parse(body)

    const collection = await getNotificationsCollection()

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Notification updated successfully',
    })
  } catch (error) {
    console.error('Update Error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    )
  }
}

// utils/api.ts
export async function fetchNotifications(
  filters?: Partial<NotificationFilters>
): Promise<INotification[]> {
  const params = new URLSearchParams()
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
  }

  const response = await fetch(`/api/notifications?${params.toString()}`)
  if (!response.ok) {
    throw new Error('Error fetching notifications')
  }
  return response.json()
}

export async function updateNotificationStatus(
  id: string,
  status: INotification['status']
): Promise<{ success: boolean; message: string }> {
  const response = await fetch('/api/notifications', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, status }),
  })

  if (!response.ok) {
    throw new Error('Error updating notification')
  }
  return response.json()
}
