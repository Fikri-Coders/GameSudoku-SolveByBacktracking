// Memuat Font Google
(function() {
  const link = document.createElement('link');
  link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);

  // Memuat Font Awesome
  const fontAwesome = document.createElement('link');
  fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css";
  fontAwesome.rel = "stylesheet";
  document.head.appendChild(fontAwesome);
})();