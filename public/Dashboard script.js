const sidebar = document.querySelector('.sidebar'); // Use the correct selector
const toggleBtn = document.querySelector('.toggle-btn');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Get elements
const logoutButton = document.getElementById('logout-button');
const viewProfileButton = document.getElementById('view-profile-button');
const viewAnalyticsButton = document.getElementById('view-analytics-button');
const viewSettingsButton = document.getElementById('view-settings-button');

// Logout functionality
logoutButton.addEventListener('click', () => {
  // Clear all stored user data (e.g., tokens or user profile) from localStorage
  localStorage.removeItem('token'); // Token stored during login
  localStorage.removeItem('userProfile'); // Clear user profile

  // Optional: Call a backend logout API if necessary (not required for frontend-only logout)
  // Example:
  // fetch('/api/logout', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem('token')}`,
  //   },
  // }).catch((err) => console.error('Logout API error:', err));

  // Notify the user
  alert('You have logged out successfully!');

  // Redirect to login page
  window.location.href = 'index.html'; // Update with your actual login page URL
});

// Redirect to profile
viewProfileButton.addEventListener('click', () => {
  window.location.href = 'profile.html';
});

// Redirect to analytics (placeholder)
viewAnalyticsButton.addEventListener('click', () => {
  alert('Analytics page coming soon!');
});

// Redirect to settings (placeholder)
viewSettingsButton.addEventListener('click', () => {
  alert('Settings page coming soon!');
});
