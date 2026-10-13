// Runs before CSS paints; storage denial never prevents page startup.
try {
  document.documentElement.dataset.theme = localStorage.getItem('atelier_theme') === 'dark' ? 'dark' : 'light';
} catch { document.documentElement.dataset.theme = 'light'; }
