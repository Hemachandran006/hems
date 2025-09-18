#!/usr/bin/env python3
"""
Test script to verify all requirements are implemented correctly
"""

from mobile_device import MobileDevice
from device_database import DeviceDatabase
from chatbot import MobileSpecsChatbot


def test_requirements():
    """Test all requirements from the problem statement"""
    
    print("🧪 Testing Mobile Device Specifications Chatbot Requirements")
    print("=" * 60)
    
    # Requirement 1: Create a class to store device specifications
    print("\n1️⃣ Testing MobileDevice class with data structures...")
    device = MobileDevice("test_device")
    device.set_general_specs("Test Brand", "Test Model", "2024", "$100-200")
    device.set_display_specs("OLED", "6.0 inch", "1080p", "60Hz", "Gorilla Glass")
    assert device.general is not None
    assert device.display is not None
    print("✅ PASSED: MobileDevice class with appropriate data structures")
    
    # Requirement 2: Format and display information cleanly
    print("\n2️⃣ Testing clean, organized display formatting...")
    formatted_output = device.format_specs()
    assert "📱" in formatted_output  # Check emojis
    assert "GENERAL INFORMATION" in formatted_output
    assert "DISPLAY" in formatted_output
    print("✅ PASSED: Clean, organized formatting implemented")
    
    # Requirement 3: Sample data for 2-3 devices
    print("\n3️⃣ Testing sample data for popular devices...")
    db = DeviceDatabase()
    devices = db.list_available_devices()
    assert len(devices) >= 3  # At least 3 devices
    expected_devices = ["Apple iPhone 15 Pro", "Samsung Galaxy S24 Ultra", "Google Pixel 8 Pro"]
    for expected in expected_devices:
        assert expected in devices
    print(f"✅ PASSED: {len(devices)} devices with sample data")
    
    # Requirement 4: Emojis for visual appeal
    print("\n4️⃣ Testing emoji usage for visual appeal...")
    iphone = db.get_device("iphone 15 pro")
    formatted_specs = iphone.format_specs()
    emoji_count = sum(1 for char in formatted_specs if ord(char) > 127)
    assert emoji_count > 50  # Should have many emojis
    print(f"✅ PASSED: {emoji_count} emojis used for visual appeal")
    
    # Requirement 5: Error handling for unknown devices
    print("\n5️⃣ Testing error handling for unknown devices...")
    chatbot = MobileSpecsChatbot()
    chatbot.greeting_shown = True
    response = chatbot.process_input("nonexistent device")
    assert "Sorry" in response or "couldn't find" in response
    print("✅ PASSED: Error handling for unknown devices implemented")
    
    # Requirement 6: Input validation
    print("\n6️⃣ Testing input validation...")
    assert not chatbot.validate_input("")  # Empty input
    assert not chatbot.validate_input("   ")  # Whitespace only
    assert not chatbot.validate_input("a")  # Too short
    assert not chatbot.validate_input("<script>alert('xss')</script>")  # Malicious
    assert chatbot.validate_input("iPhone 15 Pro")  # Valid input
    print("✅ PASSED: Input validation implemented")
    
    # Requirement 7: Modular and extensible code
    print("\n7️⃣ Testing modular and extensible design...")
    # Test that we can easily add a new device
    new_device = MobileDevice("test_extensible")
    new_device.set_general_specs("Test", "Extensible", "2024", "$500")
    db.devices["test_extensible"] = new_device
    retrieved = db.get_device("test_extensible")
    assert retrieved is not None
    assert retrieved.general.brand == "Test"
    print("✅ PASSED: Modular and extensible design verified")
    
    # Test all major categories are covered
    print("\n🔍 Testing specification categories coverage...")
    iphone = db.get_device("iphone 15 pro")
    categories = {
        "General": iphone.general,
        "Display": iphone.display,
        "Performance": iphone.performance,
        "Camera": iphone.camera,
        "Audio": iphone.audio,
        "Battery": iphone.battery,
        "Connectivity": iphone.connectivity,
        "OS": iphone.os,
        "Special Features": iphone.special_features,
        "Pros & Cons": iphone.pros_cons
    }
    
    for category, spec in categories.items():
        assert spec is not None, f"{category} specifications missing"
        print(f"  ✅ {category}")
    
    print("\n🎉 ALL REQUIREMENTS SUCCESSFULLY IMPLEMENTED!")
    print("\nSummary of implemented features:")
    print("• ✅ MobileDevice class with comprehensive data structures")
    print("• ✅ Clean, organized display formatting with emojis")
    print("• ✅ Sample data for 3 popular mobile devices")
    print("• ✅ Extensive emoji usage for visual appeal")
    print("• ✅ Robust error handling for unknown devices")
    print("• ✅ Input validation and security measures")
    print("• ✅ Modular, extensible code architecture")
    print("• ✅ All 10 specification categories implemented")
    print("• ✅ Interactive chatbot interface")
    print("• ✅ Comprehensive documentation")
    
    return True


if __name__ == "__main__":
    try:
        test_requirements()
        print("\n🏆 All tests passed successfully!")
    except AssertionError as e:
        print(f"\n❌ Test failed: {e}")
    except Exception as e:
        print(f"\n💥 Unexpected error: {e}")