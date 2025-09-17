from flask import Flask, render_template, request, jsonify, send_file
import os
import json
import hashlib
from datetime import datetime, UTC
from utils.wipe import simulate_wipe
from utils.certificate import generate_certificate

app = Flask(__name__)

# Ensure logs directory exists
if not os.path.exists('logs'):
    os.makedirs('logs')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/detect', methods=['GET'])
def detect_devices():
    # Mock device detection
    mock_devices = [
        {"id": "drive_a", "name": "Drive A", "size": "500GB"},
        {"id": "drive_b", "name": "Drive B", "size": "1TB"}
    ]
    return jsonify(mock_devices)

@app.route('/wipe', methods=['POST'])
def wipe():
    device = request.json.get('device')
    method = request.json.get('method')
    
    # Simulate wiping process
    success, hash_before, hash_after = simulate_wipe(device, method)
    
    # Log the operation
    log_entry = {
        "device": device,
        "method": method,
        "timestamp": datetime.now(UTC).isoformat(),
        "status": "SUCCESS" if success else "FAILED",
        "hash_before": hash_before,
        "hash_after": hash_after
    }
    
    with open('logs/wipe_log.json', 'a') as f:
        json.dump(log_entry, f)
        f.write('\n')
    
    return jsonify({
        "status": "success" if success else "failed",
        "hash_before": hash_before,
        "hash_after": hash_after
    })

@app.route('/verify', methods=['POST'])
def verify():
    device = request.json.get('device')
    hash_before = request.json.get('hash_before')
    hash_after = request.json.get('hash_after')
    
    # Simple verification - check if hashes are different
    verified = hash_before != hash_after
    
    return jsonify({
        "status": "SUCCESS" if verified else "FAILED"
    })

@app.route('/certificate', methods=['POST'])
def create_certificate():
    data = request.json
    pdf_path = generate_certificate(
        device_id=data['device'],
        wipe_method=data['method'],
        verification_status=data['status'],
        timestamp=datetime.now(UTC).isoformat()
    )
    return send_file(pdf_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)