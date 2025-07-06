import React from "react";

const GOOGLE_PAY_SCRIPT = "https://pay.google.com/gp/p/js/pay.js";

function loadGooglePayScript() {
    return new Promise((resolve) => {
        if (window.google && window.google.payments) {
            resolve();
            return;
        }
        const script = document.createElement("script");
        script.src = GOOGLE_PAY_SCRIPT;
        script.async = true;
        script.onload = resolve;
        document.body.appendChild(script);
    });
}

export default function GooglePay() {
    React.useEffect(() => {
        loadGooglePayScript().then(() => {
            if (window.google) {
                const paymentsClient = new window.google.payments.api.PaymentsClient({
                    environment: "TEST", // Change to "PRODUCTION" for live
                });

                const button = paymentsClient.createButton({
                    onClick: onGooglePayButtonClicked,
                });

                const btnContainer = document.getElementById("google-pay-btn");
                if (btnContainer && btnContainer.childNodes.length === 0) {
                    btnContainer.appendChild(button);
                }
            }
        });
        // eslint-disable-next-line
    }, []);

    function getGooglePaymentDataRequest() {
        return {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
            {
                type: "CARD",
                parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["VISA", "MASTERCARD"],
                },
                tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                    gateway: "example", // Replace with your gateway
                    gatewayMerchantId: "exampleMerchantId", // Replace with your merchant ID
                },
                },
            },
            ],
            merchantInfo: {
            merchantId: "BCR2DN4T27L6ROCP", // Replace with your merchant ID
            merchantName: "Raillynk",
            },
            transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: "3500.00", // Replace with dynamic amount
            currencyCode: "LKR",
            countryCode: "LK",
            },
        };
    }

    function onGooglePayButtonClicked() {
        const paymentsClient = new window.google.payments.api.PaymentsClient({
            environment: "TEST",
        });
        const paymentDataRequest = getGooglePaymentDataRequest();
        paymentsClient
            .loadPaymentData(paymentDataRequest)
            .then((paymentData) => {
                // TODO: Send paymentData to your server for processing
                processPayment(paymentData);
                alert("Payment successful!");
            })
            .catch((err) => {
                // Handle errors
                alert("Payment failed or cancelled.");
                console.error("Error loading payment data:", err);
            });
    }

    function processPayment(paymentData) {
        // Here you would typically send the payment data to your server
        console.log("Processing payment data:", paymentData);
        // Example: API.post('/process-payment', paymentData);
        fetch(ordersEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',},
            body: paymentData
        })
    }

    return (
        <div>
            <h2>Pay or Recharge with Google Pay</h2>
            <div id="google-pay-btn"></div>
        </div>
    );
}