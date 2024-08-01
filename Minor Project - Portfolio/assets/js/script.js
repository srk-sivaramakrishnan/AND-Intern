document.addEventListener('DOMContentLoaded', () => {
  const themeButton = document.getElementById('theme-button');
  const body = document.body;
  
  themeButton.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('.nav__link').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Generate PDF (Mock Implementation)
  const resumeButton = document.getElementById('resume-button');
  resumeButton.addEventListener('click', () => {
      alert('Generate PDF feature is under construction.');
  });
});
