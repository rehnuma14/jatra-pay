
    // Simple time filter functionality
    document.addEventListener('DOMContentLoaded', function() {
      const timeFilters = document.querySelectorAll('.time-filter');
      timeFilters.forEach(filter => {
        filter.addEventListener('click', function() {
          timeFilters.forEach(f => f.classList.remove('active'));
          this.classList.add('active');
          
          // Update content based on selected period
          const period = this.dataset.period;
          updateReportContent(period);
        });
      });

      function updateReportContent(period) {
        console.log(`Showing reports for ${period} period`);
      }

      // View All Trips button
      const viewAllButton = document.querySelector('.view-details');
      if (viewAllButton) {
        viewAllButton.addEventListener('click', function() {
          alert('Showing all your trips...');
        });
      }

      // Download PDF button
      const downloadButton = document.querySelector('.download-report');
      if (downloadButton) {
        downloadButton.addEventListener('click', function() {
          alert('Downloading your December travel summary as PDF...');
        });
      }
    });