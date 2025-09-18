"""
Mobile Device Specifications Chatbot

A chatbot that provides detailed mobile device specifications in a 
user-friendly, visually appealing format with emojis.
"""

import re
from typing import Optional, List
from device_database import DeviceDatabase
from mobile_device import MobileDevice


class MobileSpecsChatbot:
    """
    Chatbot for mobile device specifications lookup
    """
    
    def __init__(self):
        self.db = DeviceDatabase()
        self.greeting_shown = False
    
    def validate_input(self, user_input: str) -> bool:
        """
        Validate user input
        
        Args:
            user_input: User's input string
            
        Returns:
            True if input is valid, False otherwise
        """
        if not user_input or not user_input.strip():
            return False
        
        # Check for minimum length
        if len(user_input.strip()) < 2:
            return False
        
        # Check for potentially harmful input (basic sanitization)
        dangerous_patterns = [
            r'<script',
            r'javascript:',
            r'<iframe',
            r'eval\(',
            r'exec\(',
        ]
        
        for pattern in dangerous_patterns:
            if re.search(pattern, user_input, re.IGNORECASE):
                return False
        
        return True
    
    def normalize_device_name(self, device_name: str) -> str:
        """
        Normalize device name for better matching
        
        Args:
            device_name: Raw device name from user
            
        Returns:
            Normalized device name
        """
        # Remove common words and normalize
        normalized = device_name.lower().strip()
        
        # Remove common prefixes/suffixes
        words_to_remove = ['phone', 'smartphone', 'mobile', 'device', 'specs', 'specifications']
        for word in words_to_remove:
            normalized = re.sub(r'\b' + word + r'\b', '', normalized)
        
        # Clean up extra spaces
        normalized = re.sub(r'\s+', ' ', normalized).strip()
        
        return normalized
    
    def show_greeting(self) -> str:
        """Show welcome greeting"""
        greeting = """
🤖 Welcome to Mobile Device Specifications Chatbot! 📱

I can provide detailed specifications for popular mobile devices.
Just tell me which device you'd like to know about!

Available devices:
"""
        
        devices = self.db.list_available_devices()
        for i, device in enumerate(devices, 1):
            greeting += f"  {i}. {device}\n"
        
        greeting += """
💡 You can ask me about:
  • "Tell me about iPhone 15 Pro"
  • "Galaxy S24 Ultra specs"
  • "What are the features of Pixel 8 Pro?"
  • "Compare" (for quick comparison)
  • "List" (to see available devices)
  • "Help" (for more options)
  • "Quit" (to exit)

What device would you like to know about? 🤔
"""
        return greeting
    
    def show_help(self) -> str:
        """Show help information"""
        return """
🆘 HELP - How to use the Mobile Specs Chatbot

📝 Commands you can use:
  • Device names: "iPhone 15 Pro", "Galaxy S24 Ultra", "Pixel 8 Pro"
  • "list" or "available" - Show all available devices
  • "help" - Show this help message
  • "compare" - Quick comparison of all devices
  • "quit" or "exit" - Exit the chatbot

🔍 Search examples:
  • "iPhone" - Will find iPhone devices
  • "Galaxy" - Will find Samsung Galaxy devices
  • "Pixel" - Will find Google Pixel devices
  • "Samsung" - Will find Samsung devices

💡 Tips:
  • You don't need to type the exact name
  • Case doesn't matter (iPhone = iphone = IPHONE)
  • I'll try to understand what you're looking for!

What would you like to know? 😊
"""
    
    def quick_compare(self) -> str:
        """Show quick comparison of all devices"""
        devices = self.db.list_available_devices()
        
        output = ["📊 QUICK DEVICE COMPARISON", "=" * 30, ""]
        
        for device_name in devices:
            # Get device object
            device = self.db.get_device(device_name.lower())
            if device:
                output.append(device.get_summary())
                output.append("")
        
        output.append("💡 Type a device name for detailed specifications!")
        return "\n".join(output)
    
    def search_and_suggest(self, query: str) -> str:
        """
        Search for devices and provide suggestions
        
        Args:
            query: User's search query
            
        Returns:
            Search results or suggestions
        """
        matches = self.db.search_devices(query)
        
        if matches:
            if len(matches) == 1:
                # If only one match, show it directly
                device = self.db.get_device(matches[0].lower())
                if device:
                    return device.format_specs()
            else:
                # Multiple matches, show suggestions
                output = [f"🔍 Found {len(matches)} devices matching '{query}':", ""]
                for i, match in enumerate(matches, 1):
                    output.append(f"  {i}. {match}")
                output.append("")
                output.append("💡 Please specify which device you'd like to know about!")
                return "\n".join(output)
        
        return None
    
    def process_input(self, user_input: str) -> str:
        """
        Process user input and return appropriate response
        
        Args:
            user_input: User's input string
            
        Returns:
            Bot's response
        """
        # Show greeting on first interaction
        if not self.greeting_shown:
            self.greeting_shown = True
            return self.show_greeting()
        
        # Validate input
        if not self.validate_input(user_input):
            return "❌ Invalid input. Please enter a valid device name or command."
        
        # Normalize input
        normalized_input = user_input.lower().strip()
        
        # Handle special commands
        if normalized_input in ['quit', 'exit', 'bye', 'goodbye']:
            return "👋 Thank you for using Mobile Specs Chatbot! Goodbye! 📱"
        
        if normalized_input in ['help', '?', 'commands']:
            return self.show_help()
        
        if normalized_input in ['list', 'available', 'devices', 'show devices']:
            devices = self.db.list_available_devices()
            output = ["📱 Available Devices:", ""]
            for i, device in enumerate(devices, 1):
                output.append(f"  {i}. {device}")
            output.append("")
            output.append("💡 Type a device name to get detailed specifications!")
            return "\n".join(output)
        
        if normalized_input in ['compare', 'comparison', 'all']:
            return self.quick_compare()
        
        # Try to find exact device match first
        device = self.db.get_device(normalized_input)
        if device:
            return device.format_specs()
        
        # If no exact match, normalize and search
        normalized_query = self.normalize_device_name(normalized_input)
        if normalized_query:
            # Try normalized search
            device = self.db.get_device(normalized_query)
            if device:
                return device.format_specs()
            
            # Try partial matching
            result = self.search_and_suggest(normalized_query)
            if result:
                return result
        
        # No matches found
        available_devices = self.db.list_available_devices()
        response = [
            f"❌ Sorry, I couldn't find information about '{user_input}'.",
            "",
            "📱 Available devices:",
        ]
        
        for device in available_devices:
            response.append(f"  • {device}")
        
        response.extend([
            "",
            "💡 Try typing one of the device names above, or use 'help' for more options."
        ])
        
        return "\n".join(response)
    
    def run_interactive(self):
        """
        Run the chatbot in interactive mode
        """
        print(self.process_input(""))  # Show greeting
        
        while True:
            try:
                user_input = input("\n💬 You: ").strip()
                
                if not user_input:
                    print("📝 Please enter a device name or command.")
                    continue
                
                response = self.process_input(user_input)
                print(f"\n🤖 Bot:\n{response}")
                
                # Check if user wants to quit
                if user_input.lower() in ['quit', 'exit', 'bye', 'goodbye']:
                    break
                    
            except KeyboardInterrupt:
                print("\n\n👋 Thank you for using Mobile Specs Chatbot! Goodbye! 📱")
                break
            except Exception as e:
                print(f"\n❌ An error occurred: {e}")
                print("Please try again or type 'help' for assistance.")


def main():
    """Main function to run the chatbot"""
    chatbot = MobileSpecsChatbot()
    chatbot.run_interactive()


if __name__ == "__main__":
    main()