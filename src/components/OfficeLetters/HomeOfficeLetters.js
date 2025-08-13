import React from 'react';
import { 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Award, 
  GraduationCap, 
  Star, 
  FileSignature, 
  LogOut, 
  Megaphone,
  ArrowRight
} from 'lucide-react';

const HomeOfficeLetters = ({ onNavigate }) => {
  const letterTypes = [
    {
      id: 'offer',
      title: 'Offer Letter',
      description: 'Create and manage job offer letters for new employees',
      icon: FileText,
      color: 'blue'
    },
    {
      id: 'promotion',
      title: 'Promotion Letter',
      description: 'Generate promotion letters for employee advancement',
      icon: TrendingUp,
      color: 'green'
    },
    {
      id: 'salary',
      title: 'Salary Increment Letter',
      description: 'Create salary increment notification letters',
      icon: DollarSign,
      color: 'orange'
    },
    {
      id: 'experience',
      title: 'Experience Letter',
      description: 'Generate experience certificates for employees',
      icon: Award,
      color: 'purple'
    },
    {
      id: 'internship',
      title: 'Internship Letter',
      description: 'Create internship offer and completion letters',
      icon: GraduationCap,
      color: 'teal'
    },
    {
      id: 'appreciation',
      title: 'Appreciation Letter',
      description: 'Generate appreciation and recognition letters',
      icon: Star,
      color: 'yellow'
    },
    {
      id: 'contract',
      title: 'Contract Letter',
      description: 'Create employment contract documents',
      icon: FileSignature,
      color: 'indigo'
    },
    {
      id: 'relieving',
      title: 'Relieving Letter',
      description: 'Generate relieving letters for departing employees',
      icon: LogOut,
      color: 'red'
    },
    {
      id: 'circulation',
      title: 'Company Circulation',
      description: 'Create company-wide announcements and circulars',
      icon: Megaphone,
      color: 'pink'
    }
  ];

  const handleCardClick = (letterType) => {
    if (onNavigate) {
      onNavigate(letterType.id);
    }
  };

  return (
    <div className="ol-home-office-letters">
      <div className="ol-header-section">
        <h1 className="ol-main-title">Office Letters Management</h1>
        <p className="ol-subtitle">Create, manage and organize all your office correspondence</p>
      </div>

      <div className="ol-cards-container">
        {letterTypes.map((letterType) => {
          const IconComponent = letterType.icon;
          return (
            <div
              key={letterType.id}
              className={`ol-letter-card ${letterType.color}`}
              onClick={() => handleCardClick(letterType)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(letterType);
                }
              }}
            >
              <div className="ol-card-header">
                <div className="ol-card-icon">
                  <IconComponent size={32} />
                </div>
                <div className="ol-card-arrow">
                  <ArrowRight size={20} />
                </div>
              </div>
              <div className="ol-card-content">
                <h3 className="ol-card-title">{letterType.title}</h3>
                <p className="ol-card-description">{letterType.description}</p>
              </div>
              <div className="ol-card-footer">
                <span className="ol-card-action">Click to manage</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeOfficeLetters;