"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Import MenuIcon for the hamburger button
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; // Optional: for close icon
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import HelpIcon from "@mui/icons-material/Help";

export default function Navbar() {
  const pathname = usePathname();

  // State for dropdowns, modals, AND the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // <-- New state for mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const chatsRef = useRef(null);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null); // Ref for the mobile menu container + button

  // Sample data (same as before)
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
    avatar: null,
  };

  // Close modals AND mobile menu when clicking outside
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
      // Close mobile menu if clicking outside the navbar area (mobileMenuRef scope)
      // Check if the click is outside the mobile menu container AND the toggle button
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMobileMenuOpen) {
         // Check if the click target is NOT the menu button itself
         const menuButton = document.getElementById('mobile-menu-button'); // Add ID to button
         if (menuButton && !menuButton.contains(event.target)) {
            setIsMobileMenuOpen(false);
         }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]); // Add isMobileMenuOpen dependency

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close other potentially open dropdowns/modals when opening mobile menu
    if (!isMobileMenuOpen) {
        setIsDropdownOpen(false);
        setIsNotificationsOpen(false);
        setIsChatsOpen(false);
        setIsProfileOpen(false);
    }
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Close other modals when opening a new one
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsChatsOpen(false);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  const toggleChats = () => {
    setIsChatsOpen(!isChatsOpen);
    setIsNotificationsOpen(false);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false);
    setIsChatsOpen(false);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const markAllAsRead = () => {
    console.log("Marked all notifications as read");
    // Add actual logic here
  };

  return (
    // Add ref here for click outside detection
    <nav className="navbar" ref={mobileMenuRef}>
      <div className="navbar-logo-container">
        <div className="navbar-logo-wrapper">
          <Link href="/" onClick={handleLinkClick}> {/* Close menu on logo click */}
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
      </div>

      {/* --- Mobile Menu Button --- */}
      <button
        id="mobile-menu-button" // Add ID for click outside check
        className="navbar-menu-button"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

       {/* --- Collapsible Navigation Container ---
          - Hidden on small screens (mobile), Flex on medium+ (desktop)
          - Toggled visible on mobile via `isMobileMenuOpen` state
          - `order-last md:order-none` positions it below other items on mobile when open
       */}
      <div
        className={`navbar-nav-container ${isMobileMenuOpen ? 'open' : ''}`}
      >
        {/* Categories Dropdown */}
        <div className="navbar-links" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="navbar-dropdown-button"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            Categories
            <ExpandMoreIcon className={`navbar-dropdown-icon ${isDropdownOpen ? 'rotate-180' : ''} transition-transform`} />
          </button>
          {isDropdownOpen && (
            <div className="navbar-dropdown-menu">
              <Link href="/courses?category=business" onClick={handleLinkClick}>
                <div className="navbar-dropdown-item">Business</div>
              </Link>
              <Link href="/courses?category=technology" onClick={handleLinkClick}>
                <div className="navbar-dropdown-item">Technology</div>
              </Link>
              <Link href="/courses?category=design" onClick={handleLinkClick}>
                <div className="navbar-dropdown-item">Design</div>
              </Link>
              <Link href="/courses?category=marketing" onClick={handleLinkClick}>
                <div className="navbar-dropdown-item">Marketing</div>
              </Link>
            </div>
          )}
        </div>

        {/* Regular Links */}
        <Link href="/" onClick={handleLinkClick}>
          <div className={`navbar-link ${pathname === '/' ? 'active' : ''}`}>Dashboard</div>
        </Link>
        <Link href="/courses" onClick={handleLinkClick}>
          <div className={`navbar-link ${pathname === '/courses' ? 'active' : ''}`}>My courses</div>
        </Link>

        {/* Search Bar - moved inside collapsible container */}
         <div className="navbar-search-container">
           <input
             type="text"
             placeholder="Search Courses"
             className="navbar-search-input"
           />
         </div>
      </div>

       {/* --- User Menu Icons (Notifications, Chat, Profile) ---
           - These remain outside the collapsible container
           - Use responsive classes if needed (e.g., hide some on very small screens)
       */}
      <div className="navbar-user-menu">
        {/* Notifications */}
        <div className="navbar-icon-container" ref={notificationsRef}>
          <button
            className="navbar-icon-button"
            onClick={toggleNotifications}
            aria-label="Notifications"
            aria-haspopup="true"
            aria-expanded={isNotificationsOpen}
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
              {/* ... (modal content - keep as is) ... */}
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

        {/* Messages */}
        <div className="navbar-icon-container hide-mobile" ref={chatsRef}> {/* Example: hide chats icon on smallest screens */}
          <button
            className="navbar-icon-button"
            onClick={toggleChats}
            aria-label="Messages"
            aria-haspopup="true"
            aria-expanded={isChatsOpen}
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
              {/* ... (modal content - keep as is) ... */}
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

        {/* Profile */}
        <div className="navbar-icon-container" ref={profileRef}>
          <button
            className="navbar-icon-button"
            onClick={toggleProfile}
            aria-label="User Profile"
            aria-haspopup="true"
            aria-expanded={isProfileOpen}
          >
            {/* Optionally show user avatar here if available */}
             {user.avatar ? (
                 <Image src={user.avatar} alt="User Avatar" width={28} height={28} className="rounded-full" />
             ) : (
                 <AccountCircleIcon className="navbar-icon" />
             )}
          </button>
          {isProfileOpen && (
            <div className="navbar-modal profile-modal">
              {/* ... (modal content - keep as is) ... */}
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
      </div> {/* End navbar-user-menu */}
    </nav>
  );
}