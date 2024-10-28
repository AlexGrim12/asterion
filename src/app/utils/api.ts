// utils/api.ts
import { INotification, NotificationFilters } from '@/app/types/notifications';

export async function fetchNotifications(
  filters?: Partial<NotificationFilters>
): Promise<INotification[]> {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
  }

  const response = await fetch(`/api/notifications?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Error fetching notifications');
  }
  return response.json();
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
  });
  
  if (!response.ok) {
    throw new Error('Error updating notification');
  }
  return response.json();
}