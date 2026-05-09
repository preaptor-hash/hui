'use client';

import React from 'react';
import { useNotifications } from '@/lib/NotificationContext';
import styles from './Notifications.module.css';
import { Bell, Check, Info, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check size={18} className={styles.successIcon} />;
      case 'warning': return <AlertTriangle size={18} className={styles.warningIcon} />;
      case 'error': return <XCircle size={18} className={styles.errorIcon} />;
      default: return <Info size={18} className={styles.infoIcon} />;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <Bell size={24} />
          <h1>Notifications</h1>
        </div>
        {notifications.length > 0 && (
          <button onClick={markAllAsRead} className={styles.markAllBtn}>
            Mark all as read
          </button>
        )}
      </header>

      <div className={styles.content}>
        {notifications.length === 0 ? (
          <div className={styles.emptyState}>
            <Clock size={48} />
            <p>No notifications yet.</p>
          </div>
        ) : (
          <div className={styles.notificationList}>
            <AnimatePresence>
              {notifications.map((notif) => (
                <motion.div 
                  key={notif.id}
                  className={`${styles.notificationCard} ${notif.is_read ? styles.read : styles.unread}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={() => !notif.is_read && markAsRead(notif.id)}
                >
                  <div className={styles.notifIcon}>
                    {getTypeIcon(notif.type)}
                  </div>
                  <div className={styles.notifBody}>
                    <h3>{notif.title}</h3>
                    <p>{notif.message}</p>
                    <span className={styles.time}>
                      {new Date(notif.created_at).toLocaleString()}
                    </span>
                  </div>
                  {!notif.is_read && <div className={styles.unreadDot} />}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
