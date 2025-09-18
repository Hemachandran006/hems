"""
Mobile Device Specifications Module

This module contains the MobileDevice class and related data structures
for storing and displaying mobile device specifications.
"""

from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any
from datetime import datetime


@dataclass
class GeneralSpecs:
    """General device information"""
    brand: str
    model: str
    release_date: str
    price_range: str


@dataclass
class DisplaySpecs:
    """Display specifications"""
    type: str
    size: str
    resolution: str
    refresh_rate: str
    protection: str


@dataclass
class PerformanceSpecs:
    """Performance specifications"""
    chipset: str
    cpu: str
    gpu: str
    ram: str
    storage: str


@dataclass
class CameraSpecs:
    """Camera specifications"""
    rear: str
    front: str
    features: List[str] = field(default_factory=list)
    video_recording: str = ""


@dataclass
class AudioSpecs:
    """Audio specifications"""
    speakers: str
    jack: str
    audio_features: List[str] = field(default_factory=list)


@dataclass
class BatterySpecs:
    """Battery specifications"""
    capacity: str
    charging_speed: str
    wireless_charging: bool = False


@dataclass
class ConnectivitySpecs:
    """Connectivity specifications"""
    network: str  # 5G/4G
    wifi: str
    bluetooth: str
    nfc: bool = False
    usb: str = ""


@dataclass
class OSSpecs:
    """Operating System and Features"""
    operating_system: str
    ui: str
    security_features: List[str] = field(default_factory=list)


@dataclass
class SpecialFeatures:
    """Special features"""
    gaming_mode: bool = False
    stylus_support: bool = False
    other_features: List[str] = field(default_factory=list)


@dataclass
class ProsAndCons:
    """Pros and Cons"""
    pros: List[str] = field(default_factory=list)
    cons: List[str] = field(default_factory=list)


class MobileDevice:
    """
    A comprehensive mobile device specifications class that stores and formats
    device information in an organized, visually appealing manner.
    """
    
    def __init__(self, device_id: str):
        self.device_id = device_id
        self.general: Optional[GeneralSpecs] = None
        self.display: Optional[DisplaySpecs] = None
        self.performance: Optional[PerformanceSpecs] = None
        self.camera: Optional[CameraSpecs] = None
        self.audio: Optional[AudioSpecs] = None
        self.battery: Optional[BatterySpecs] = None
        self.connectivity: Optional[ConnectivitySpecs] = None
        self.os: Optional[OSSpecs] = None
        self.special_features: Optional[SpecialFeatures] = None
        self.pros_cons: Optional[ProsAndCons] = None
    
    def set_general_specs(self, brand: str, model: str, release_date: str, price_range: str):
        """Set general device specifications"""
        self.general = GeneralSpecs(brand, model, release_date, price_range)
    
    def set_display_specs(self, type: str, size: str, resolution: str, refresh_rate: str, protection: str):
        """Set display specifications"""
        self.display = DisplaySpecs(type, size, resolution, refresh_rate, protection)
    
    def set_performance_specs(self, chipset: str, cpu: str, gpu: str, ram: str, storage: str):
        """Set performance specifications"""
        self.performance = PerformanceSpecs(chipset, cpu, gpu, ram, storage)
    
    def set_camera_specs(self, rear: str, front: str, features: List[str] = None, video_recording: str = ""):
        """Set camera specifications"""
        features = features or []
        self.camera = CameraSpecs(rear, front, features, video_recording)
    
    def set_audio_specs(self, speakers: str, jack: str, audio_features: List[str] = None):
        """Set audio specifications"""
        audio_features = audio_features or []
        self.audio = AudioSpecs(speakers, jack, audio_features)
    
    def set_battery_specs(self, capacity: str, charging_speed: str, wireless_charging: bool = False):
        """Set battery specifications"""
        self.battery = BatterySpecs(capacity, charging_speed, wireless_charging)
    
    def set_connectivity_specs(self, network: str, wifi: str, bluetooth: str, nfc: bool = False, usb: str = ""):
        """Set connectivity specifications"""
        self.connectivity = ConnectivitySpecs(network, wifi, bluetooth, nfc, usb)
    
    def set_os_specs(self, operating_system: str, ui: str, security_features: List[str] = None):
        """Set operating system specifications"""
        security_features = security_features or []
        self.os = OSSpecs(operating_system, ui, security_features)
    
    def set_special_features(self, gaming_mode: bool = False, stylus_support: bool = False, other_features: List[str] = None):
        """Set special features"""
        other_features = other_features or []
        self.special_features = SpecialFeatures(gaming_mode, stylus_support, other_features)
    
    def set_pros_cons(self, pros: List[str] = None, cons: List[str] = None):
        """Set pros and cons"""
        pros = pros or []
        cons = cons or []
        self.pros_cons = ProsAndCons(pros, cons)
    
    def format_list(self, items: List[str], emoji: str = "•") -> str:
        """Format a list of items with emojis"""
        if not items:
            return "Not specified"
        return "\n".join([f"  {emoji} {item}" for item in items])
    
    def format_specs(self) -> str:
        """
        Format all device specifications in a clean, organized manner with emojis
        """
        if not self.general:
            return "❌ Device specifications not available"
        
        output = []
        
        # Header
        output.append(f"📱 {self.general.brand} {self.general.model}")
        output.append("=" * 50)
        output.append("")
        
        # General Information
        output.append("📋 GENERAL INFORMATION")
        output.append("-" * 25)
        output.append(f"🏢 Brand: {self.general.brand}")
        output.append(f"📱 Model: {self.general.model}")
        output.append(f"📅 Release Date: {self.general.release_date}")
        output.append(f"💰 Price Range: {self.general.price_range}")
        output.append("")
        
        # Display
        if self.display:
            output.append("🖥️ DISPLAY")
            output.append("-" * 12)
            output.append(f"🔍 Type: {self.display.type}")
            output.append(f"📏 Size: {self.display.size}")
            output.append(f"🎯 Resolution: {self.display.resolution}")
            output.append(f"⚡ Refresh Rate: {self.display.refresh_rate}")
            output.append(f"🛡️ Protection: {self.display.protection}")
            output.append("")
        
        # Performance
        if self.performance:
            output.append("⚡ PERFORMANCE")
            output.append("-" * 15)
            output.append(f"🧠 Chipset: {self.performance.chipset}")
            output.append(f"💻 CPU: {self.performance.cpu}")
            output.append(f"🎮 GPU: {self.performance.gpu}")
            output.append(f"🎯 RAM: {self.performance.ram}")
            output.append(f"💾 Storage: {self.performance.storage}")
            output.append("")
        
        # Camera
        if self.camera:
            output.append("📸 CAMERA")
            output.append("-" * 10)
            output.append(f"📷 Rear: {self.camera.rear}")
            output.append(f"🤳 Front: {self.camera.front}")
            if self.camera.features:
                output.append("🌟 Features:")
                output.append(self.format_list(self.camera.features, "✨"))
            if self.camera.video_recording:
                output.append(f"🎥 Video Recording: {self.camera.video_recording}")
            output.append("")
        
        # Audio
        if self.audio:
            output.append("🔊 AUDIO")
            output.append("-" * 8)
            output.append(f"🔈 Speakers: {self.audio.speakers}")
            output.append(f"🎧 Headphone Jack: {self.audio.jack}")
            if self.audio.audio_features:
                output.append("🎵 Audio Features:")
                output.append(self.format_list(self.audio.audio_features, "🎼"))
            output.append("")
        
        # Battery
        if self.battery:
            output.append("🔋 BATTERY")
            output.append("-" * 10)
            output.append(f"⚡ Capacity: {self.battery.capacity}")
            output.append(f"🚀 Charging Speed: {self.battery.charging_speed}")
            output.append(f"📡 Wireless Charging: {'✅ Yes' if self.battery.wireless_charging else '❌ No'}")
            output.append("")
        
        # Connectivity
        if self.connectivity:
            output.append("🌐 CONNECTIVITY")
            output.append("-" * 15)
            output.append(f"📶 Network: {self.connectivity.network}")
            output.append(f"📡 Wi-Fi: {self.connectivity.wifi}")
            output.append(f"🔵 Bluetooth: {self.connectivity.bluetooth}")
            output.append(f"💳 NFC: {'✅ Yes' if self.connectivity.nfc else '❌ No'}")
            if self.connectivity.usb:
                output.append(f"🔌 USB: {self.connectivity.usb}")
            output.append("")
        
        # Operating System
        if self.os:
            output.append("🖥️ OPERATING SYSTEM & FEATURES")
            output.append("-" * 32)
            output.append(f"📱 OS: {self.os.operating_system}")
            output.append(f"🎨 UI: {self.os.ui}")
            if self.os.security_features:
                output.append("🔒 Security Features:")
                output.append(self.format_list(self.os.security_features, "🛡️"))
            output.append("")
        
        # Special Features
        if self.special_features:
            output.append("🌟 SPECIAL FEATURES")
            output.append("-" * 19)
            output.append(f"🎮 Gaming Mode: {'✅ Yes' if self.special_features.gaming_mode else '❌ No'}")
            output.append(f"✍️ Stylus Support: {'✅ Yes' if self.special_features.stylus_support else '❌ No'}")
            if self.special_features.other_features:
                output.append("🚀 Other Features:")
                output.append(self.format_list(self.special_features.other_features, "⭐"))
            output.append("")
        
        # Pros and Cons
        if self.pros_cons:
            output.append("✅ PROS & CONS")
            output.append("-" * 14)
            if self.pros_cons.pros:
                output.append("👍 Pros:")
                output.append(self.format_list(self.pros_cons.pros, "✅"))
            if self.pros_cons.cons:
                output.append("👎 Cons:")
                output.append(self.format_list(self.pros_cons.cons, "❌"))
            output.append("")
        
        return "\n".join(output)
    
    def get_summary(self) -> str:
        """Get a brief summary of the device"""
        if not self.general:
            return "❌ Device information not available"
        
        summary = f"📱 {self.general.brand} {self.general.model}\n"
        summary += f"💰 {self.general.price_range} | 📅 {self.general.release_date}\n"
        
        if self.display:
            summary += f"🖥️ {self.display.size} {self.display.type} | "
        if self.performance:
            summary += f"🧠 {self.performance.chipset} | "
        if self.camera:
            summary += f"📸 {self.camera.rear} | "
        if self.battery:
            summary += f"🔋 {self.battery.capacity}"
        
        return summary