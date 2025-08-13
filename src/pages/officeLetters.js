import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import HomeOfficeLetters from '../components/OfficeLetters/HomeOfficeLetters';
import OfferLetterForm from '../components/OfficeLetters/OfferLetterForm';
import OfferLetterList from '../components/OfficeLetters/OfferLetterList';

const OfficeLetters = () => {
  const [currentView, setCurrentView] = useState('home');
  const [letters, setLetters] = useState([]);

  const addLetter = (letter) => {
    setLetters([...letters, { ...letter, id: Date.now() }]);
  };

  const deleteLetter = (id) => {
    setLetters(letters.filter(l => l.id !== id));
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeOfficeLetters onNavigate={handleNavigation} />;
      case 'offer':
        return (
          <div className="ol-letter-view">
            <div className="ol-view-header">
              <button 
                className="ol-back-button" 
                onClick={() => setCurrentView('home')}
              >
                <ArrowLeft size={16} />
                Back to Home
              </button>
              <h1>Offer Letters</h1>
            </div>
            <div className="ol-letter-content">
              <OfferLetterForm onSave={addLetter} />
              <OfferLetterList letters={letters} onDelete={deleteLetter} />
            </div>
          </div>
        );
      case 'promotion':
        return (
          <div className="ol-letter-view">
            <div className="ol-view-header">
              <button 
                className="ol-back-button" 
                onClick={() => setCurrentView('home')}
              >
                <ArrowLeft size={16} />
                Back to Home
              </button>
              <h1>Promotion Letters</h1>
            </div>
            <div className="ol-coming-soon">
              <h3>Coming Soon</h3>
              <p>Promotion letter functionality will be available soon.</p>
            </div>
          </div>
        );
      case 'salary':
        return (
          <div className="ol-letter-view">
            <div className="ol-view-header">
              <button 
                className="ol-back-button" 
                onClick={() => setCurrentView('home')}
              >
                ← Back to Home
              </button>
              <h1>Salary Increment Letters</h1>
            </div>
            <div className="ol-coming-soon">
              <h3>Coming Soon</h3>
              <p>Salary increment letter functionality will be available soon.</p>
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="ol-letter-view">
            <div className="ol-view-header">
              <button 
                className="ol-back-button" 
                onClick={() => setCurrentView('home')}
              >
                ← Back to Home
              </button>
              <h1>Experience Letters</h1>
            </div>
            <div className="ol-coming-soon">
              <h3>Coming Soon</h3>
              <p>Experience letter functionality will be available soon.</p>
            </div>
          </div>
        );
      case 'internship':
        return (
          <div className="ol-letter-view">
            <div className="ol-view-header">
              <button 
                className="ol-back-button" 
                onClick={() => setCurrentView('home')}
              >
                ← Back to Home
              </button>
              <h1>Internship Letters</h1>
            </div>
            <div className="ol-coming-soon">
              <h3>Coming Soon</h3>
              <p>Internship letter functionality will be available soon.</p>
            </div>
          </div>
        );
      case 'appreciation':
        return (
          <div className="ol-letter-view">
            <div className="ol-view-header">
              <button 
                className="ol-back-button" 
                onClick={() => setCurrentView('home')}
              >
                ← Back to Home
              </button>
              <h1>Appreciation Letters</h1>
            </div>
            <div className="ol-coming-soon">
              <h3>Coming Soon</h3>
              <p>Appreciation letter functionality will be available soon.</p>
            </div>
          </div>
        );
      case 'contract':
        return (
          <div className="ol-letter-view">
            <div className="ol-view-header">
              <button 
                className="ol-back-button" 
                onClick={() => setCurrentView('home')}
              >
                ← Back to Home
              </button>
              <h1>Contract Letters</h1>
            </div>
            <div className="ol-coming-soon">
              <h3>Coming Soon</h3>
              <p>Contract letter functionality will be available soon.</p>
            </div>
          </div>
        );
      case 'relieving':
        return (
          <div className="ol-letter-view">
            <div className="ol-view-header">
              <button 
                className="ol-back-button" 
                onClick={() => setCurrentView('home')}
              >
                ← Back to Home
              </button>
              <h1>Relieving Letters</h1>
            </div>
            <div className="ol-coming-soon">
              <h3>Coming Soon</h3>
              <p>Relieving letter functionality will be available soon.</p>
            </div>
          </div>
        );
      case 'circulation':
        return (
          <div className="ol-letter-view">
            <div className="ol-view-header">
              <button 
                className="ol-back-button" 
                onClick={() => setCurrentView('home')}
              >
                ← Back to Home
              </button>
              <h1>Company Circulation</h1>
            </div>
            <div className="ol-coming-soon">
              <h3>Coming Soon</h3>
              <p>Company circulation functionality will be available soon.</p>
            </div>
          </div>
        );
      default:
        return <HomeOfficeLetters onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="ol-office-letters-container">
      {renderCurrentView()}
    </div>
  );
};

export default OfficeLetters;