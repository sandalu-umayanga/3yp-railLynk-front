import React, { useState, useEffect } from 'react';
import { FiCreditCard, FiDollarSign, FiCheck, FiX } from 'react-icons/fi';
import API from '../api';
import '../styles/googlePayRecharge.css';

const GooglePayRecharge = () => {
  const [amount, setAmount] = useState('');
  const [isGooglePayReady, setIsGooglePayReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [paymentsClient, setPaymentsClient] = useState(null);

  // Predefined amount options
  const quickAmounts = [100, 250, 500, 1000, 2000, 5000];

  useEffect(() => {
    // Load Google Pay API
    loadGooglePayApi();
    // Fetch current user balance
    fetchUserBalance();

    // Cleanup function
    return () => {
      // Remove event listeners or cleanup if needed
      // Google Pay API cleanup is handled by the browser
    };
  }, []);

  const loadGooglePayApi = () => {
    // Check if Google Pay script is already loaded
    if (typeof google !== 'undefined' && google.payments) {
      initializeGooglePay();
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src="https://pay.google.com/gp/p/js/pay.js"]');
    if (existingScript) {
      existingScript.onload = () => initializeGooglePay();
      return;
    }

    console.info('Loading Google Pay API for testing...');
    const script = document.createElement('script');
    script.src = 'https://pay.google.com/gp/p/js/pay.js';
    script.onload = () => {
      console.info('Google Pay API loaded successfully');
      initializeGooglePay();
    };
    script.onerror = () => {
      console.error('Failed to load Google Pay API');
      setIsGooglePayReady(false);
    };
    document.body.appendChild(script);
  };

  const initializeGooglePay = () => {
    if (typeof google === 'undefined' || !google.payments) {
      console.warn('Google Pay API not loaded');
      setIsGooglePayReady(false);
      return;
    }

    const client = new google.payments.api.PaymentsClient({
      environment: 'TEST' // TEST environment for development
    });

    setPaymentsClient(client);

    const isReadyToPayRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [{
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA']
        }
      }]
    };

    client.isReadyToPay(isReadyToPayRequest)
      .then(response => {
        if (response.result) {
          console.log('Google Pay is ready');
          setIsGooglePayReady(true);
        } else {
          console.log('Google Pay is not ready - using fallback payment method');
          setIsGooglePayReady(false);
        }
      })
      .catch(err => {
        console.warn('Google Pay not available (manifest error is normal in development):', err);
        // Don't block the user - provide simulation fallback
        setIsGooglePayReady(false);
      });
  };

  const fetchUserBalance = async () => {
    try {
      const passengerID = localStorage.getItem('passenger_ID');
      const response = await API.get(`passengers/${passengerID}/`);
      setUserBalance(response.data.card_balance || 0);
    } catch (err) {
      console.error('Error fetching balance:', err);
      setUserBalance(0);
    }
  };

  const handleGooglePayment = async () => {
    // Enhanced validation
    const amountValue = parseFloat(amount);
    if (!amount || isNaN(amountValue) || amountValue <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (amountValue > 10000) {
      alert('Maximum recharge amount is Rs. 10,000');
      return;
    }

    if (amountValue < 10) {
      alert('Minimum recharge amount is Rs. 10');
      return;
    }

    if (!paymentsClient) {
      console.error('Google Pay client not initialized');
      alert('Payment system not ready. Please try again.');
      return;
    }

    setIsProcessing(true);
    setPaymentResult(null); // Clear previous results

    const paymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [{
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example', // Use 'example' for testing
            gatewayMerchantId: 'exampleGatewayMerchantId' // Use example merchant ID for testing
          }
        }
      }],
      merchantInfo: {
        merchantId: '12345678901234567890', // Use test merchant ID
        merchantName: 'RailLynk Transport'
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: amountValue.toFixed(2), // Ensure proper formatting
        currencyCode: 'USD', // Using USD for TEST environment compatibility
        countryCode: 'US' // Using US for TEST environment compatibility
      }
    };

    try {
      const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);
      
      // For testing purposes, simulate successful payment
      // In production, send payment data to your backend for processing
      await processPayment(paymentData);
      
    } catch (err) {
      console.error('Payment failed:', err);
      
      // Handle specific Google Pay errors
      let errorMessage = 'Payment failed. Please try again.';
      
      if (err.statusCode === 'CANCELED') {
        errorMessage = 'Payment was cancelled by user.';
      } else if (err.statusCode === 'DEVELOPER_ERROR') {
        errorMessage = 'Payment configuration error. Please contact support.';
      } else if (err.statusCode === 'MERCHANT_ACCOUNT_ERROR') {
        errorMessage = 'Merchant account error. Please try again later.';
      }
      
      setPaymentResult({
        success: false,
        message: errorMessage
      });
      setIsProcessing(false);
    }
  };

  const processPayment = async (paymentData) => {
    try {
      // Get the validated amount from the current state
      const amountValue = parseFloat(amount);
      
      // For testing purposes, simulate a successful payment
      // In production, you would send the paymentData to your backend
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For testing, we'll simulate a successful response
      const mockResponse = {
        data: {
          transaction_id: `TXN_${Date.now()}`,
          status: 'success',
          amount: amountValue
        }
      };

      setPaymentResult({
        success: true,
        message: `Successfully recharged Rs. ${amountValue.toFixed(2)} to your card!`,
        transaction_id: mockResponse.data.transaction_id
      });

      // Update balance with the validated amount
      setUserBalance(prevBalance => prevBalance + amountValue);
      
      // Clear amount
      setAmount('');

      console.log('Payment data received:', paymentData);
      console.log('This would be sent to your backend for processing');

      /* 
      // Production code would look like this:
      const response = await API.post('card/recharge/', {
        amount: amountValue,
        payment_method: 'google_pay',
        payment_data: paymentData
      });

      setPaymentResult({
        success: true,
        message: `Successfully recharged Rs. ${amountValue.toFixed(2)} to your card!`,
        transaction_id: response.data.transaction_id
      });

      // Update balance from server
      await fetchUserBalance();
      */

    } catch (err) {
      console.error('Payment processing failed:', err);
      setPaymentResult({
        success: false,
        message: 'Payment processing failed. Please contact support.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Fallback function for testing when Google Pay has issues
  const simulatePayment = async () => {
    // Enhanced validation
    const amountValue = parseFloat(amount);
    if (!amount || isNaN(amountValue) || amountValue <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (amountValue > 10000) {
      alert('Maximum recharge amount is Rs. 10,000');
      return;
    }

    if (amountValue < 10) {
      alert('Minimum recharge amount is Rs. 10');
      return;
    }

    setIsProcessing(true);
    setPaymentResult(null); // Clear previous results
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponse = {
        data: {
          transaction_id: `SIM_${Date.now()}`,
          status: 'success',
          amount: amountValue
        }
      };

      setPaymentResult({
        success: true,
        message: `Successfully recharged Rs. ${amountValue.toFixed(2)} to your card! (Simulated)`,
        transaction_id: mockResponse.data.transaction_id
      });

      // Update balance
      setUserBalance(prevBalance => prevBalance + amountValue);
      
      // Clear amount
      setAmount('');

    } catch (err) {
      setPaymentResult({
        success: false,
        message: 'Simulation failed. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const selectQuickAmount = (quickAmount) => {
    setAmount(quickAmount.toString());
  };

  return (
    <div className="google-pay-recharge-container">
      <div className="recharge-header">
        <h2>
          <FiCreditCard className="header-icon" />
          Google Pay Recharge
        </h2>
        <div className="current-balance">
          <span>Current Balance: </span>
          <strong>Rs. {userBalance.toFixed(2)}</strong>
        </div>
      </div>

      <div className="recharge-content">
        <div className="amount-section">
          <h3>Select Amount</h3>
          
          <div className="quick-amounts">
            {quickAmounts.map(quickAmount => (
              <button
                key={quickAmount}
                className={`quick-amount-btn ${amount === quickAmount.toString() ? 'selected' : ''}`}
                onClick={() => selectQuickAmount(quickAmount)}
              >
                Rs. {quickAmount}
              </button>
            ))}
          </div>

          <div className="custom-amount">
            <label htmlFor="amount">Custom Amount (Rs.)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="1"
              max="10000"
            />
          </div>
        </div>

        <div className="payment-section">
          {isGooglePayReady ? (
            <>
              <button
                className="google-pay-button"
                onClick={handleGooglePayment}
                disabled={!amount || isProcessing}
              >
                {isProcessing ? (
                  <div className="processing">
                    <div className="spinner"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <img 
                      src="https://developers.google.com/pay/api/web/guides/resources/logo-guidelines/google-pay-mark.svg" 
                      alt="Google Pay"
                      className="google-pay-logo"
                    />
                    Pay Rs. {amount || '0'} with Google Pay
                  </>
                )}
              </button>
              
              <div style={{ margin: '1rem 0', textAlign: 'center', color: '#64748b' }}>
                or
              </div>
              
              <button
                className="google-pay-button"
                style={{ 
                  background: 'linear-gradient(135deg, #059669, #10b981)',
                  marginTop: '0.5rem'
                }}
                onClick={simulatePayment}
                disabled={!amount || isProcessing}
              >
                {isProcessing ? (
                  <div className="processing">
                    <div className="spinner"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <FiCreditCard style={{ fontSize: '1.5rem' }} />
                    Simulate Payment (Test Mode)
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <div className="google-pay-unavailable">
                <FiX className="error-icon" />
                Google Pay is not available on this device
              </div>
              
              <button
                className="google-pay-button"
                style={{ 
                  background: 'linear-gradient(135deg, #059669, #10b981)',
                  marginTop: '1rem'
                }}
                onClick={simulatePayment}
                disabled={!amount || isProcessing}
              >
                {isProcessing ? (
                  <div className="processing">
                    <div className="spinner"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <FiCreditCard style={{ fontSize: '1.5rem' }} />
                    Simulate Payment (Test Mode)
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {paymentResult && (
          <div className={`payment-result ${paymentResult.success ? 'success' : 'error'}`}>
            {paymentResult.success ? (
              <FiCheck className="result-icon" />
            ) : (
              <FiX className="result-icon" />
            )}
            <div className="result-content">
              <p>{paymentResult.message}</p>
              {paymentResult.transaction_id && (
                <small>Transaction ID: {paymentResult.transaction_id}</small>
              )}
            </div>
          </div>
        )}

        <div className="security-info">
          <h4>🔒 Secure Payment</h4>
          <ul>
            <li>Your payment information is encrypted and secure</li>
            <li>Google Pay uses advanced security features</li>
            <li>Your card details are never stored on our servers</li>
            <li>Instant balance update after successful payment</li>
          </ul>
          
          <div className="test-mode-warning">
            <strong>🚧 Development Mode:</strong> This is running in TEST mode with simulated payments. 
            No real charges will be made to your card.
            <br />
            <small>
              <strong>Note:</strong> "Payment manifest" errors are normal in development. 
              Google Pay requires HTTPS and proper domain setup for full functionality.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GooglePayRecharge;
