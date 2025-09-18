// API integration module for device specifications
class DeviceAPI {
    constructor() {
        this.lastRequestTime = 0;
        this.requestCount = 0;
        this.requestTimes = [];
        
        // Initialize mock data for demonstration
        this.initializeMockData();
    }
    
    // Initialize mock device data for demonstration purposes
    initializeMockData() {
        this.mockDevices = [
            {
                id: '1',
                name: 'iPhone 15 Pro',
                brand: 'Apple',
                model: 'iPhone 15 Pro',
                category: 'smartphone',
                image: 'https://via.placeholder.com/300x400/1e1e1e/ffffff?text=iPhone+15+Pro',
                specifications: {
                    display: {
                        size: '6.1 inches',
                        resolution: '2556 x 1179',
                        type: 'Super Retina XDR OLED',
                        refresh_rate: '120Hz'
                    },
                    processor: {
                        chipset: 'Apple A17 Pro',
                        cpu: 'Hexa-core',
                        gpu: 'Apple GPU (6-core)'
                    },
                    memory: {
                        ram: '8GB',
                        storage: '128GB/256GB/512GB/1TB',
                        expandable: 'No'
                    },
                    camera: {
                        main: '48MP',
                        ultra_wide: '12MP',
                        telephoto: '12MP',
                        front: '12MP'
                    },
                    battery: {
                        capacity: '3274 mAh',
                        charging: '27W wired, 15W wireless',
                        fast_charging: 'Yes'
                    },
                    connectivity: {
                        network: '5G',
                        wifi: 'Wi-Fi 6E',
                        bluetooth: '5.3',
                        usb: 'USB-C'
                    },
                    dimensions: {
                        height: '146.6 mm',
                        width: '70.6 mm',
                        thickness: '8.25 mm',
                        weight: '187g'
                    },
                    os: 'iOS 17',
                    price: '$999'
                }
            },
            {
                id: '2',
                name: 'Samsung Galaxy S24 Ultra',
                brand: 'Samsung',
                model: 'Galaxy S24 Ultra',
                category: 'smartphone',
                image: 'https://via.placeholder.com/300x400/1a1a1a/ffffff?text=Galaxy+S24+Ultra',
                specifications: {
                    display: {
                        size: '6.8 inches',
                        resolution: '3120 x 1440',
                        type: 'Dynamic AMOLED 2X',
                        refresh_rate: '120Hz'
                    },
                    processor: {
                        chipset: 'Snapdragon 8 Gen 3',
                        cpu: 'Octa-core',
                        gpu: 'Adreno 750'
                    },
                    memory: {
                        ram: '12GB',
                        storage: '256GB/512GB/1TB',
                        expandable: 'No'
                    },
                    camera: {
                        main: '200MP',
                        ultra_wide: '12MP',
                        telephoto: '10MP + 50MP',
                        front: '12MP'
                    },
                    battery: {
                        capacity: '5000 mAh',
                        charging: '45W wired, 15W wireless',
                        fast_charging: 'Yes'
                    },
                    connectivity: {
                        network: '5G',
                        wifi: 'Wi-Fi 7',
                        bluetooth: '5.3',
                        usb: 'USB-C'
                    },
                    dimensions: {
                        height: '162.3 mm',
                        width: '79.0 mm',
                        thickness: '8.6 mm',
                        weight: '232g'
                    },
                    os: 'Android 14, One UI 6.1',
                    price: '$1199'
                }
            },
            {
                id: '3',
                name: 'MacBook Pro 14-inch M3',
                brand: 'Apple',
                model: 'MacBook Pro 14-inch',
                category: 'laptop',
                image: 'https://via.placeholder.com/400x300/2d2d2d/ffffff?text=MacBook+Pro+M3',
                specifications: {
                    display: {
                        size: '14.2 inches',
                        resolution: '3024 x 1964',
                        type: 'Liquid Retina XDR',
                        refresh_rate: '120Hz'
                    },
                    processor: {
                        chipset: 'Apple M3',
                        cpu: '8-core CPU',
                        gpu: '10-core GPU'
                    },
                    memory: {
                        ram: '8GB/18GB/36GB',
                        storage: '512GB/1TB/2TB/4TB/8TB SSD',
                        expandable: 'No'
                    },
                    battery: {
                        capacity: '70Wh',
                        life: 'Up to 22 hours',
                        charging: '96W USB-C'
                    },
                    connectivity: {
                        wifi: 'Wi-Fi 6E',
                        bluetooth: '5.3',
                        ports: '3x Thunderbolt 4, HDMI, SDXC, 3.5mm'
                    },
                    dimensions: {
                        height: '312.6 mm',
                        width: '221.2 mm',
                        thickness: '15.5 mm',
                        weight: '1.55kg'
                    },
                    os: 'macOS Sonoma',
                    price: '$1599'
                }
            },
            {
                id: '4',
                name: 'iPad Pro 12.9-inch M2',
                brand: 'Apple',
                model: 'iPad Pro 12.9-inch',
                category: 'tablet',
                image: 'https://via.placeholder.com/300x400/f0f0f0/333333?text=iPad+Pro+M2',
                specifications: {
                    display: {
                        size: '12.9 inches',
                        resolution: '2732 x 2048',
                        type: 'Liquid Retina XDR',
                        refresh_rate: '120Hz'
                    },
                    processor: {
                        chipset: 'Apple M2',
                        cpu: '8-core CPU',
                        gpu: '10-core GPU'
                    },
                    memory: {
                        ram: '8GB/16GB',
                        storage: '128GB/256GB/512GB/1TB/2TB',
                        expandable: 'No'
                    },
                    camera: {
                        main: '12MP Wide',
                        ultra_wide: '10MP',
                        front: '12MP TrueDepth'
                    },
                    battery: {
                        capacity: '40.88Wh',
                        life: 'Up to 10 hours',
                        charging: '20W USB-C'
                    },
                    connectivity: {
                        wifi: 'Wi-Fi 6E',
                        bluetooth: '5.3',
                        cellular: '5G (optional)'
                    },
                    dimensions: {
                        height: '280.6 mm',
                        width: '214.9 mm',
                        thickness: '6.4 mm',
                        weight: '682g'
                    },
                    os: 'iPadOS 17',
                    price: '$1099'
                }
            },
            {
                id: '5',
                name: 'Google Pixel 8 Pro',
                brand: 'Google',
                model: 'Pixel 8 Pro',
                category: 'smartphone',
                image: 'https://via.placeholder.com/300x400/4285f4/ffffff?text=Pixel+8+Pro',
                specifications: {
                    display: {
                        size: '6.7 inches',
                        resolution: '2992 x 1344',
                        type: 'LTPO OLED',
                        refresh_rate: '120Hz'
                    },
                    processor: {
                        chipset: 'Google Tensor G3',
                        cpu: 'Octa-core',
                        gpu: 'Immortalis-G715s MC10'
                    },
                    memory: {
                        ram: '12GB',
                        storage: '128GB/256GB/512GB/1TB',
                        expandable: 'No'
                    },
                    camera: {
                        main: '50MP',
                        ultra_wide: '48MP',
                        telephoto: '48MP',
                        front: '10.5MP'
                    },
                    battery: {
                        capacity: '5050 mAh',
                        charging: '30W wired, 23W wireless',
                        fast_charging: 'Yes'
                    },
                    connectivity: {
                        network: '5G',
                        wifi: 'Wi-Fi 7',
                        bluetooth: '5.3',
                        usb: 'USB-C'
                    },
                    dimensions: {
                        height: '162.6 mm',
                        width: '76.5 mm',
                        thickness: '8.8 mm',
                        weight: '213g'
                    },
                    os: 'Android 14',
                    price: '$999'
                }
            }
        ];
    }
    
    // Rate limiting check
    checkRateLimit() {
        const now = Date.now();
        const oneMinuteAgo = now - 60000;
        
        // Remove old requests
        this.requestTimes = this.requestTimes.filter(time => time > oneMinuteAgo);
        
        if (this.requestTimes.length >= CONFIG.RATE_LIMIT.MAX_REQUESTS_PER_MINUTE) {
            throw new Error('Rate limit exceeded. Please wait a moment before searching again.');
        }
        
        // Check cooldown period
        if (now - this.lastRequestTime < CONFIG.RATE_LIMIT.COOLDOWN_PERIOD) {
            throw new Error('Please wait a moment between searches.');
        }
        
        this.requestTimes.push(now);
        this.lastRequestTime = now;
    }
    
    // Input validation
    validateInput(query) {
        if (!query || typeof query !== 'string') {
            throw new Error('Please enter a valid search query.');
        }
        
        const trimmedQuery = query.trim();
        if (trimmedQuery.length < CONFIG.SEARCH.MIN_QUERY_LENGTH) {
            throw new Error(`Search query must be at least ${CONFIG.SEARCH.MIN_QUERY_LENGTH} characters long.`);
        }
        
        // Basic XSS prevention
        if (/<script|javascript:|data:/i.test(trimmedQuery)) {
            throw new Error('Invalid search query format.');
        }
        
        return trimmedQuery;
    }
    
    // Search devices by name, brand, or model
    async searchDevices(query) {
        try {
            // Validate input and check rate limits
            const validatedQuery = this.validateInput(query);
            this.checkRateLimit();
            
            if (CONFIG.MOCK_API.ENABLED) {
                return this.searchMockDevices(validatedQuery);
            }
            
            // Real API implementation would go here
            return this.callRealAPI('search', { query: validatedQuery });
            
        } catch (error) {
            console.error('Search error:', error);
            throw error;
        }
    }
    
    // Mock device search implementation
    async searchMockDevices(query) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
        
        const lowerQuery = query.toLowerCase();
        const results = this.mockDevices.filter(device => 
            device.name.toLowerCase().includes(lowerQuery) ||
            device.brand.toLowerCase().includes(lowerQuery) ||
            device.model.toLowerCase().includes(lowerQuery) ||
            device.category.toLowerCase().includes(lowerQuery)
        );
        
        if (results.length === 0) {
            throw new Error(`No devices found matching "${query}". Try searching for iPhone, Samsung, MacBook, iPad, or Pixel.`);
        }
        
        return {
            success: true,
            results: results.slice(0, CONFIG.SEARCH.MAX_RESULTS),
            total: results.length
        };
    }
    
    // Get detailed device specifications
    async getDeviceDetails(deviceId) {
        try {
            this.checkRateLimit();
            
            if (CONFIG.MOCK_API.ENABLED) {
                return this.getMockDeviceDetails(deviceId);
            }
            
            return this.callRealAPI('details', { id: deviceId });
            
        } catch (error) {
            console.error('Device details error:', error);
            throw error;
        }
    }
    
    // Mock device details implementation
    async getMockDeviceDetails(deviceId) {
        await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
        
        const device = this.mockDevices.find(d => d.id === deviceId);
        if (!device) {
            throw new Error('Device not found.');
        }
        
        return {
            success: true,
            device: device
        };
    }
    
    // Compare multiple devices
    async compareDevices(deviceIds) {
        try {
            if (!Array.isArray(deviceIds) || deviceIds.length < 2) {
                throw new Error('Please provide at least 2 devices to compare.');
            }
            
            if (deviceIds.length > 3) {
                throw new Error('You can compare up to 3 devices at once.');
            }
            
            this.checkRateLimit();
            
            const devices = [];
            for (const id of deviceIds) {
                const result = await this.getDeviceDetails(id);
                devices.push(result.device);
            }
            
            return {
                success: true,
                devices: devices
            };
            
        } catch (error) {
            console.error('Comparison error:', error);
            throw error;
        }
    }
    
    // Real API call implementation (placeholder)
    async callRealAPI(endpoint, params) {
        const url = new URL(CONFIG.API.ENDPOINTS[endpoint.toUpperCase()], CONFIG.API.BASE_URL);
        
        // Add query parameters
        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key]);
        });
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': CONFIG.API.RAPIDAPI_KEY,
                'X-RapidAPI-Host': CONFIG.API.RAPIDAPI_HOST,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    }
    
    // Get search suggestions based on partial query
    getSearchSuggestions(query) {
        if (!query || query.length < 2) {
            return [];
        }
        
        const lowerQuery = query.toLowerCase();
        const suggestions = new Set();
        
        this.mockDevices.forEach(device => {
            if (device.name.toLowerCase().includes(lowerQuery)) {
                suggestions.add(device.name);
            }
            if (device.brand.toLowerCase().includes(lowerQuery)) {
                suggestions.add(device.brand);
            }
        });
        
        return Array.from(suggestions).slice(0, 5);
    }
}

// Export for use in chatbot
window.DeviceAPI = DeviceAPI;