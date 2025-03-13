import { exportToPDF } from '../utils/exportCV';
import React, { useState } from 'react';
import exportCV from '../utils/exportCV';



function ExportButton({ resumeElementId, filename }) {
  const [isExporting, setIsExporting] = useState(false);
  
  const ExportButton = ({ resumeData }) => {
    return (
      <button onClick={() => exportCV(resumeData)} className="btn-export">
        Export Resume
      </button>
    );
  };


  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Assuming exportToPDF is the function that handles the export logic
      await exportToPDF(resumeElementId, filename);
      alert('Export successful');
    } catch (error) {
      console.error('Error exporting resume:', error);
      alert('Export failed');
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <button 
      onClick={handleExport}
      disabled={isExporting}
      style={{
        backgroundColor: isExporting ? '#cccccc' : '#4a6cf7',
        color: 'white',
        border: 'none',
        padding: '10px 16px',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: isExporting ? 'not-allowed' : 'pointer'
      }}
    >
      {isExporting ? 'Exporting...' : 'Export as PDF'}
    </button>
  );
}

export default ExportButton;