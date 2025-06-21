import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if it's mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null); 
    
    // Prevent body scroll when menu is open
    if (!isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  // Close menu when clicking on a link
  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    document.body.classList.remove('menu-open');
  };

  // Handle dropdown toggle (desktop only)
  const toggleDropdown = (dropdownName) => {
    if (!isMobile) {
      setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.navbar')) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
        document.body.classList.remove('menu-open');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setActiveDropdown(null);
        document.body.classList.remove('menu-open');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-text">Saibbyweb</span>
          <span className="logo-subtitle">Management System</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className={`navbar-links ${isMenuOpen ? 'navbar-links-open' : ''}`}>
          <li><Link href="/" onClick={closeMenu}>Dashboard</Link></li>
          
          {/* For Desktop: Show dropdowns */}
          {!isMobile && (
            <>
              {/* Employee Management Dropdown */}
              <li className="dropdown">
                <button 
                  className="dropdown-toggle"
                  onClick={() => toggleDropdown('employee')}
                  aria-expanded={activeDropdown === 'employee'}
                >
                  Employee
                  <span className={`dropdown-arrow ${activeDropdown === 'employee' ? 'dropdown-arrow-open' : ''}`}></span>
                </button>
                <ul className={`dropdown-menu ${activeDropdown === 'employee' ? 'dropdown-menu-open' : ''}`}>
                  <li><Link href="/EmployeeManagement" onClick={closeMenu}>Employee Management</Link></li>
                  <li><Link href="/Attendance" onClick={closeMenu}>Attendance</Link></li>
                  <li><Link href="/LeaveTracker" onClick={closeMenu}>Leave Tracker</Link></li>
                  <li><Link href="/Payslips" onClick={closeMenu}>Payslips</Link></li>
                </ul>
              </li>

              {/* Financial Management Dropdown */}
              <li className="dropdown">
                <button 
                  className="dropdown-toggle"
                  onClick={() => toggleDropdown('finance')}
                  aria-expanded={activeDropdown === 'finance'}
                >
                  Finance
                  <span className={`dropdown-arrow ${activeDropdown === 'finance' ? 'dropdown-arrow-open' : ''}`}> </span>
                </button>
                <ul className={`dropdown-menu ${activeDropdown === 'finance' ? 'dropdown-menu-open' : ''}`}>
                  <li><Link href="/Reimbursements" onClick={closeMenu}>Reimbursements</Link></li>
                  <li><Link href="/ExpenseCategories" onClick={closeMenu}>Expense Categories</Link></li>
                  <li><Link href="/ElectricityBills" onClick={closeMenu}>Electricity Bills</Link></li>
                </ul>
              </li>

              {/* Operations Dropdown */}
              <li className="dropdown">
                <button 
                  className="dropdown-toggle"
                  onClick={() => toggleDropdown('operations')}
                  aria-expanded={activeDropdown === 'operations'}
                >
                  Operations
                  <span className={`dropdown-arrow ${activeDropdown === 'operations' ? 'dropdown-arrow-open' : ''}`}> </span>
                </button>
                <ul className={`dropdown-menu ${activeDropdown === 'operations' ? 'dropdown-menu-open' : ''}`}>
                  <li><Link href="/DocumentManagement" onClick={closeMenu}>Document Management</Link></li>
                </ul>
              </li>
            </>
          )}

          {/* For Mobile: Show all links as regular menu items */}
          {isMobile && (
            <>
              <li><Link href="/EmployeeManagement" onClick={closeMenu}>Employee Management</Link></li>
              <li><Link href="/Attendance" onClick={closeMenu}>Attendance</Link></li>
              <li><Link href="/OfferLetter" onClick={closeMenu}>Offer Letter</Link></li>
              <li><Link href="/Payslips" onClick={closeMenu}>Payslips</Link></li>
              <li><Link href="/LeaveTracker" onClick={closeMenu}>Leave Tracker</Link></li>
              <li><Link href="/DocumentManagement" onClick={closeMenu}>Document Management</Link></li>
              <li><Link href="/Reimbursements" onClick={closeMenu}>Reimbursements</Link></li>
              <li><Link href="/ExpenseCategories" onClick={closeMenu}>Expense Categories</Link></li>
              <li><Link href="/ElectricityBills" onClick={closeMenu}>Electricity Bills</Link></li>
            </>
          )}
        </ul>

        {/* Mobile Hamburger Menu */}
        <button 
          className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`navbar-overlay ${isMenuOpen ? 'navbar-overlay-open' : ''}`} onClick={closeMenu}></div>
    </nav>
  );
};

export default Navbar;