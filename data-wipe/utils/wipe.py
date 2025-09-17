import os
import hashlib
import time

def calculate_hash(data):
    return hashlib.sha256(data).hexdigest()

def simulate_wipe(device, method):
    # Create a mock file to simulate device
    mock_file = f"mock_{device}.bin"
    
    # Generate initial random data
    initial_data = os.urandom(1024 * 1024)  # 1MB for demonstration
    with open(mock_file, 'wb') as f:
        f.write(initial_data)
    
    hash_before = calculate_hash(initial_data)
    
    # Simulate wiping based on method
    if method == "NIST 800-88":
        passes = 1
    elif method == "DoD 5220.22-M":
        passes = 3
    else:
        passes = 1

    for _ in range(passes):
        wipe_data = os.urandom(1024 * 1024)
        with open(mock_file, 'wb') as f:
            f.write(wipe_data)
        time.sleep(1)  # Simulate processing time
    
    with open(mock_file, 'rb') as f:
        final_data = f.read()
    hash_after = calculate_hash(final_data)
    
    # Cleanup
    os.remove(mock_file)
    
    return True, hash_before, hash_after