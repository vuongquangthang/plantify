import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Notification } from '../types';
import { generateId } from '../utils/helpers';

interface NotificationContextValue {
  notifications: Notification[];
  addNotification: (
    message: string,
    type?: Notification['type'],
    duration?: number
  ) => string;
  removeNotification: (id: string) => void;
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback(
    (
      message: string,
      type: Notification['type'] = 'info',
      duration = 4000
    ): string => {
      const id = generateId();
      const notification: Notification = { id, type, message, duration };
      setNotifications((prev) => [...prev, notification]);

      if (duration > 0) {
        setTimeout(() => removeNotification(id), duration);
      }

      return id;
    },
    [removeNotification]
  );

  const success = useCallback(
    (message: string, duration?: number) => addNotification(message, 'success', duration),
    [addNotification]
  );

  const error = useCallback(
    (message: string, duration?: number) => addNotification(message, 'error', duration),
    [addNotification]
  );

  const info = useCallback(
    (message: string, duration?: number) => addNotification(message, 'info', duration),
    [addNotification]
  );

  const warning = useCallback(
    (message: string, duration?: number) => addNotification(message, 'warning', duration),
    [addNotification]
  );

  const clearAll = useCallback(() => setNotifications([]), []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        success,
        error,
        info,
        warning,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification(): NotificationContextValue {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
}
