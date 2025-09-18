// Configuration file for API settings and environment variables
const CONFIG = {
    // Using a free device database API - Device Database API via RapidAPI
    // This is a fallback configuration - in production, use environment variables
    API: {
        BASE_URL: 'https://device-database.p.rapidapi.com',
        // Note: In production, this should be loaded from environment variables
        // For demo purposes, we'll use a mock API or a free service
        RAPIDAPI_KEY: 'demo_key', // Replace with actual key
        RAPIDAPI_HOST: 'device-database.p.rapidapi.com',
        ENDPOINTS: {
            SEARCH: '/search',
            DEVICE_DETAILS: '/device'
        }
    },
    
    // Fallback to a mock API for demonstration
    MOCK_API: {
        ENABLED: true, // Enable mock data for demonstration
        BASE_URL: 'mock'
    },
    
    // Rate limiting configuration
    RATE_LIMIT: {
        MAX_REQUESTS_PER_MINUTE: 30,
        COOLDOWN_PERIOD: 2000 // 2 seconds between requests
    },
    
    // Search configuration
    SEARCH: {
        MIN_QUERY_LENGTH: 2,
        MAX_RESULTS: 10,
        DEBOUNCE_DELAY: 500
    },
    
    // UI configuration
    UI: {
        MAX_HISTORY_ITEMS: 20,
        ANIMATION_DURATION: 300,
        AUTO_SCROLL_DELAY: 100
    }
};

// Environment detection
CONFIG.IS_DEVELOPMENT = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Export for use in other modules
window.CONFIG = CONFIG;