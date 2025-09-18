"""
Device Database Module

Contains sample data for popular mobile devices.
This module can be easily extended to add more devices.
"""

from mobile_device import MobileDevice


class DeviceDatabase:
    """Database of mobile device specifications"""
    
    def __init__(self):
        self.devices = {}
        self._load_sample_devices()
    
    def _load_sample_devices(self):
        """Load sample device data"""
        
        # iPhone 15 Pro
        iphone_15_pro = MobileDevice("iphone_15_pro")
        iphone_15_pro.set_general_specs(
            brand="Apple",
            model="iPhone 15 Pro",
            release_date="September 2023",
            price_range="$999 - $1,199"
        )
        iphone_15_pro.set_display_specs(
            type="Super Retina XDR OLED",
            size="6.1 inches",
            resolution="2556 x 1179 pixels (460 ppi)",
            refresh_rate="120Hz ProMotion",
            protection="Ceramic Shield front"
        )
        iphone_15_pro.set_performance_specs(
            chipset="Apple A17 Pro (3nm)",
            cpu="6-core CPU (2 performance + 4 efficiency)",
            gpu="6-core GPU",
            ram="8GB",
            storage="128GB/256GB/512GB/1TB"
        )
        iphone_15_pro.set_camera_specs(
            rear="48MP main + 12MP ultrawide + 12MP telephoto (3x zoom)",
            front="12MP TrueDepth",
            features=[
                "Night mode",
                "Deep Fusion",
                "Smart HDR 5",
                "Photographic Styles",
                "Macro photography",
                "Portrait mode with Focus and Depth Control"
            ],
            video_recording="4K at 24/25/30/60fps, 1080p at 25/30/60/120/240fps"
        )
        iphone_15_pro.set_audio_specs(
            speakers="Stereo speakers",
            jack="No 3.5mm jack",
            audio_features=[
                "Spatial Audio",
                "Dolby Atmos",
                "Lightning to 3.5mm adapter sold separately"
            ]
        )
        iphone_15_pro.set_battery_specs(
            capacity="3274 mAh",
            charging_speed="20W wired, 15W MagSafe wireless",
            wireless_charging=True
        )
        iphone_15_pro.set_connectivity_specs(
            network="5G (sub-6 GHz and mmWave)",
            wifi="Wi-Fi 6E",
            bluetooth="Bluetooth 5.3",
            nfc=True,
            usb="USB-C 3.0"
        )
        iphone_15_pro.set_os_specs(
            operating_system="iOS 17",
            ui="iOS interface",
            security_features=[
                "Face ID",
                "Secure Enclave",
                "Apple Pay",
                "Touch ID (not available)"
            ]
        )
        iphone_15_pro.set_special_features(
            gaming_mode=False,
            stylus_support=False,
            other_features=[
                "Action Button",
                "Always-On Display",
                "Emergency SOS via satellite",
                "Crash Detection",
                "IP68 water resistance",
                "MagSafe compatibility"
            ]
        )
        iphone_15_pro.set_pros_cons(
            pros=[
                "Excellent build quality and premium materials",
                "Outstanding camera system with computational photography",
                "Powerful A17 Pro chipset with excellent performance",
                "Long software support from Apple",
                "Great ecosystem integration",
                "USB-C finally replaces Lightning",
                "120Hz ProMotion display"
            ],
            cons=[
                "Very expensive",
                "No headphone jack",
                "Limited customization options",
                "No expandable storage",
                "Slow charging compared to Android competitors",
                "No always-on display fingerprint scanner"
            ]
        )
        
        # Samsung Galaxy S24 Ultra
        galaxy_s24_ultra = MobileDevice("galaxy_s24_ultra")
        galaxy_s24_ultra.set_general_specs(
            brand="Samsung",
            model="Galaxy S24 Ultra",
            release_date="January 2024",
            price_range="$1,199 - $1,619"
        )
        galaxy_s24_ultra.set_display_specs(
            type="Dynamic AMOLED 2X",
            size="6.8 inches",
            resolution="3120 x 1440 pixels (501 ppi)",
            refresh_rate="120Hz adaptive",
            protection="Corning Gorilla Glass Victus 2"
        )
        galaxy_s24_ultra.set_performance_specs(
            chipset="Snapdragon 8 Gen 3 for Galaxy",
            cpu="8-core (1x3.39GHz Cortex-X4 + 3x3.1GHz Cortex-A720 + 2x2.9GHz Cortex-A720 + 2x2.2GHz Cortex-A520)",
            gpu="Adreno 750",
            ram="12GB",
            storage="256GB/512GB/1TB"
        )
        galaxy_s24_ultra.set_camera_specs(
            rear="200MP main + 50MP periscope telephoto (5x) + 10MP telephoto (3x) + 12MP ultrawide",
            front="12MP",
            features=[
                "Nightography",
                "Expert RAW",
                "Pro mode",
                "Portrait mode",
                "Super Resolution Zoom up to 100x",
                "AI-enhanced photography"
            ],
            video_recording="8K at 24/30fps, 4K at 30/60fps, 1080p at 30/60/240fps"
        )
        galaxy_s24_ultra.set_audio_specs(
            speakers="Stereo speakers tuned by AKG",
            jack="No 3.5mm jack",
            audio_features=[
                "Dolby Atmos",
                "32-bit/384kHz audio",
                "USB-C to 3.5mm adapter included"
            ]
        )
        galaxy_s24_ultra.set_battery_specs(
            capacity="5000 mAh",
            charging_speed="45W wired, 15W wireless, 4.5W reverse wireless",
            wireless_charging=True
        )
        galaxy_s24_ultra.set_connectivity_specs(
            network="5G (sub-6 GHz and mmWave)",
            wifi="Wi-Fi 7",
            bluetooth="Bluetooth 5.3",
            nfc=True,
            usb="USB-C 3.2"
        )
        galaxy_s24_ultra.set_os_specs(
            operating_system="Android 14",
            ui="One UI 6.1",
            security_features=[
                "Ultrasonic fingerprint sensor",
                "Face recognition",
                "Samsung Knox",
                "Secure Folder"
            ]
        )
        galaxy_s24_ultra.set_special_features(
            gaming_mode=True,
            stylus_support=True,
            other_features=[
                "S Pen with Air Actions",
                "DeX desktop mode",
                "Always-on Display",
                "IP68 water resistance",
                "Titanium frame",
                "AI features powered by Galaxy AI"
            ]
        )
        galaxy_s24_ultra.set_pros_cons(
            pros=[
                "Excellent camera system with incredible zoom capabilities",
                "Large, beautiful display with S Pen support",
                "Powerful performance and 12GB RAM",
                "Great battery life with fast charging",
                "Comprehensive connectivity options",
                "Premium titanium build quality",
                "Advanced AI features"
            ],
            cons=[
                "Very expensive",
                "Large and heavy (232g)",
                "No headphone jack",
                "Bixby can be intrusive",
                "One UI can feel overwhelming for some users",
                "Exynos vs Snapdragon variants in different regions"
            ]
        )
        
        # Google Pixel 8 Pro
        pixel_8_pro = MobileDevice("pixel_8_pro")
        pixel_8_pro.set_general_specs(
            brand="Google",
            model="Pixel 8 Pro",
            release_date="October 2023",
            price_range="$999 - $1,159"
        )
        pixel_8_pro.set_display_specs(
            type="LTPO OLED",
            size="6.7 inches",
            resolution="2992 x 1344 pixels (489 ppi)",
            refresh_rate="120Hz adaptive (1-120Hz)",
            protection="Corning Gorilla Glass Victus 2"
        )
        pixel_8_pro.set_performance_specs(
            chipset="Google Tensor G3",
            cpu="9-core (1x3.0GHz Cortex-X3 + 4x2.45GHz Cortex-A715 + 4x2.15GHz Cortex-A510)",
            gpu="Immortalis-G715s MC10",
            ram="12GB",
            storage="128GB/256GB/512GB/1TB"
        )
        pixel_8_pro.set_camera_specs(
            rear="50MP main + 48MP ultrawide + 48MP telephoto (5x zoom)",
            front="10.5MP",
            features=[
                "Computational photography",
                "Night Sight",
                "Magic Eraser",
                "Photo Unblur",
                "Real Tone",
                "Portrait mode",
                "Best Take",
                "Audio Magic Eraser"
            ],
            video_recording="4K at 30/60fps, 1080p at 30/60/240fps"
        )
        pixel_8_pro.set_audio_specs(
            speakers="Stereo speakers",
            jack="No 3.5mm jack",
            audio_features=[
                "Spatial Audio",
                "USB-C audio",
                "Audio Magic Eraser"
            ]
        )
        pixel_8_pro.set_battery_specs(
            capacity="5050 mAh",
            charging_speed="30W wired, 23W wireless, 5W reverse wireless",
            wireless_charging=True
        )
        pixel_8_pro.set_connectivity_specs(
            network="5G (sub-6 GHz and mmWave)",
            wifi="Wi-Fi 7",
            bluetooth="Bluetooth 5.3",
            nfc=True,
            usb="USB-C 3.2"
        )
        pixel_8_pro.set_os_specs(
            operating_system="Android 14",
            ui="Stock Android (Pixel UI)",
            security_features=[
                "Titan M security chip",
                "Fingerprint sensor (under display)",
                "Face Unlock",
                "VPN by Google One"
            ]
        )
        pixel_8_pro.set_special_features(
            gaming_mode=False,
            stylus_support=False,
            other_features=[
                "Always-on Display",
                "Now Playing",
                "Car Crash Detection",
                "IP68 water resistance",
                "Temperature sensor",
                "7 years of OS updates",
                "Google AI features"
            ]
        )
        pixel_8_pro.set_pros_cons(
            pros=[
                "Exceptional computational photography and AI features",
                "Clean Android experience with fastest updates",
                "7 years of guaranteed OS and security updates",
                "Unique Google AI features",
                "Great value for premium features",
                "Excellent call screening and spam protection",
                "Temperature sensor for health monitoring"
            ],
            cons=[
                "Tensor G3 performance lags behind competitors",
                "Battery life could be better",
                "No headphone jack",
                "Limited availability in some regions",
                "Face unlock is not as secure as Face ID",
                "Can get warm during intensive tasks"
            ]
        )
        
        # Store devices in database
        self.devices["iphone_15_pro"] = iphone_15_pro
        self.devices["iphone 15 pro"] = iphone_15_pro
        self.devices["apple iphone 15 pro"] = iphone_15_pro
        
        self.devices["galaxy_s24_ultra"] = galaxy_s24_ultra
        self.devices["galaxy s24 ultra"] = galaxy_s24_ultra
        self.devices["samsung galaxy s24 ultra"] = galaxy_s24_ultra
        self.devices["s24 ultra"] = galaxy_s24_ultra
        
        self.devices["pixel_8_pro"] = pixel_8_pro
        self.devices["pixel 8 pro"] = pixel_8_pro
        self.devices["google pixel 8 pro"] = pixel_8_pro
        self.devices["google pixel"] = pixel_8_pro
    
    def get_device(self, device_name: str) -> MobileDevice:
        """
        Get device by name (case-insensitive)
        
        Args:
            device_name: Name of the device to search for
            
        Returns:
            MobileDevice object if found, None otherwise
        """
        device_key = device_name.lower().strip()
        return self.devices.get(device_key)
    
    def list_available_devices(self) -> list:
        """Get list of available devices"""
        unique_devices = []
        seen_models = set()
        
        for device in self.devices.values():
            if device.general and device.general.model not in seen_models:
                unique_devices.append(f"{device.general.brand} {device.general.model}")
                seen_models.add(device.general.model)
        
        return unique_devices
    
    def search_devices(self, query: str) -> list:
        """
        Search for devices by name/brand
        
        Args:
            query: Search query
            
        Returns:
            List of matching device names
        """
        query = query.lower().strip()
        matches = []
        seen_models = set()
        
        for key, device in self.devices.items():
            if query in key and device.general and device.general.model not in seen_models:
                matches.append(f"{device.general.brand} {device.general.model}")
                seen_models.add(device.general.model)
        
        return matches