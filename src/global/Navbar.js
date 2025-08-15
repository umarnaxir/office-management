import React, { useState, useEffect } from 'react';
import { ChevronDown, Users, DollarSign, Settings, Home, UserCheck, Calendar, FileText, Receipt, CreditCard, Folder, Menu, X, Mail } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

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

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        !isMobile &&
        !event.target.closest('.app-dropdown') &&
        !event.target.closest('.app-navbar-container')
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile]);

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (activeDropdown && !isMenuOpen) setActiveDropdown(null);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = dropdown => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    }
  };

  const handleDropdownMouseEnter = (dropdown) => {
    if (!isMobile) {
      setActiveDropdown(dropdown);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };

  const navItems = [
    { 
      title: 'Dashboard', 
      href: '/', 
      icon: Home,
      gradient: 'app-gradient-blue-purple'
    },
    {
      title: 'Employee',
      icon: Users,
      gradient: 'app-gradient-emerald-teal',
      dropdown: [
        { title: 'Employee Management', href: '/EmployeeManagement', icon: UserCheck },
        { title: 'Attendance', href: '/Attendance', icon: Calendar },
        { title: 'Leave Tracker', href: '/LeaveTracker', icon: FileText },
        { title: 'Payslips', href: '/Payslips', icon: Receipt },
      ],
    },
    {
      title: 'Finance',
      icon: DollarSign,
      gradient: 'app-gradient-yellow-orange',
      dropdown: [
        { title: 'Reimbursements', href: '/Reimbursements', icon: CreditCard },
        { title: 'Expenses', href: '/Expenses', icon: Receipt },
        { title: 'Bills', href: '/Bills', icon: FileText },
      ],
    },
    {
      title: 'Operations',
      icon: Settings,
      gradient: 'app-gradient-purple-pink',
      dropdown: [
        { title: 'Document Management', href: '/DocumentManagement', icon: Folder },
        { title: 'Office Letter', href: '/OfficeLetters', icon: Mail },
      ],
    },
  ];

  return (
    <>
      <div className="app-theme-wrapper dark">
        <nav className={`app-navbar ${isScrolled ? 'app-navbar-scrolled' : ''}`}>
          <div className="app-navbar-container">
            <div className="app-navbar-logo-section">
              <a href="/" className="app-navbar-logo" onClick={closeMenu}>
                <div className="app-logo-container">
                  <span className="app-logo-text">SW.</span>
                </div>
              </a>
            </div>

            <div className="app-navbar-links-desktop">
              <div className="app-nav-items-container">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index} 
                      className="app-nav-item app-dropdown"
                      onMouseEnter={() => handleDropdownMouseEnter(item.dropdown ? item.title.toLowerCase() : null)}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      {item.dropdown ? (
                        <>
                          <button
                            className={`app-nav-button ${activeDropdown === item.title.toLowerCase() ? 'active' : ''}`}
                            onClick={() => toggleDropdown(item.title.toLowerCase())}
                            onMouseEnter={() => setHoveredItem(item.title)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <div className={`app-nav-button-bg ${item.gradient}`}></div>
                            <Icon size={16} className="app-nav-icon" />
                            <span className="app-nav-text">{item.title}</span>
                            <ChevronDown 
                              size={14} 
                              className={`app-dropdown-arrow ${activeDropdown === item.title.toLowerCase() ? 'rotated' : ''}`}
                            />
                          </button>
                          <div className={`app-dropdown-menu ${activeDropdown === item.title.toLowerCase() ? 'app-dropdown-menu-open' : ''}`}>
                            <div className="app-dropdown-content">
                              {item.dropdown.map((subItem, subIndex) => {
                                const SubIcon = subItem.icon;
                                return (
                                  <a
                                    key={subIndex}
                                    href={subItem.href}
                                    onClick={closeMenu}
                                    className="app-dropdown-link"
                                  >
                                    <SubIcon size={16} className="app-dropdown-icon" />
                                    <span className="app-dropdown-text">{subItem.title}</span>
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      ) : (
                        <a
                          href={item.href}
                          onClick={closeMenu}
                          className="app-nav-button"
                          onMouseEnter={() => setHoveredItem(item.title)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <div className={`app-nav-button-bg ${item.gradient}`}></div>
                          <Icon size={16} className="app-nav-icon" />
                          <span className="app-nav-text">{item.title}</span>
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="app-nav-controls">
              <button onClick={toggleMenu} className="app-mobile-toggle">
                <div className="app-mobile-toggle-bg"></div>
                {isMenuOpen ? (
                  <X size={16} className="app-mobile-icon" />
                ) : (
                  <Menu size={16} className="app-mobile-icon" />
                )}
              </button>
            </div>
          </div>
        </nav>

        <div className={`app-mobile-nav ${isMenuOpen ? 'app-mobile-nav-open' : ''}`}>
          <div className="app-mobile-nav-content">
            <div className="app-mobile-nav-section">
              <div className="app-mobile-nav-title">Navigation Menu</div>
              <div className="app-mobile-nav-grid">
                <div className="app-mobile-nav-row">
                  <a href="/" onClick={closeMenu} className="app-mobile-nav-card">
                    <div className="app-mobile-card-icon">
                      <Home size={20} />
                    </div>
                    <span className="app-mobile-card-text">Home</span>
                  </a>
                  <a href="/Expenses" onClick={closeMenu} className="app-mobile-nav-card">
                    <div className="app-mobile-card-icon">
                      <Receipt size={20} />
                    </div>
                    <span className="app-mobile-card-text">Expenses</span>
                  </a>
                </div>
                <div className="app-mobile-nav-row">
                  <a href="/EmployeeManagement" onClick={closeMenu} className="app-mobile-nav-card">
                    <div className="app-mobile-card-icon">
                      <UserCheck size={20} />
                    </div>
                    <span className="app-mobile-card-text">Employee Management</span>
                  </a>
                  <a href="/OfficeLetters" onClick={closeMenu} className="app-mobile-nav-card">
                    <div className="app-mobile-card-icon">
                      <Mail size={20} />
                    </div>
                    <span className="app-mobile-card-text">Office Letter</span>
                  </a>
                </div>
                <div className="app-mobile-nav-row">
                  <a href="/Attendance" onClick={closeMenu} className="app-mobile-nav-card">
                    <div className="app-mobile-card-icon">
                      <Calendar size={20} />
                    </div>
                    <span className="app-mobile-card-text">Attendance</span>
                  </a>
                  <a href="/Reimbursements" onClick={closeMenu} className="app-mobile-nav-card">
                    <div className="app-mobile-card-icon">
                      <CreditCard size={20} />
                    </div>
                    <span className="app-mobile-card-text">Reimbursement</span>
                  </a>
                </div>
                <div className="app-mobile-nav-row">
                  <a href="/Payslips" onClick={closeMenu} className="app-mobile-nav-card">
                    <div className="app-mobile-card-icon">
                      <Receipt size={20} />
                    </div>
                    <span className="app-mobile-card-text">Payslips</span>
                  </a>
                  <a href="/DocumentManagement" onClick={closeMenu} className="app-mobile-nav-card">
                    <div className="app-mobile-card-icon">
                      <Folder size={20} />
                    </div>
                    <span className="app-mobile-card-text">Document Management</span>
                  </a>
                </div>
                <div className="app-mobile-nav-row">
                  <a href="/Bills" onClick={closeMenu} className="app-mobile-nav-card">
                    <div className="app-mobile-card-icon">
                      <FileText size={20} />
                    </div>
                    <span className="app-mobile-card-text">Bills</span>
                  </a>
                  <a href="/LeaveTracker" onClick={closeMenu} className="app-mobile-nav-card">
                    <div className="app-mobile-card-icon">
                      <FileText size={20} />
                    </div>
                    <span className="app-mobile-card-text">Leave Tracker</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;