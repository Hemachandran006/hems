// Main chatbot functionality
class DeviceChatbot {
    constructor() {
        this.api = new DeviceAPI();
        this.searchHistory = this.loadSearchHistory();
        this.currentConversation = [];
        this.isLoading = false;
        this.lastSearchTime = 0;
        
        this.initializeElements();
        this.bindEvents();
        this.updateSearchHistory();
        this.enableChat();
    }
    
    // Initialize DOM elements
    initializeElements() {
        this.elements = {
            chatMessages: document.getElementById('chatMessages'),
            chatInput: document.getElementById('chatInput'),
            sendButton: document.getElementById('sendButton'),
            loadingOverlay: document.getElementById('loadingOverlay'),
            errorModal: document.getElementById('errorModal'),
            errorMessage: document.getElementById('errorMessage'),
            closeErrorModal: document.getElementById('closeErrorModal'),
            searchSuggestions: document.getElementById('searchSuggestions'),
            searchHistory: document.getElementById('searchHistory'),
            historyItems: document.getElementById('historyItems')
        };
    }
    
    // Bind event listeners
    bindEvents() {
        // Chat input events
        this.elements.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });
        
        this.elements.chatInput.addEventListener('input', (e) => {
            this.handleInputChange(e.target.value);
        });
        
        this.elements.sendButton.addEventListener('click', () => {
            this.handleSendMessage();
        });
        
        // Modal events
        this.elements.closeErrorModal.addEventListener('click', () => {
            this.hideErrorModal();
        });
        
        this.elements.errorModal.addEventListener('click', (e) => {
            if (e.target === this.elements.errorModal) {
                this.hideErrorModal();
            }
        });
        
        // History click events
        this.elements.historyItems.addEventListener('click', (e) => {
            if (e.target.classList.contains('history-item')) {
                const query = e.target.textContent;
                this.elements.chatInput.value = query;
                this.elements.chatInput.focus();
            }
        });
    }
    
    // Enable chat functionality
    enableChat() {
        this.elements.chatInput.disabled = false;
        this.elements.sendButton.disabled = false;
        this.elements.chatInput.placeholder = "Type a device name or question...";
    }
    
    // Handle input changes for suggestions
    handleInputChange(value) {
        clearTimeout(this.suggestionsTimeout);
        
        if (value.length >= 2) {
            this.suggestionsTimeout = setTimeout(() => {
                this.showSearchSuggestions(value);
            }, CONFIG.SEARCH.DEBOUNCE_DELAY);
        } else {
            this.clearSearchSuggestions();
        }
    }
    
    // Show search suggestions
    showSearchSuggestions(query) {
        try {
            const suggestions = this.api.getSearchSuggestions(query);
            this.elements.searchSuggestions.innerHTML = '';
            
            suggestions.forEach(suggestion => {
                const chip = document.createElement('span');
                chip.className = 'suggestion-chip';
                chip.textContent = suggestion;
                chip.addEventListener('click', () => {
                    this.elements.chatInput.value = suggestion;
                    this.clearSearchSuggestions();
                    this.elements.chatInput.focus();
                });
                this.elements.searchSuggestions.appendChild(chip);
            });
        } catch (error) {
            console.warn('Error showing suggestions:', error);
        }
    }
    
    // Clear search suggestions
    clearSearchSuggestions() {
        this.elements.searchSuggestions.innerHTML = '';
    }
    
    // Handle send message
    async handleSendMessage() {
        const message = this.elements.chatInput.value.trim();
        if (!message || this.isLoading) return;
        
        this.elements.chatInput.value = '';
        this.clearSearchSuggestions();
        
        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Add to search history
        this.addToSearchHistory(message);
        
        try {
            await this.processUserMessage(message);
        } catch (error) {
            this.handleError(error);
        }
    }
    
    // Process user message and generate response
    async processUserMessage(message) {
        this.setLoading(true);
        
        try {
            // Detect intent and handle accordingly
            const intent = this.detectIntent(message);
            
            switch (intent.type) {
                case 'search':
                    await this.handleSearch(intent.query);
                    break;
                case 'compare':
                    await this.handleComparison(intent.devices);
                    break;
                case 'details':
                    await this.handleDeviceDetails(intent.deviceId);
                    break;
                case 'help':
                    this.handleHelp();
                    break;
                default:
                    await this.handleSearch(message);
            }
        } finally {
            this.setLoading(false);
        }
    }
    
    // Detect user intent from message
    detectIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        // Compare intent
        if (lowerMessage.includes('compare') || lowerMessage.includes(' vs ') || lowerMessage.includes(' versus ')) {
            const devices = this.extractDevicesFromCompareQuery(message);
            return { type: 'compare', devices };
        }
        
        // Help intent
        if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage === '?') {
            return { type: 'help' };
        }
        
        // Default to search
        return { type: 'search', query: message };
    }
    
    // Extract device names from comparison query
    extractDevicesFromCompareQuery(message) {
        // Simple extraction - in production, use more sophisticated NLP
        
        // Handle "compare X vs Y" pattern
        const compareVsMatch = message.match(/compare\s+(.+?)(?:\s+vs\s+|\s+versus\s+)(.+)/i);
        if (compareVsMatch) {
            return [compareVsMatch[1].trim(), compareVsMatch[2].trim()];
        }
        
        // Handle "X vs Y" pattern
        const vsMatch = message.match(/^(.+?)(?:\s+vs\s+|\s+versus\s+)(.+)$/i);
        if (vsMatch) {
            return [vsMatch[1].trim(), vsMatch[2].trim()];
        }
        
        // Handle "compare X and Y" pattern
        const compareAndMatch = message.match(/compare\s+(.+?)(?:\s+and\s+|\s+with\s+)(.+)/i);
        if (compareAndMatch) {
            return [compareAndMatch[1].trim(), compareAndMatch[2].trim()];
        }
        
        return [];
    }
    
    // Handle device search
    async handleSearch(query) {
        try {
            const result = await this.api.searchDevices(query);
            
            if (result.results.length === 1) {
                // Single result - show detailed specs
                const device = result.results[0];
                this.addDeviceSpecsMessage(device);
            } else {
                // Multiple results - show search results
                this.addSearchResultsMessage(result.results, query);
            }
        } catch (error) {
            throw error;
        }
    }
    
    // Handle device comparison
    async handleComparison(deviceQueries) {
        if (deviceQueries.length < 2) {
            this.addMessage('Please specify two devices to compare. For example: "compare iPhone 15 vs Samsung S24"', 'bot');
            return;
        }
        
        try {
            // Search for each device
            const devices = [];
            for (const query of deviceQueries) {
                const result = await this.api.searchDevices(query);
                if (result.results.length > 0) {
                    devices.push(result.results[0]);
                }
            }
            
            if (devices.length < 2) {
                this.addMessage('I couldn\'t find enough devices to compare. Please try with more specific device names.', 'bot');
                return;
            }
            
            this.addComparisonMessage(devices);
        } catch (error) {
            throw error;
        }
    }
    
    // Handle help request
    handleHelp() {
        const helpMessage = `
            <h3>How to use Device Specs Chatbot:</h3>
            <ul>
                <li><strong>Search for devices:</strong> Type device names like "iPhone 15", "Samsung Galaxy S24", or "MacBook Pro"</li>
                <li><strong>Compare devices:</strong> Use "compare iPhone 15 vs Samsung S24" or "iPhone 15 vs Samsung S24"</li>
                <li><strong>Browse by brand:</strong> Search for "Apple", "Samsung", "Google" to see available devices</li>
                <li><strong>Categories:</strong> Search for "smartphones", "laptops", or "tablets"</li>
            </ul>
            <p>I can show you detailed specifications including display, processor, camera, battery, and more!</p>
        `;
        this.addMessage(helpMessage, 'bot');
    }
    
    // Add message to chat
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = content;
        
        messageDiv.appendChild(contentDiv);
        this.elements.chatMessages.appendChild(messageDiv);
        
        // Auto-scroll to bottom
        setTimeout(() => {
            this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
        }, CONFIG.UI.AUTO_SCROLL_DELAY);
    }
    
    // Add device specifications message
    addDeviceSpecsMessage(device) {
        const content = `
            <h3>${device.name}</h3>
            <div class="device-spec">
                <h4>📱 Display</h4>
                <div class="spec-grid">
                    <div class="spec-item">
                        <span class="spec-label">Size:</span> 
                        <span class="spec-value">${device.specifications.display.size}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Resolution:</span> 
                        <span class="spec-value">${device.specifications.display.resolution}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Type:</span> 
                        <span class="spec-value">${device.specifications.display.type}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Refresh Rate:</span> 
                        <span class="spec-value">${device.specifications.display.refresh_rate}</span>
                    </div>
                </div>
            </div>
            
            <div class="device-spec">
                <h4>⚡ Processor</h4>
                <div class="spec-grid">
                    <div class="spec-item">
                        <span class="spec-label">Chipset:</span> 
                        <span class="spec-value">${device.specifications.processor.chipset}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">CPU:</span> 
                        <span class="spec-value">${device.specifications.processor.cpu}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">GPU:</span> 
                        <span class="spec-value">${device.specifications.processor.gpu}</span>
                    </div>
                </div>
            </div>
            
            <div class="device-spec">
                <h4>💾 Memory</h4>
                <div class="spec-grid">
                    <div class="spec-item">
                        <span class="spec-label">RAM:</span> 
                        <span class="spec-value">${device.specifications.memory.ram}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Storage:</span> 
                        <span class="spec-value">${device.specifications.memory.storage}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Expandable:</span> 
                        <span class="spec-value">${device.specifications.memory.expandable}</span>
                    </div>
                </div>
            </div>
            
            ${device.specifications.camera ? `
            <div class="device-spec">
                <h4>📸 Camera</h4>
                <div class="spec-grid">
                    <div class="spec-item">
                        <span class="spec-label">Main:</span> 
                        <span class="spec-value">${device.specifications.camera.main}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Ultra Wide:</span> 
                        <span class="spec-value">${device.specifications.camera.ultra_wide || 'N/A'}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Telephoto:</span> 
                        <span class="spec-value">${device.specifications.camera.telephoto || 'N/A'}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Front:</span> 
                        <span class="spec-value">${device.specifications.camera.front}</span>
                    </div>
                </div>
            </div>
            ` : ''}
            
            <div class="device-spec">
                <h4>🔋 Battery</h4>
                <div class="spec-grid">
                    <div class="spec-item">
                        <span class="spec-label">Capacity:</span> 
                        <span class="spec-value">${device.specifications.battery.capacity || device.specifications.battery.life}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Charging:</span> 
                        <span class="spec-value">${device.specifications.battery.charging}</span>
                    </div>
                </div>
            </div>
            
            <div class="device-spec">
                <h4>📊 General</h4>
                <div class="spec-grid">
                    <div class="spec-item">
                        <span class="spec-label">OS:</span> 
                        <span class="spec-value">${device.specifications.os}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Weight:</span> 
                        <span class="spec-value">${device.specifications.dimensions.weight}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Price:</span> 
                        <span class="spec-value">${device.specifications.price}</span>
                    </div>
                </div>
            </div>
        `;
        
        this.addMessage(content, 'bot');
    }
    
    // Add search results message
    addSearchResultsMessage(devices, query) {
        let content = `<h3>Found ${devices.length} devices for "${query}":</h3>`;
        
        devices.forEach(device => {
            content += `
                <div class="device-spec" style="cursor: pointer;" onclick="chatbot.searchSpecificDevice('${device.name}')">
                    <h4>${device.name}</h4>
                    <div class="spec-grid">
                        <div class="spec-item">
                            <span class="spec-label">Brand:</span> 
                            <span class="spec-value">${device.brand}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Category:</span> 
                            <span class="spec-value">${device.category}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Price:</span> 
                            <span class="spec-value">${device.specifications.price}</span>
                        </div>
                    </div>
                    <p style="margin-top: 8px; font-size: 0.9em; opacity: 0.8;">Click to see full specifications</p>
                </div>
            `;
        });
        
        this.addMessage(content, 'bot');
    }
    
    // Add comparison message
    addComparisonMessage(devices) {
        let content = `<h3>Device Comparison</h3>`;
        content += `<div class="device-comparison">`;
        
        devices.forEach(device => {
            content += `
                <div class="comparison-device">
                    <h4>${device.name}</h4>
                    <div class="spec-grid">
                        <div class="spec-item">
                            <span class="spec-label">Display:</span> 
                            <span class="spec-value">${device.specifications.display.size}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Processor:</span> 
                            <span class="spec-value">${device.specifications.processor.chipset}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">RAM:</span> 
                            <span class="spec-value">${device.specifications.memory.ram}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Storage:</span> 
                            <span class="spec-value">${device.specifications.memory.storage}</span>
                        </div>
                        ${device.specifications.camera ? `
                        <div class="spec-item">
                            <span class="spec-label">Main Camera:</span> 
                            <span class="spec-value">${device.specifications.camera.main}</span>
                        </div>
                        ` : ''}
                        <div class="spec-item">
                            <span class="spec-label">Battery:</span> 
                            <span class="spec-value">${device.specifications.battery.capacity || device.specifications.battery.life}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Price:</span> 
                            <span class="spec-value">${device.specifications.price}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        content += `</div>`;
        this.addMessage(content, 'bot');
    }
    
    // Search for specific device (called from search results)
    async searchSpecificDevice(deviceName) {
        this.elements.chatInput.value = deviceName;
        await this.handleSendMessage();
    }
    
    // Set loading state
    setLoading(loading) {
        this.isLoading = loading;
        if (loading) {
            this.elements.loadingOverlay.classList.add('show');
            this.elements.chatInput.disabled = true;
            this.elements.sendButton.disabled = true;
        } else {
            this.elements.loadingOverlay.classList.remove('show');
            this.elements.chatInput.disabled = false;
            this.elements.sendButton.disabled = false;
            this.elements.chatInput.focus();
        }
    }
    
    // Handle errors
    handleError(error) {
        console.error('Chatbot error:', error);
        
        let errorMessage = 'I encountered an error while searching. Please try again.';
        
        if (error.message) {
            errorMessage = error.message;
        }
        
        this.addMessage(`❌ ${errorMessage}`, 'bot');
    }
    
    // Show error modal
    showErrorModal(message) {
        this.elements.errorMessage.textContent = message;
        this.elements.errorModal.classList.add('show');
    }
    
    // Hide error modal
    hideErrorModal() {
        this.elements.errorModal.classList.remove('show');
    }
    
    // Search history management
    addToSearchHistory(query) {
        // Avoid duplicates
        this.searchHistory = this.searchHistory.filter(item => item !== query);
        
        // Add to beginning
        this.searchHistory.unshift(query);
        
        // Limit history size
        if (this.searchHistory.length > CONFIG.UI.MAX_HISTORY_ITEMS) {
            this.searchHistory = this.searchHistory.slice(0, CONFIG.UI.MAX_HISTORY_ITEMS);
        }
        
        this.saveSearchHistory();
        this.updateSearchHistory();
    }
    
    // Update search history display
    updateSearchHistory() {
        if (this.searchHistory.length === 0) {
            this.elements.historyItems.innerHTML = '<p class="no-history">No recent searches</p>';
            return;
        }
        
        this.elements.historyItems.innerHTML = '';
        this.searchHistory.forEach(query => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.textContent = query;
            this.elements.historyItems.appendChild(item);
        });
    }
    
    // Load search history from localStorage
    loadSearchHistory() {
        try {
            const stored = localStorage.getItem('deviceChatbot_searchHistory');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.warn('Error loading search history:', error);
            return [];
        }
    }
    
    // Save search history to localStorage
    saveSearchHistory() {
        try {
            localStorage.setItem('deviceChatbot_searchHistory', JSON.stringify(this.searchHistory));
        } catch (error) {
            console.warn('Error saving search history:', error);
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new DeviceChatbot();
});