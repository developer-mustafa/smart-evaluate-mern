// Script to unregister all service workers to fix the manifest MIME type error
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      console.log('Unregistering service worker:', registration);
      registration.unregister();
    }
    console.log('All service workers unregistered. Reloading page...');
    // Optional: window.location.reload();
  });
}
