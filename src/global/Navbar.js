import React, { useState, useEffect } from 'react';
import { Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from './Theme'; // Adjust path as needed

const Navbar = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (activeDropdown && !isMenuOpen) setActiveDropdown(null);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };
  const toggleDropdown = dropdown =>
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        !isMobile &&
        !event.target.closest('.dropdown') &&
        !event.target.closest('.navbar-container')
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () =>
      document.removeEventListener('click', handleClickOutside);
  }, [isMobile]);

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () =>
      document.removeEventListener('keydown', handleEscape);
  }, []);

  const navItems = [
    { title: 'Dashboard', href: '/' },
    {
      title: 'Employee',
      dropdown: [
        { title: 'Employee Management', href: '/EmployeeManagement' },
        { title: 'Attendance', href: '/Attendance' },
        { title: 'Leave Tracker', href: '/LeaveTracker' },
        { title: 'Payslips', href: '/Payslips' },
      ],
    },
    {
      title: 'Finance',
      dropdown: [
        { title: 'Reimbursements', href: '/Reimbursements' },
        { title: 'Expense Categories', href: '/Expenses' },
        { title: 'Bills', href: '/Bills' },
      ],
    },
    {
      title: 'Operations',
      dropdown: [
        { title: 'Document Management', href: '/DocumentManagement' },
      ],
    },
  ];

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const themeClass = isDarkMode ? 'dark' : 'light';

  return (
    <div className={`theme-${themeClass}`}>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${themeClass}`}>
        <div className="navbar-container">
          {/* Logo */}
          <a href="/" className="navbar-logo" onClick={closeMenu}>
            <span className="logo-text">SW.</span>
          </a>
          {/* Desktop Navigation Links */}
          <ul className={`navbar-links ${isMenuOpen ? 'navbar-links-open' : ''}`}>
            {navItems.map((item, index) => (
              <li key={index} className={item.dropdown ? 'dropdown' : ''}>
                {item.dropdown ? (
                  <>
                    <button
                      className={`dropdown-toggle ${activeDropdown === item.title.toLowerCase() ? 'active' : ''}`}
                      onClick={() => toggleDropdown(item.title.toLowerCase())}
                      aria-expanded={activeDropdown === item.title.toLowerCase()}
                    >
                      <span className="nav-text">{item.title}</span>
                      <ChevronDown
                        size={16}
                        className={`dropdown-icon ${activeDropdown === item.title.toLowerCase() ? 'rotated' : ''}`}
                      />
                    </button>
                    <ul className={`dropdown-menu ${activeDropdown === item.title.toLowerCase() ? 'dropdown-menu-open' : ''}`}>
                      {item.dropdown.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a
                            href={subItem.href}
                            onClick={closeMenu}
                            className="dropdown-link"
                          >
                            <span className="nav-text">{subItem.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a href={item.href} onClick={closeMenu} className="nav-link">
                    <span className="nav-text">{item.title}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
          {/* Theme Toggle & Hamburger */}
          <div className="nav-controls">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {isDarkMode ? <Sun size={20} className="theme-icon" /> : <Moon size={20} className="theme-icon" />}
            </button>
            <button
              className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <span className="hamburger-line hamburger-line-1"></span>
              <span className="hamburger-line hamburger-line-2"></span>
              <span className="hamburger-line hamburger-line-3"></span>
            </button>
          </div>
        </div>
        <div className={`navbar-overlay ${isMenuOpen ? 'navbar-overlay-open' : ''}`} onClick={closeMenu}></div>
      </nav>
    </div>
  );
};

export default Navbar;
