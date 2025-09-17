from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
import uuid
import os

def generate_certificate(device_id, wipe_method, verification_status, timestamp):
    # Create certificates directory if it doesn't exist
    if not os.path.exists('certificates'):
        os.makedirs('certificates')
    
    certificate_id = str(uuid.uuid4())
    filename = f"certificates/wipe_certificate_{certificate_id}.pdf"
    
    c = canvas.Canvas(filename, pagesize=letter)
    
    # Title
    c.setFont("Helvetica-Bold", 24)
    c.drawString(100, 750, "Data Wipe Certificate")
    
    # Content
    c.setFont("Helvetica", 12)
    y = 700
    for label, value in [
        ("Certificate ID:", certificate_id),
        ("Device ID:", device_id),
        ("Wipe Method:", wipe_method),
        ("Verification Status:", verification_status),
        ("Timestamp:", timestamp)
    ]:
        c.drawString(100, y, f"{label} {value}")
        y -= 30
    
    # Footer
    c.setFont("Helvetica-Italic", 10)
    c.drawString(100, 100, "This certificate verifies that the data wiping operation was completed successfully.")
    
    c.save()
    return filename