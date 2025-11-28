/**
 * Service Worker Registration Utility
 * Handles PWA installation and updates
 */

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Wait for page load
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });

          console.log('Service Worker registered successfully:', registration);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available
                showUpdateNotification();
              }
            });
          });

          // Check for updates periodically (every hour)
          setInterval(() => {
            registration.update();
          }, 3600000);

        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      });
    } catch (error) {
      console.error('Service Worker not supported:', error);
    }
  }
};

/**
 * Show update notification to user
 */
const showUpdateNotification = () => {
  // You can integrate this with your toast notification system
  if (window.confirm('নতুন আপডেট উপলব্ধ! এখনই আপডেট করতে চান?')) {
    window.location.reload();
  }
};

/**
 * Unregister service worker
 */
export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
      console.log('Service Worker unregistered');
    } catch (error) {
      console.error('Service Worker unregistration failed:', error);
    }
  }
};

/**
 * Check if app is running as PWA
 */
export const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone ||
         document.referrer.includes('android-app://');
};

export default registerServiceWorker;
