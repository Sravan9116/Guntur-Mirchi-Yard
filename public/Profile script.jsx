const sidebar = document.querySelector('.sidebar'); // Use the correct selector
const toggleBtn = document.querySelector('.toggle-btn');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

const form = document.getElementById('user-form');
const profileSection = document.getElementById('profile-section');
const formSection = document.getElementById('form-section');

// Display elements
const displayName = document.getElementById('display-name');
const displayBio = document.getElementById('display-bio');
const displaySkills = document.getElementById('display-skills');
const displayEmail = document.getElementById('display-email');
const displayPhone = document.getElementById('display-phone');
const displayPic = document.getElementById('display-pic');

// Check if user data exists in localStorage and display it 
window.onload = () => {
  const userData = JSON.parse(localStorage.getItem('userProfile'));
  if (userData) {
    displayUserProfile(userData);
    formSection.classList.add('hidden');
    profileSection.classList.remove('hidden');
  }
};

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get user input
  const name = document.getElementById('name').value;
  const bio = document.getElementById('bio').value;
  const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const profilePic = document.getElementById('profile-pic').files[0];

  const userProfile = { name, bio, skills, email, phone };

  // Handle profile picture
  if (profilePic) {
    const reader = new FileReader();
    reader.onload = function (e) {
      userProfile.profilePic = e.target.result;
      saveAndDisplayProfile(userProfile);
    };
    reader.readAsDataURL(profilePic);
  } else {
    saveAndDisplayProfile(userProfile);
  }
});

// Save to localStorage and display profile
function saveAndDisplayProfile(userProfile) {
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
  displayUserProfile(userProfile);
  formSection.classList.add('hidden');
  profileSection.classList.remove('hidden');
}

// Display the user's profile
function displayUserProfile(userProfile) {
  displayName.textContent = userProfile.name;
  displayBio.textContent = userProfile.bio;
  displayEmail.textContent = userProfile.email;
  displayPhone.textContent = userProfile.phone;

  displaySkills.innerHTML = '';
  userProfile.skills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    displaySkills.appendChild(li);
  });

  if (userProfile.profilePic) {
    displayPic.src = userProfile.profilePic;
  } else {
    displayPic.src = 'default-profile.png'; // Default profile picture
  }
}

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


