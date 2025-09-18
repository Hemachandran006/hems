# Mobile Device Specifications Chatbot 📱

A comprehensive chatbot that provides detailed mobile device specifications in a user-friendly, visually appealing format with emojis.

## Features ✨

- **Detailed Specifications**: Get comprehensive information about popular mobile devices
- **Multiple Categories**: Covers all aspects from display to battery, camera to connectivity
- **Visual Appeal**: Uses emojis and clean formatting for better readability
- **Smart Search**: Flexible device name matching and suggestions
- **Input Validation**: Robust error handling and input sanitization
- **Extensible Design**: Easy to add new devices and categories
- **Interactive Interface**: User-friendly command-line interface

## Supported Devices 📱

Currently includes detailed specifications for:
- **Apple iPhone 15 Pro** (2023)
- **Samsung Galaxy S24 Ultra** (2024)
- **Google Pixel 8 Pro** (2023)

## Installation & Usage 🚀

### Requirements
- Python 3.7 or higher (for dataclasses support)
- No external dependencies required

### Running the Chatbot

```bash
# Clone the repository
git clone https://github.com/Hemachandran006/hems.git
cd hems

# Run the chatbot
python main.py
```

### Usage Examples

```
💬 You: iPhone 15 Pro
💬 You: Galaxy S24 Ultra specs
💬 You: Tell me about Pixel 8 Pro
💬 You: compare
💬 You: list
💬 You: help
```

## Project Structure 📁

```
hems/
├── main.py              # Main entry point
├── chatbot.py           # Chatbot interface and logic
├── mobile_device.py     # MobileDevice class and data structures
├── device_database.py   # Device data and database management
├── requirements.txt     # Dependencies (none required)
└── README.md           # This file
```

## Specification Categories 📋

The chatbot provides information in the following categories:

### 📋 General Information
- Brand, Model, Release Date, Price Range

### 🖥️ Display
- Type, Size, Resolution, Refresh Rate, Protection

### ⚡ Performance
- Chipset, CPU, GPU, RAM, Storage

### 📸 Camera
- Rear/Front cameras, Features, Video Recording capabilities

### 🔊 Audio
- Speakers, Headphone Jack, Audio Features

### 🔋 Battery
- Capacity, Charging Speed, Wireless Charging support

### 🌐 Connectivity
- 5G/4G, Wi-Fi, Bluetooth, NFC, USB specifications

### 🖥️ Operating System & Features
- OS version, UI, Security Features

### 🌟 Special Features
- Gaming mode, Stylus support, Other unique features

### ✅ Pros & Cons
- Balanced view of device strengths and weaknesses

## Commands 💡

- **Device Names**: "iPhone 15 Pro", "Galaxy S24 Ultra", "Pixel 8 Pro"
- **`list`** or **`available`**: Show all available devices
- **`compare`**: Quick comparison of all devices
- **`help`**: Show help information
- **`quit`** or **`exit`**: Exit the chatbot

## Adding New Devices 🔧

To add a new device, modify `device_database.py`:

1. Create a new `MobileDevice` instance
2. Set all specification categories using the provided methods
3. Add the device to the database with appropriate search keys

Example:
```python
# Create new device
new_device = MobileDevice("device_id")
new_device.set_general_specs("Brand", "Model", "Release Date", "Price")
# ... set other specifications

# Add to database
self.devices["device_key"] = new_device
```

## Code Architecture 🏗️

### MobileDevice Class
- **Dataclass-based specifications**: Clean, type-safe data structures
- **Modular setters**: Easy to set individual specification categories
- **Formatted output**: Beautiful, emoji-rich display formatting
- **Summary views**: Quick overview and detailed specifications

### DeviceDatabase Class
- **Flexible search**: Case-insensitive, partial matching
- **Easy extension**: Simple interface for adding new devices
- **Multiple aliases**: Support for various device name formats

### Chatbot Class
- **Input validation**: Sanitization and error handling
- **Smart matching**: Intelligent device name recognition
- **Interactive interface**: User-friendly command processing
- **Help system**: Comprehensive guidance for users

## Error Handling 🛡️

- **Input validation**: Checks for empty, malicious, or invalid input
- **Device not found**: Helpful suggestions and available alternatives
- **Graceful failures**: User-friendly error messages
- **Keyboard interrupt**: Clean exit handling

## Future Enhancements 🚀

- Add more device categories (tablets, smartwatches)
- Implement device comparison features
- Add price tracking and availability information
- Create web interface version
- Add device recommendation engine
- Include user reviews and ratings

## Contributing 🤝

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Add new devices or features
4. Test thoroughly
5. Submit a pull request

## License 📄

This project is open source and available under the MIT License.