import React from 'react';

const DocumentStats = ({ documents, employees }) => {
  const getEmployeeStats = () => {
    return employees.map(employee => {
      const empDocs = documents.filter(doc => doc.employeeId === employee.id);
      return {
        name: employee.name,
        totalDocuments: empDocs.length,
        active: empDocs.filter(d => d.status === 'Active').length,
        archived: empDocs.filter(d => d.status === 'Archived').length,
        expired: empDocs.filter(d => d.status === 'Expired').length
      };
    });
  };

  const getCategoryStats = () => {
    const categories = {};
    documents.forEach(doc => {
      categories[doc.category] = (categories[doc.category] || 0) + 1;
    });
    return Object.entries(categories).map(([category, count]) => ({
      category,
      count
    }));
  };

  const employeeStats = getEmployeeStats();
  const categoryStats = getCategoryStats();

  return (
    <div className="doc-manage-stats-container">
      <h2 className="doc-manage-stats-title">Document Statistics</h2>
      
      <div className="doc-manage-stats-grid">
        <div className="doc-manage-stat-card doc-manage-stat-total">
          <h3>Total Documents</h3>
          <p>{documents.length}</p>
        </div>
        
        <div className="doc-manage-stat-card doc-manage-stat-active">
          <h3>Active</h3>
          <p>{documents.filter(d => d.status === 'Active').length}</p>
        </div>
        
        <div className="doc-manage-stat-card doc-manage-stat-archived">
          <h3>Archived</h3>
          <p>{documents.filter(d => d.status === 'Archived').length}</p>
        </div>
        
        <div className="doc-manage-stat-card doc-manage-stat-expired">
          <h3>Expired</h3>
          <p>{documents.filter(d => d.status === 'Expired').length}</p>
        </div>
      </div>
      
      <div className="doc-manage-stats-section">
        <h3 className="doc-manage-stats-subtitle">Documents by Employee</h3>
        <div className="doc-manage-employee-stats">
          {employeeStats.map(stat => (
            <div key={stat.name} className="doc-manage-employee-stat-item">
              <div className="doc-manage-employee-name">{stat.name}</div>
              <div className="doc-manage-stat-bar">
                <div 
                  className="doc-manage-stat-segment doc-manage-stat-active-seg" 
                  style={{ width: `${(stat.active / stat.totalDocuments) * 100 || 0}%` }}
                  title={`Active: ${stat.active}`}
                ></div>
                <div 
                  className="doc-manage-stat-segment doc-manage-stat-archived-seg" 
                  style={{ width: `${(stat.archived / stat.totalDocuments) * 100 || 0}%` }}
                  title={`Archived: ${stat.archived}`}
                ></div>
                <div 
                  className="doc-manage-stat-segment doc-manage-stat-expired-seg" 
                  style={{ width: `${(stat.expired / stat.totalDocuments) * 100 || 0}%` }}
                  title={`Expired: ${stat.expired}`}
                ></div>
              </div>
              <div className="doc-manage-total-count">{stat.totalDocuments}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="doc-manage-stats-section">
        <h3 className="doc-manage-stats-subtitle">Documents by Category</h3>
        <div className="doc-manage-category-stats">
          {categoryStats.map(stat => (
            <div key={stat.category} className="doc-manage-category-stat-item">
              <div className="doc-manage-category-name">{stat.category}</div>
              <div className="doc-manage-stat-bar-container">
                <div 
                  className="doc-manage-stat-bar doc-manage-category-bar" 
                  style={{ width: `${(stat.count / documents.length) * 100 || 0}%` }}
                ></div>
              </div>
              <div className="doc-manage-category-count">{stat.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentStats;