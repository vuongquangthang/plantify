import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import type { Notification } from '../../types';
import { useNotification } from '../../context/NotificationContext';

const iconMap = {
  success: <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />,
  error: <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />,
  info: <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
};

const bgMap = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  info: 'bg-blue-50 border-blue-200',
  warning: 'bg-amber-50 border-amber-200',
};

function NotificationItem({ notification }: { notification: Notification }) {
  const { removeNotification } = useNotification();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => removeNotification(notification.id), 300);
  };

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg transition-all duration-300 ${bgMap[notification.type]} ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
    >
      {iconMap[notification.type]}
      <p className="flex-1 text-sm text-text-main font-medium leading-snug">
        {notification.message}
      </p>
      <button
        onClick={handleDismiss}
        className="ml-1 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
        aria-label="Đóng thông báo"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function NotificationStack() {
  const { notifications } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => (
        <div key={n.id} className="pointer-events-auto">
          <NotificationItem notification={n} />
        </div>
      ))}
    </div>
  );
}
