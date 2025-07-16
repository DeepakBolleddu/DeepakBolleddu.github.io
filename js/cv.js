document.addEventListener('DOMContentLoaded', function() {
  initCvPage();
});

function initCvPage() {
  // Add smooth scrolling for download button
  const downloadBtn = document.querySelector('.download-btn');
  if (downloadBtn) {
      downloadBtn.addEventListener('click', function(e) {
          // Add a small delay to show the click effect
          setTimeout(() => {
              console.log('CV download initiated');
          }, 100);
      });
  }

  // Check if PDF is loaded
  const pdfObject = document.querySelector('.pdf-viewer');
  if (pdfObject) {
      pdfObject.addEventListener('load', function() {
          console.log('PDF loaded successfully');
      });
  }

  // Add some interactive feedback
  const cvContainer = document.querySelector('.cv-container');
  if (cvContainer) {
      cvContainer.addEventListener('click', function(e) {
          if (e.target.classList.contains('download-btn')) {
              e.target.style.transform = 'scale(0.95)';
              setTimeout(() => {
                  e.target.style.transform = 'scale(1)';
              }, 150);
          }
      });
  }
}
