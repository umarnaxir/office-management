"use client";

import React from "react";
import Link from "next/link";
import style from "@/styles/office.css";

export default function Home() {
  return (
    <div className="app-container">
      <nav className="main-navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <Link href="/" className="nav-link nav-link--active">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/employees" className="nav-link">
              Employee Management
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/accounting" className="nav-link">
              Accounting
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/tasks" className="nav-link">
              Task Management
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/data" className="nav-link">
              Data Management
            </Link>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <div className="hero-section">
          <h1 className="hero-title">Saibbyweb - Office Management System</h1>
          <p className="hero-subtitle">
            Manage employees, tasks, finances, and data — all in one place to
            streamline your office workflow.{" "}
          </p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card dashboard-card--employees">
            <div className="card-icon">👥</div>
            <h3 className="card-title">Employee Management</h3>
            <p className="card-description">
              Manage staff, track performance, and handle HR tasks
            </p>
            <Link href="/employees" className="card-button">
              Get Started
              <span className="button-arrow">→</span>
            </Link>
          </div>

          <div className="dashboard-card dashboard-card--accounting">
            <div className="card-icon">💰</div>
            <h3 className="card-title">Accounting</h3>
            <p className="card-description">
              Handle finances, invoices, and expense tracking
            </p>
            <Link href="/accounting" className="card-button">
              Get Started
              <span className="button-arrow">→</span>
            </Link>
          </div>

          <div className="dashboard-card dashboard-card--tasks">
            <div className="card-icon">✅</div>
            <h3 className="card-title">Task Management</h3>
            <p className="card-description">
              Organize projects, assign tasks, and track progress
            </p>
            <Link href="/tasks" className="card-button">
              Get Started
              <span className="button-arrow">→</span>
            </Link>
          </div>

          <div className="dashboard-card dashboard-card--data">
            <div className="card-icon">📁</div>
            <h3 className="card-title">Data Management</h3>
            <p className="card-description">
              Store, organize, and analyze your business data
            </p>
            <Link href="/data" className="card-button">
              Get Started
              <span className="button-arrow">→</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
