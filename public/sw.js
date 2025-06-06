const CACHE_NAME = 'pixly-forge-v1.0.0';
const STATIC_CACHE = 'pixly-forge-static-v1.0.0';
const DYNAMIC_CACHE = 'pixly-forge-dynamic-v1.0.0';

// Files to cache for offline functionality
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  // Add your built assets here - these will be generated by Vite
  // '/assets/index.css',
  // '/assets/index.js',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            // Cache dynamic content
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If network fails, try to serve offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Background sync for failed operations
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    event.waitUntil(
      // Handle any queued operations here
      handleBackgroundSync()
    );
  }
});

// Push notifications for updates (7-day scheduling)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New features available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'update',
        title: 'Update Now',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'later',
        title: 'Remind Later',
        icon: '/icons/icon-72x72.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Pixly Forge Update', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  event.notification.close();

  if (event.action === 'update') {
    // Handle update action
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'later') {
    // Schedule reminder for later (7 days)
    scheduleUpdateReminder();
  } else {
    // Default action - open app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CHECK_UPDATE') {
    checkForUpdates().then((hasUpdate) => {
      event.ports[0].postMessage({ hasUpdate });
    });
  }
  
  if (event.data && event.data.type === 'SCHEDULE_UPDATE_CHECK') {
    scheduleUpdateCheck(event.data.days || 7);
  }
});

// Helper functions
async function handleBackgroundSync() {
  try {
    // Handle any queued operations
    console.log('Service Worker: Handling background sync');
    return Promise.resolve();
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
    throw error;
  }
}

async function checkForUpdates() {
  try {
    const response = await fetch('/manifest.json', { cache: 'no-cache' });
    const manifest = await response.json();
    
    // Compare with cached version
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match('/manifest.json');
    
    if (cachedResponse) {
      const cachedManifest = await cachedResponse.json();
      return manifest.version !== cachedManifest.version;
    }
    
    return false;
  } catch (error) {
    console.error('Service Worker: Error checking for updates', error);
    return false;
  }
}

function scheduleUpdateReminder() {
  // Schedule a reminder for 7 days later
  const reminderTime = Date.now() + (7 * 24 * 60 * 60 * 1000); // 7 days
  
  // Store reminder in IndexedDB or use setTimeout for shorter periods
  console.log('Service Worker: Update reminder scheduled for', new Date(reminderTime));
}

function scheduleUpdateCheck(days = 7) {
  // Schedule periodic update checks
  const checkTime = Date.now() + (days * 24 * 60 * 60 * 1000);
  console.log('Service Worker: Update check scheduled for', new Date(checkTime));
  
  // In a real implementation, you might use the Background Sync API
  // or store this in IndexedDB for persistence
}

// Periodic background sync registration
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-check') {
    event.waitUntil(
      checkForUpdates().then((hasUpdate) => {
        if (hasUpdate) {
          return self.registration.showNotification('Update Available', {
            body: 'A new version of Pixly Forge is available!',
            icon: '/icons/icon-192x192.png',
            tag: 'update-available'
          });
        }
      })
    );
  }
});

console.log('Service Worker: Loaded successfully'); 