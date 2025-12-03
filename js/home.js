// Transport Classes (JavaScript equivalent of your Java code) - NO USSD
class TransportService {
  constructor(route, fare) {
    this.route = route;
    this.fare = fare;
  }
  
  calculateFare() {
    return this.fare;
  }
  
  getRouteName() {
    return this.route;
  }
  
  getBaseFare() {
    return this.fare;
  }
}

class PremiumService extends TransportService {
  constructor(route, base, charge) {
    super(route, base);
    this.premiumCharge = charge;
  }
  
  calculateFare() {
    return this.getBaseFare() + this.premiumCharge;
  }
  
  getPremiumCharge() {
    return this.premiumCharge;
  }
}

class Passenger {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  
  getName() {
    return this.name;
  }
  
  getType() {
    return this.type;
  }
}

class Payment {
  constructor() {
    this.method = "QR"; // ONLY QR, NO USSD
  }
  
  processPayment(amount) {
    return true; // Simulated successful payment
  }
  
  getMethod() {
    return this.method;
  }
}

class TransactionController {
  processTransaction(passenger, service, payment, fareEntered) {
    payment.processPayment(fareEntered);
    return "Completed";
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Get references to the elements
  const generateQrBtn = document.getElementById('generateQrBtn');
  const scanQrBtn = document.getElementById('scanQrBtn');
  const qrContentArea = document.getElementById('qrContentArea');
  
  // Payment dialog elements
  const paymentModal = document.getElementById('paymentModal');
  const closePaymentBtn = document.getElementById('closePaymentBtn');
  const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');
  const proceedPaymentBtn = document.getElementById('proceedPaymentBtn');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');
  const startLocation = document.getElementById('startLocation');
  const destination = document.getElementById('destination');
  const fareAmount = document.getElementById('fareAmount');
  const paymentStep1 = document.getElementById('paymentStep1');
  const paymentStep2 = document.getElementById('paymentStep2');
  const transactionTime = document.getElementById('transactionTime');

  
  const qrCodeImageUrl = "img/qr.jpg"; 
  
  // Transaction controller instance
  const controller = new TransactionController();

  // Track current active mode
  let currentMode = null;

  // Variables to store selected values between dialog openings
  let lastStartLocation = '';
  let lastDestination = '';
  let lastFareAmount = '';

  // Initialize payment dialog time
  updateTransactionTime();

  // Function to update transaction time
  function updateTransactionTime() {
    const now = new Date();
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    transactionTime.textContent = now.toLocaleDateString('en-US', options);
  }

  // Function to generate transaction ID
  function generateTransactionId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `JP-${new Date().getFullYear()}-${String(random).padStart(5, '0')}`;
  }

  // Function to show payment dialog
  function showPaymentDialog() {
    updateTransactionTime();
    document.getElementById('transactionId').textContent = generateTransactionId();
    paymentStep1.style.display = 'block';
    paymentStep2.style.display = 'none';
    paymentModal.classList.add('active');
    
    // Check if we should restore previous selections
    if (lastStartLocation || lastDestination || lastFareAmount) {
      // Restore previous selections
      if (lastStartLocation) {
        startLocation.value = lastStartLocation;
      } else {
        startLocation.value = '';
        startLocation.selectedIndex = 0;
      }
      
      if (lastDestination) {
        destination.value = lastDestination;
      } else {
        destination.value = '';
        destination.selectedIndex = 0;
      }
      
      if (lastFareAmount) {
        fareAmount.value = lastFareAmount;
      } else {
        fareAmount.value = '';
      }
    } else {
      // First time opening - clear all
      startLocation.value = '';
      destination.value = '';
      fareAmount.value = '';
      
      // Reset to first option (empty)
      startLocation.selectedIndex = 0;
      destination.selectedIndex = 0;
    }
    
    // Focus on first field
    setTimeout(() => {
      startLocation.focus();
    }, 300);
  }

  // Function to process payment (using your Java logic) - ONLY QR
  function processPayment() {
    const start = startLocation.value;
    const dest = destination.value;
    const fareText = fareAmount.value.trim();
    let fareValue;

    // Validation (from your Java code)
    if (!start || start === "") {
      alert('Please select starting location');
      startLocation.focus();
      return;
    }
    
    if (!dest || dest === "") {
      alert('Please select destination');
      destination.focus();
      return;
    }
    
    if (start === dest) {
      alert('Starting location and destination cannot be the same');
      startLocation.focus();
      return;
    }
    
    if (!fareText) {
      alert('Please enter fare amount');
      fareAmount.focus();
      return;
    }
    
    try {
      fareValue = parseFloat(fareText);
      if (isNaN(fareValue) || fareValue < 1 || fareValue > 100) {
        throw new Error();
      }
    } catch (error) {
      alert('Enter a valid fare between 1 - 100 TK');
      fareAmount.focus();
      fareAmount.select();
      return;
    }

    // Store the current selections for next time
    lastStartLocation = start;
    lastDestination = dest;
    lastFareAmount = fareText;

    // Calculate final amount (simulating premium service)
    let finalAmount = fareValue;
    let serviceType = 'Regular';
    let transportService;
    
    // Premium service simulation (like your Java code)
    if (fareValue > 50) {
      const premiumCharge = 10;
      transportService = new PremiumService(`${start} → ${dest}`, fareValue, premiumCharge);
      finalAmount = transportService.calculateFare();
      serviceType = 'Premium';
    } else {
      transportService = new TransportService(`${start} → ${dest}`, fareValue);
      finalAmount = fareValue;
      serviceType = 'Regular';
    }
    
    // Create passenger and payment objects - ONLY QR
    const passenger = new Passenger("Default User", "Regular");
    const payment = new Payment(); // QR only, no USSD option
    
    // Process transaction
    const status = controller.processTransaction(passenger, transportService, payment, finalAmount);
    
    // Get current time
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',', '');
    
    // Create receipt (like your Java code)
    const receipt = `Date & Time: ${timeString}\n\n` +
      `From ${start} to ${dest}, payment of ` +
      `${Math.round(finalAmount)} taka has been completed.\n\n` +
      `Payment Method: QR\n` +
      `Status: ${status}`;
    
    // Update success dialog
    document.getElementById('successTransactionId').textContent = 
      document.getElementById('transactionId').textContent;
    document.getElementById('successRoute').textContent = `${start} → ${dest}`;
    document.getElementById('successAmount').textContent = `৳${finalAmount.toFixed(0)} (${serviceType})`;
    
    // Show success step
    paymentStep1.style.display = 'none';
    paymentStep2.style.display = 'block';
    
    // Log transaction
    console.log('🚍 JatraPay Transaction Completed:');
    console.log('📋 ' + receipt);
    console.log(`📍 Route: ${start} → ${dest}`);
    console.log(`💰 Amount: ৳${finalAmount.toFixed(0)} (${serviceType})`);
    console.log(`💳 Method: QR (USSD removed)`);
    console.log(`✅ Status: ${status}`);
    
    alert('Payment completed successfully!');
  }

  // Function to simulate camera scanning
  function simulateCameraScan() {
    // Create camera simulation overlay
    const cameraOverlay = document.createElement('div');
    cameraOverlay.className = 'camera-overlay';
    cameraOverlay.innerHTML = `
      <div class="camera-container">
        <div class="camera-header">
          <button class="close-camera" id="closeCameraBtn">
            <span class="material-symbols-sharp">close</span>
          </button>
          <h3>QR Code Scanner</h3>
          <button class="flash-toggle" id="flashToggleBtn">
            <span class="material-symbols-sharp">flashlight_on</span>
          </button>
        </div>
        
        <div class="camera-view">
          <!-- Camera viewfinder -->
          <div class="viewfinder">
            <div class="scan-line"></div>
            <div class="corner top-left"></div>
            <div class="corner top-right"></div>
            <div class="corner bottom-left"></div>
            <div class="corner bottom-right"></div>
          </div>
          
          <!-- Fake QR code that appears in the viewfinder -->
          <div class="fake-qr-in-view">
            <img src="${qrCodeImageUrl}" alt="QR Code to Scan" 
                 onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiMwMDAwMDAiLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmZmZmIi8+PC9zdmc+'">
          </div>
          
          <div class="scanning-text">Scanning QR Code...</div>
        </div>
        
        <div class="camera-controls">
          <button class="scan-action-btn" id="startScanBtn">
            <span class="material-symbols-sharp">qr_code_scanner</span>
            Start Scanning
          </button>
          <button class="scan-action-btn secondary" id="cancelScanBtn">
            <span class="material-symbols-sharp">cancel</span>
            Cancel
          </button>
        </div>
        
        <div class="scan-result" id="scanResult" style="display: none;">
          <div class="success-scan">
            <span class="material-symbols-sharp">check_circle</span>
            <h4>QR Code Scanned Successfully!</h4>
            <p>Processing payment details...</p>
            <div class="scan-progress">
              <div class="progress-bar"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(cameraOverlay);
    
    // Add camera overlay styles
    addCameraStyles();
    
    // Set up camera event listeners
    setTimeout(() => {
      const closeCameraBtn = document.getElementById('closeCameraBtn');
      const flashToggleBtn = document.getElementById('flashToggleBtn');
      const startScanBtn = document.getElementById('startScanBtn');
      const cancelScanBtn = document.getElementById('cancelScanBtn');
      const scanResult = document.getElementById('scanResult');
      
      // Close camera
      closeCameraBtn.addEventListener('click', () => {
        document.body.removeChild(cameraOverlay);
      });
      
      // Toggle flash
      let flashOn = false;
      flashToggleBtn.addEventListener('click', () => {
        flashOn = !flashOn;
        flashToggleBtn.innerHTML = flashOn ? 
          '<span class="material-symbols-sharp">flashlight_off</span>' : 
          '<span class="material-symbols-sharp">flashlight_on</span>';
        document.querySelector('.camera-view').style.backgroundColor = 
          flashOn ? 'rgba(255, 255, 255, 0.8)' : '#000';
      });
      
      // Start scanning simulation
      startScanBtn.addEventListener('click', () => {
        // Hide controls and show scanning animation
        startScanBtn.style.display = 'none';
        cancelScanBtn.style.display = 'none';
        
        // Show scanning animation
        const scanLine = document.querySelector('.scan-line');
        const scanningText = document.querySelector('.scanning-text');
        scanLine.style.animation = 'scanAnimation 2s ease-in-out';
        scanningText.textContent = 'Scanning...';
        
        // Simulate scanning process
        setTimeout(() => {
          // Show success result
          scanResult.style.display = 'block';
          scanningText.textContent = 'QR Code Detected!';
          
          // Animate progress bar
          const progressBar = document.querySelector('.progress-bar');
          progressBar.style.animation = 'progressAnimation 2s ease-in-out forwards';
          
          // After scanning completes, open payment dialog
          setTimeout(() => {
            document.body.removeChild(cameraOverlay);
            // Open the payment dialog (your Java code interface)
            showPaymentDialog();
          }, 2500);
        }, 2000);
      });
      
      // Cancel scanning
      cancelScanBtn.addEventListener('click', () => {
        document.body.removeChild(cameraOverlay);
      });
      
      // Also close when clicking outside
      cameraOverlay.addEventListener('click', (e) => {
        if (e.target === cameraOverlay) {
          document.body.removeChild(cameraOverlay);
        }
      });
    }, 100);
  }

  // Function to add camera styles
  function addCameraStyles() {
    if (!document.getElementById('camera-styles')) {
      const style = document.createElement('style');
      style.id = 'camera-styles';
      style.textContent = `
        .camera-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .camera-container {
          background: #000;
          width: 100%;
          max-width: 500px;
          height: 80vh;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }
        
        .camera-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.8);
          color: white;
        }
        
        .camera-header h3 {
          margin: 0;
          font-size: 1.2rem;
        }
        
        .close-camera, .flash-toggle {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        .camera-view {
          height: 70%;
          background: #000;
          position: relative;
          overflow: hidden;
        }
        
        .viewfinder {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 250px;
          height: 250px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          overflow: hidden;
        }
        
        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, transparent, #00ff00, transparent);
        }
        
        @keyframes scanAnimation {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        
        .corner {
          position: absolute;
          width: 30px;
          height: 30px;
          border-color: #00ff00;
          border-style: solid;
        }
        
        .top-left {
          top: 0;
          left: 0;
          border-width: 4px 0 0 4px;
          border-radius: 10px 0 0 0;
        }
        
        .top-right {
          top: 0;
          right: 0;
          border-width: 4px 4px 0 0;
          border-radius: 0 10px 0 0;
        }
        
        .bottom-left {
          bottom: 0;
          left: 0;
          border-width: 0 0 4px 4px;
          border-radius: 0 0 0 10px;
        }
        
        .bottom-right {
          bottom: 0;
          right: 0;
          border-width: 0 4px 4px 0;
          border-radius: 0 0 10px 0;
        }
        
        .fake-qr-in-view {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 180px;
          height: 180px;
          background: white;
          border-radius: 10px;
          padding: 10px;
          opacity: 0.9;
        }
        
        .fake-qr-in-view img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        .scanning-text {
          position: absolute;
          bottom: 20px;
          left: 0;
          width: 100%;
          text-align: center;
          color: white;
          font-size: 1.1rem;
          font-weight: 500;
        }
        
        .camera-controls {
          padding: 1rem;
          display: flex;
          gap: 1rem;
          background: rgba(0, 0, 0, 0.8);
        }
        
        .scan-action-btn {
          flex: 1;
          padding: 1rem;
          border: none;
          border-radius: 10px;
          background: #2563eb;
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .scan-action-btn.secondary {
          background: #6b7280;
        }
        
        .scan-result {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        
        .success-scan {
          text-align: center;
          color: white;
        }
        
        .success-scan span {
          font-size: 4rem;
          color: #00ff00;
          margin-bottom: 1rem;
        }
        
        .success-scan h4 {
          margin: 1rem 0;
          font-size: 1.3rem;
        }
        
        .scan-progress {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          margin-top: 2rem;
          overflow: hidden;
        }
        
        .progress-bar {
          width: 0%;
          height: 100%;
          background: #00ff00;
          border-radius: 3px;
        }
        
        @keyframes progressAnimation {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        /* Dark theme adjustments */
        .dark-theme-variables .camera-container {
          background: #1a1a1a;
        }
        
        .dark-theme-variables .camera-header,
        .dark-theme-variables .camera-controls {
          background: rgba(30, 30, 30, 0.9);
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Function to update the content area with the appropriate HTML
  function updateQrContent(mode) {
    let content = '';
    
    if (mode === 'generate') {
      // HTML for GENERATE QR View - SHOWING FIXED JPG QR CODE
      content = `
        <div class="qr-display active-view">
          <h3>Your JATRA.PAY QR Code</h3>
          <p>Show this QR code to passengers to receive payments</p>
          
          <!-- FIXED QR CODE JPG FILE -->
          <div class="qr-image-container">
            <img src="${qrCodeImageUrl}" 
                 alt="JATRA.PAY Payment QR Code" 
                 class="qr-image"
                 title="Scan this QR code to make payment"
                 onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDI4MCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI4MCIgaGVpZ2h0PSIyODAiIHJ4PSIxMiIgZmlsbD0iIzAwMDAwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZpbGw9IiNmZmZmZmYiPkpBVFJBLlBBWTwvdGV4dD48dGV4dCB4PSI1MCUiIHk9IjYwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIj5QYXltZW50IFFSIENvZGU8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI4MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiI+c2NhbiB0byBwYXk8L3RleHQ+PC9zdmc+'">
          </div>
          
          <!-- QR Code Details -->
          <div class="qr-details">
            <div class="qr-detail-item">
              <span class="material-symbols-sharp">account_balance_wallet</span>
              <div>
                <h4>Payment QR</h4>
                <p>Fixed merchant QR code</p>
              </div>
            </div>
            <div class="qr-detail-item">
              <span class="material-symbols-sharp">schedule</span>
              <div>
                <h4>Always Active</h4>
                <p>Valid 24/7 for payments</p>
              </div>
            </div>
          </div>
          
          <!-- Simple action buttons -->
          <div class="simple-actions">
            <button class="simple-btn" id="downloadQrBtn">
              <span class="material-symbols-sharp">download</span>
              Download QR
            </button>
            <button class="simple-btn" id="shareQrBtn">
              <span class="material-symbols-sharp">share</span>
              Share QR
            </button>
            <button class="simple-btn" id="printQrBtn">
              <span class="material-symbols-sharp">print</span>
              Print QR
            </button>
          </div>
          
          <p class="qr-instruction">
            <span class="material-symbols-sharp">info</span>
            Passengers can scan this QR code with their phone camera to make payments
          </p>
        </div>
      `;
      
      // Update button states
      generateQrBtn.classList.add('active');
      scanQrBtn.classList.remove('active');
      currentMode = 'generate';
      
    } else if (mode === 'scan') {
      // HTML for SCAN QR View
      content = `
        <div class="scan-display active-view">
          <h3>Scan QR Code</h3>
          <p>Click the button below to open camera and scan a QR code</p>
          
          <div class="scan-preview">
            <div class="scan-icon">
              <span class="material-symbols-sharp">qr_code_scanner</span>
            </div>
            <p>Camera will open to scan QR codes</p>
          </div>
          
          <div style="margin: 2rem 0;">
            <button class="simple-btn" id="openCameraBtn" style="padding: 1.2rem 3rem; font-size: 1.2rem;">
              <span class="material-symbols-sharp">camera</span>
              Open Camera to Scan
            </button>
          </div>
          
          <div class="scan-instructions">
            <h4>How it works:</h4>
            <ol>
              <li>Click "Open Camera to Scan"</li>
              <li>Point camera at a JATRA.PAY QR code</li>
              <li>Camera will automatically detect the QR code</li>
              <li>You'll be taken to the payment screen</li>
            </ol>
          </div>
        </div>
      `;
      
      // Update button states
      scanQrBtn.classList.add('active');
      generateQrBtn.classList.remove('active');
      currentMode = 'scan';
    }
    
    // Insert the generated HTML into the content area
    qrContentArea.innerHTML = content;
    
    // Smooth scroll to the QR content area
    qrContentArea.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
    
    // Re-attach event listeners to new buttons
    attachDynamicEventListeners();
  }

  // Function to attach event listeners to dynamically created elements
  function attachDynamicEventListeners() {
    // Handle download QR button click
    const downloadBtn = document.getElementById('downloadQrBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        // Simulate downloading the QR code
        alert('QR Code Downloaded Successfully!\nFile: jatra-pay-qr.jpg');
        console.log('QR Code downloaded: ' + qrCodeImageUrl);
      });
    }
    
    // Handle share QR button click
    const shareBtn = document.getElementById('shareQrBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        if (navigator.share) {
          // Web Share API
          navigator.share({
            title: 'JATRA.PAY QR Code',
            text: 'Scan this QR code to make payment',
            url: window.location.href,
          })
          .then(() => console.log('QR Code shared successfully'))
          .catch((error) => console.log('Error sharing:', error));
        } else {
          // Fallback for browsers without Web Share API
          alert('QR Code link copied to clipboard!\nShare this URL: ' + window.location.href);
          console.log('QR Code shared via URL: ' + window.location.href);
        }
      });
    }
    
    // Handle print QR button click
    const printBtn = document.getElementById('printQrBtn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
        console.log('QR Code print dialog opened');
      });
    }
    
    // Handle open camera button click
    const openCameraBtn = document.getElementById('openCameraBtn');
    if (openCameraBtn) {
      openCameraBtn.addEventListener('click', () => {
        // Open camera simulation
        simulateCameraScan();
      });
    }
  }

  // Payment dialog event listeners
  closePaymentBtn.addEventListener('click', () => {
    paymentModal.classList.remove('active');
  });

  cancelPaymentBtn.addEventListener('click', () => {
    paymentModal.classList.remove('active');
    alert('Payment cancelled');
  });

  proceedPaymentBtn.addEventListener('click', processPayment);

  closeSuccessBtn.addEventListener('click', () => {
    paymentModal.classList.remove('active');
    // Clear stored values after successful payment
    lastStartLocation = '';
    lastDestination = '';
    lastFareAmount = '';
    alert('Transaction completed successfully');
  });

  // Close modal when clicking outside
  paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
      paymentModal.classList.remove('active');
    }
  });

  // Initialize the QR functionality
  function initQR() {
    // Attach event listeners to the main action buttons
    generateQrBtn.addEventListener('click', () => updateQrContent('generate'));
    scanQrBtn.addEventListener('click', () => updateQrContent('scan'));
    
    console.log('🚍 JATRA.PAY QR System Ready');
    console.log('📱 Fixed QR Code will show when "Generate QR Code" is clicked');
    console.log('📷 Click "Scan QR Code" then "Open Camera" to simulate scanning');
  }

  // Start the QR functionality
  initQR();
});