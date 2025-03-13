import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportToPDF = async (resumeElementId, filename = 'my-resume') => {
  try {
    // Get the resume element
    const resumeElement = document.getElementById(resumeElementId);
    
    if (!resumeElement) {
      alert(`Could not find your resume on the page. Please try again.`);
      return false;
    }
    
    // Convert the resume element to canvas
    const canvas = await html2canvas(resumeElement, {
      scale: 2,
      useCORS: true,
      logging: false
    });
    
    // Create PDF (A4 format)
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasRatio = canvas.height / canvas.width;
    const pdfImageWidth = pdfWidth;
    const pdfImageHeight = pdfWidth * canvasRatio;
    
    // Add the image to the PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfImageWidth, pdfImageHeight);
    
    // If the resume is longer than one page, add more pages
    if (pdfImageHeight > pdfHeight) {
      let remainingHeight = pdfImageHeight;
      let currentPosition = -pdfHeight;
      
      while (remainingHeight > pdfHeight) {
        currentPosition -= pdfHeight;
        remainingHeight -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, currentPosition, pdfImageWidth, pdfImageHeight);
      }
    }
    
    // Save the PDF
    pdf.save(`${filename}.pdf`);
    return true;
  } catch (error) {
    console.error('Error exporting resume to PDF:', error);
    alert('Sorry, there was a problem exporting your resume. Please try again.');
    return false;
  }
};