"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import HelpIcon from "@mui/icons-material/Help";

export default function Navbar() {
  // Get current pathname for active link highlighting
  const pathname = usePathname();
  
  // State for dropdown and modals
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Refs for click outside detection
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const chatsRef = useRef(null);
  const profileRef = useRef(null);
  
  // Sample data
  const notifications = [
    { id: 1, text: "New course available: Advanced React", time: "10 mins ago", isRead: false },
    { id: 2, text: "Your certificate is ready to download", time: "2 hours ago", isRead: false },
    { id: 3, text: "Course deadline approaching: UX Design Basics", time: "1 day ago", isRead: true },
    { id: 4, text: "New comment on your discussion post", time: "2 days ago", isRead: true },
  ];
  
  const chats = [
    { id: 1, name: "John Smith", message: "Hi, can you help me with the assignment?", time: "5 mins ago", unread: 2, avatar: "/images/avatar1.png" },
    { id: 2, name: "Sarah Wilson", message: "Thanks for your feedback!", time: "1 hour ago", unread: 0, avatar: "/images/avatar2.png" },
    { id: 3, name: "UX Design Group", message: "Mike: I've shared the resources...", time: "Yesterday", unread: 4, avatar: "/images/group.png" },
  ];
  
  const user = {
    name: "Mel Garcia",
    email: "melgarcia@gmail.com",
    role: "Student",
    avatar: null, // Uses AccountCircle icon as fallback
  };

  // Close modals when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (chatsRef.current && !chatsRef.current.contains(event.target)) {
        setIsChatsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close other modals when opening a new one
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsChatsOpen(false);
    setIsProfileOpen(false);
  };

  const toggleChats = () => {
    setIsChatsOpen(!isChatsOpen);
    setIsNotificationsOpen(false);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false);
    setIsChatsOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    console.log("Marked all notifications as read");
    // In a real app, you would update the state and make an API call
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <div className="navbar-logo-wrapper">
          <Link href="/">
            <div className="navbar-logo">
              <Image
                src="/images/iflde-logo.png"
                alt="FlexiLearnPro Logo"
                width={50}
                height={50}
              />
              <span className="navbar-brand-name">FlexiLearnPro</span>
            </div>
          </Link>
        </div>

        <div className="navbar-links" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="navbar-dropdown-button"
          >
            Categories
            <ExpandMoreIcon className="navbar-dropdown-icon" />
          </button>
          {isDropdownOpen && (
            <div className="navbar-dropdown-menu">
              <Link href="/courses?category=business">
                <div className="navbar-dropdown-item">Business</div>
              </Link>
              <Link href="/courses?category=technology">
                <div className="navbar-dropdown-item">Technology</div>
              </Link>
              <Link href="/courses?category=design">
                <div className="navbar-dropdown-item">Design</div>
              </Link>
              <Link href="/courses?category=marketing">
                <div className="navbar-dropdown-item">Marketing</div>
              </Link>
            </div>
          )}
        </div>

        <Link href="/">
          <div className={`navbar-link ${pathname === '/' ? 'active' : ''}`}>Dashboard</div>
        </Link>
        <Link href="/courses">
          <div className={`navbar-link ${pathname === '/courses' ? 'active' : ''}`}>My courses</div>
        </Link>
      </div>

      <div className="navbar-user-menu">
        <div className="navbar-search-container">
          <input
            type="text"
            placeholder="Search Courses"
            className="navbar-search-input"
          />
        </div>

        {/* Notifications Button and Modal */}
        <div className="navbar-icon-container" ref={notificationsRef}>
          <button 
            className="navbar-icon-button" 
            onClick={toggleNotifications}
            aria-label="Notifications"
          >
            <NotificationsIcon className="navbar-icon" />
            {notifications.filter(n => !n.isRead).length > 0 && (
              <span className="navbar-notification-badge">
                {notifications.filter(n => !n.isRead).length}
              </span>
            )}
          </button>
          
          {isNotificationsOpen && (
            <div className="navbar-modal notifications-modal">
              <div className="modal-header">
                <h3 className="modal-title">Notifications</h3>
                <div className="modal-actions">
                  <button 
                    onClick={markAllAsRead} 
                    className="modal-action-button"
                  >
                    Mark all as read
                  </button>
                </div>
              </div>
              
              <div className="modal-content">
                {notifications.length > 0 ? (
                  <ul className="notifications-list">
                    {notifications.map((notification) => (
                      <li 
                        key={notification.id} 
                        className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                      >
                        <p className="notification-text">{notification.text}</p>
                        <span className="notification-time">{notification.time}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-state">No notifications</p>
                )}
              </div>
              
              <div className="modal-footer">
                <Link href="/notifications">
                  <span className="modal-footer-link">See all notifications</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Messages Button and Modal */}
        <div className="navbar-icon-container" ref={chatsRef}>
          <button 
            className="navbar-icon-button" 
            onClick={toggleChats}
            aria-label="Messages"
          >
            <MessageIcon className="navbar-icon" />
            {chats.filter(c => c.unread > 0).length > 0 && (
              <span className="navbar-notification-badge">
                {chats.reduce((total, chat) => total + chat.unread, 0)}
              </span>
            )}
          </button>
          
          {isChatsOpen && (
            <div className="navbar-modal chats-modal">
              <div className="modal-header">
                <h3 className="modal-title">Messages</h3>
              </div>
              
              <div className="modal-content">
                {chats.length > 0 ? (
                  <ul className="chats-list">
                    {chats.map((chat) => (
                      <li key={chat.id} className="chat-item">
                        <div className="chat-avatar">
                          {chat.avatar ? (
                            <Image
                              src={chat.avatar}
                              alt={chat.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          ) : (
                            <AccountCircleIcon className="avatar-fallback" />
                          )}
                        </div>
                        <div className="chat-content">
                          <div className="chat-header">
                            <h4 className="chat-name">{chat.name}</h4>
                            <span className="chat-time">{chat.time}</span>
                          </div>
                          <p className="chat-message">{chat.message}</p>
                        </div>
                        {chat.unread > 0 && (
                          <span className="chat-badge">{chat.unread}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-state">No messages</p>
                )}
              </div>
              
              <div className="modal-footer">
                <Link href="/messages">
                  <span className="modal-footer-link">See all messages</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Button and Modal */}
        <div className="navbar-icon-container" ref={profileRef}>
          <button 
            className="navbar-icon-button" 
            onClick={toggleProfile}
            aria-label="User Profile"
          >
            <AccountCircleIcon className="navbar-icon" />
          </button>
          
          {isProfileOpen && (
            <div className="navbar-modal profile-modal">
              <div className="profile-header">
                <div className="profile-avatar">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  ) : (
                    <AccountCircleIcon className="profile-avatar-icon" />
                  )}
                </div>
                <div className="profile-info">
                  <h3 className="profile-name">{user.name}</h3>
                  <p className="profile-email">{user.email}</p>
                  <span className="profile-role">{user.role}</span>
                </div>
              </div>
              
              <div className="profile-menu">
                <Link href="/profile">
                  <div className="profile-menu-item">
                    <PersonIcon className="profile-menu-icon" />
                    <span>My Profile</span>
                  </div>
                </Link>
                <Link href="/settings">
                  <div className="profile-menu-item">
                    <SettingsIcon className="profile-menu-icon" />
                    <span>Account Settings</span>
                  </div>
                </Link>
                <Link href="/help">
                  <div className="profile-menu-item">
                    <HelpIcon className="profile-menu-icon" />
                    <span>Help & Support</span>
                  </div>
                </Link>
                <hr className="profile-divider" />
                <button className="profile-menu-item logout">
                  <LogoutIcon className="profile-menu-icon" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}