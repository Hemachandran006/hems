#!/usr/bin/env python3
"""
Mobile Device Specifications Chatbot
Main entry point for the application
"""

from chatbot import MobileSpecsChatbot


def main():
    """
    Main function to start the Mobile Device Specifications Chatbot
    """
    try:
        print("🚀 Starting Mobile Device Specifications Chatbot...")
        chatbot = MobileSpecsChatbot()
        chatbot.run_interactive()
    except KeyboardInterrupt:
        print("\n\n👋 Thank you for using Mobile Specs Chatbot! Goodbye! 📱")
    except Exception as e:
        print(f"\n❌ An unexpected error occurred: {e}")
        print("Please check your installation and try again.")


if __name__ == "__main__":
    main()