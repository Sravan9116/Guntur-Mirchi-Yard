// Global Settings Object
const settings = {
    userAccount: {
      name: '',
      email: '',
      phone: '',
      profilePicture: '',
    },
    password: {
      current: '',
      new: '',
    },
    security: {
      twoFactorAuth: false,
      loginActivity: [],
    },
    notifications: {
      email: false,
      sms: false,
      push: false,
    },
    languageRegion: {
      language: 'en',
      timeZone: '',
      currency: '',
    },
    appearance: {
      theme: 'light',
      fontSize: 16,
    },
    paymentBilling: {
      billingAddress: '',
      transactions: [],
    },
    general: {
      siteLanguage: 'en',
      dateTimeFormat: '',
      customURL: '',
    },
  };
  
  // DOM Elements
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const userPhone = document.getElementById('userPhone');
  const profilePicture = document.getElementById('profilePicture');
  const currentPassword = document.getElementById('current-password');
  const newPassword = document.getElementById('new-password');
  const confirmPassword = document.getElementById('confirm-password');
  const twoFactorAuth = document.getElementById('twoFactorAuth');
  const emailNotifications = document.getElementById('emailNotifications');
  const smsAlerts = document.getElementById('smsAlerts');
  const pushNotifications = document.getElementById('pushNotifications');
  const language = document.getElementById('language');
  const timeZone = document.getElementById('timeZone');
  const currency = document.getElementById('currency');
  const fontSize = document.getElementById('fontSize');
  const themeOptions = document.getElementsByName('theme');
  const billingAddress = document.getElementById('billingAddress');
  const siteLanguage = document.getElementById('siteLanguage');
  const dateTimeFormat = document.getElementById('dateTimeFormat');
  const customURL = document.getElementById('customURL');
  const saveSettingsBtn = document.getElementById('save-settings-btn');
  
  // Helper Functions
  function applyAppearanceSettings() {
    // Change theme
    const selectedTheme = [...themeOptions].find((theme) => theme.checked).value;
    document.body.className = selectedTheme === 'dark' ? 'dark-theme' : 'light-theme';
  
    // Update font size
    const fontSizeValue = parseInt(fontSize.value) || 16;
    document.body.style.fontSize = `${fontSizeValue}px`;
  }
  
  function saveSettings() {
    // Update settings object with current values
    settings.userAccount.name = userName.value;
    settings.userAccount.email = userEmail.value;
    settings.userAccount.phone = userPhone.value;
    settings.userAccount.profilePicture = profilePicture.files[0] || null;
  
    settings.password.new = newPassword.value;
  
    settings.security.twoFactorAuth = twoFactorAuth.checked;
  
    settings.notifications.email = emailNotifications.checked;
    settings.notifications.sms = smsAlerts.checked;
    settings.notifications.push = pushNotifications.checked;
  
    settings.languageRegion.language = language.value;
    settings.languageRegion.timeZone = timeZone.value;
    settings.languageRegion.currency = currency.value;
  
    settings.appearance.theme = [...themeOptions].find((theme) => theme.checked).value;
    settings.appearance.fontSize = parseInt(fontSize.value) || 16;
  
    settings.paymentBilling.billingAddress = billingAddress.value;
  
    settings.general.siteLanguage = siteLanguage.value;
    settings.general.dateTimeFormat = dateTimeFormat.value;
    settings.general.customURL = customURL.value;
  
    // Simulate save operation
    console.log('Settings Saved:', settings);
    alert('Settings have been saved successfully!');
  }
  
  function resetPassword() {
    if (newPassword.value !== confirmPassword.value) {
      alert('New password and confirm password do not match!');
      return;
    }
    settings.password.current = currentPassword.value;
    settings.password.new = newPassword.value;
  
    alert('Password updated successfully!');
  }
  
  // Event Listeners
  saveSettingsBtn.addEventListener('click', () => {
    applyAppearanceSettings();
    saveSettings();
  });
  
  document.getElementById('change-password-btn').addEventListener('click', resetPassword);
  
  // Apply appearance settings immediately on theme or font size change
  [...themeOptions].forEach((option) =>
    option.addEventListener('change', applyAppearanceSettings)
  );
  fontSize.addEventListener('input', applyAppearanceSettings);
  
  // Simulate view login activity
  document.getElementById('view-login-activity').addEventListener('click', () => {
    alert('Login activity: Feature coming soon!');
  });
  
  // Simulate transaction history
  document.getElementById('viewTransactions').addEventListener('click', () => {
    alert('Transaction history: Feature coming soon!');
  });
  
  // Simulate manage payment methods
  document.getElementById('managePayments').addEventListener('click', () => {
    alert('Manage payment methods: Feature coming soon!');
  });
  