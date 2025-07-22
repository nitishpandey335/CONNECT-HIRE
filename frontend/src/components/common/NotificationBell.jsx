import React, { useState } from 'react';
import './NotificationBell.css';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'New project request from TechCorp', time: '2 mins ago', read: false },
    { id: 2, text: 'John accepted your job offer', time: '1 hour ago', read: true },
    { id: 3, text: 'Project deadline approaching', time: '3 hours ago', read: true }
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-container">
      <div 
        className="notification-bell"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
        </svg>
        
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </div>
      
      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            <button className="mark-read">Mark all as read</button>
          </div>
          
          <div className="notification-list">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item ${notification.read ? '' : 'unread'}`}
              >
                <div className="notification-dot"></div>
                <div className="notification-content">
                  <p>{notification.text}</p>
                  <small>{notification.time}</small>
                </div>
              </div>
            ))}
          </div>
          
          <div className="notification-footer">
            <button>View All</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;