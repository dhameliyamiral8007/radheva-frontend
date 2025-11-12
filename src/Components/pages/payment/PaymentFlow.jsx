
import React, { useState, useEffect } from "react";
import radheva from "../../../assets/Radhevalogo.svg";
import shop from "../../../assets/shop.svg";
import G from "../../../assets/gpay.svg";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartProvider";
import { applyDiscountCode, placeOrder, processPayment } from "../../redux/service/OrderService";
import { getUserProfileService } from "../../redux/service/AuthService";
const PaymentFlow = () => {
    const [state, setState] = useState("");
    const [selected, setSelected] = useState("credit");
    const [discountCode, setDiscountCode] = useState("");
    const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
    const [discountMessage, setDiscountMessage] = useState("");
    const [discountIsError, setDiscountIsError] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [successMessage, setSuccessMessage] = useState("");
    
    // Form fields state
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [phone, setPhone] = useState("");
    
    const navigate = useNavigate();
    const { cartItems, fetchCart } = useCart(); // ✅ ACCESS cartItems and fetchCart
    console.log("cartItems =",cartItems);
    
    // Calculate totals from cart items - using API response fields
    const subtotal = cartItems.reduce(
        (acc, item) => acc + Number(item.totalPrice || 0),
        0
    );
    
    const totalDiscount = cartItems.reduce(
        (acc, item) => acc + Number(item.discountAmount || 0),
        0
    );
    
    const totalTax = cartItems.reduce(
        (acc, item) => acc + Number(item.taxAmount || 0),
        0
    );
    
    const finalTotal = cartItems.reduce(
        (acc, item) => acc + Number(item.finalAmount || 0),
        0
    );

    const handleApplyDiscount = async () => {
        if (!discountCode) return;
        try {
            setIsApplyingDiscount(true);
            setDiscountMessage("");
            setDiscountIsError(false);

            const data = await applyDiscountCode(discountCode);

            if (!data?.IsSuccess) {
                const message = data?.Message || "Failed to apply discount";
                setDiscountMessage(message);
                setDiscountIsError(true);
                return;
            }

            // After successful discount apply, refresh cart to get updated totals
            await fetchCart();
            setDiscountMessage(data?.Message || "Discount applied successfully");
            setDiscountIsError(false);
        } catch (err) {
            setDiscountMessage("Something went wrong while applying discount");
            setDiscountIsError(true);
        } finally {
            setIsApplyingDiscount(false);
        }
    };

    // All states available
    const allStates = ["Gujarat", "Maharashtra", "Delhi", "Karnataka", "California", "Texas", "New York", "Florida", "England", "Scotland", "Wales", "Northern Ireland", "Ontario", "Quebec", "British Columbia", "Alberta"];

    // Load Razorpay script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
            setIsRazorpayLoaded(true);
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup script on unmount
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    // Fetch user profile and auto-fill form
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfileService();
                if (response?.IsSuccess && response?.Data) {
                    const profile = response.Data;
                    
                    // Set email
                    if (profile.email) setEmail(profile.email);
                    
                    // Split name into first and last
                    if (profile.name) {
                        const nameParts = profile.name.trim().split(/\s+/);
                        setFirstName(nameParts[0] || "");
                        setLastName(nameParts.slice(1).join(" ") || "");
                    }
                    
                    // Set phone
                    if (profile.mobile) setPhone(profile.mobile);
                    
                    // Set address data from addresses.home
                    if (profile.addresses?.home) {
                        const homeAddress = profile.addresses.home;
                        
                        if (homeAddress.street) setAddress(homeAddress.street);
                        if (homeAddress.city) setCity(homeAddress.city);
                        if (homeAddress.pincode) setPincode(homeAddress.pincode);
                        
                        // Set state
                        if (homeAddress.state) {
                            const stateLower = homeAddress.state.toLowerCase();
                            setState(stateLower);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                // Don't show error to user, just fail silently
            }
        };

        fetchUserProfile();
    }, []);

    // Countdown timer for auto-redirect
    useEffect(() => {
        if (showSuccessModal && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (showSuccessModal && countdown === 0) {
            // Auto-redirect after countdown
            navigate('/order-history');
        }
    }, [showSuccessModal, countdown, navigate]);

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        navigate('/order-history');
    };

    const handleService = () => {
        navigate("/terms-condition")
    }
    const handlePrivacy = () => {
        navigate("/privacy-policy")
    }
    const handleShipping = () => {
        navigate("/shipping-policy")
    }
    const handleReturnPolicy = () => {
        navigate("/return-policy")
    }

    const handlePlaceOrder = async () => {
        // Validate required fields
        if (!email || !firstName || !lastName || !address || !city || !state || !pincode || !phone) {
            alert("Please fill in all required fields");
            return;
        }

        // Check if Razorpay is loaded
        if (!isRazorpayLoaded || !window.Razorpay) {
            alert("Payment gateway is loading. Please wait a moment and try again.");
            return;
        }

        // Prepare shipping address data
        const shippingAddress = {
            name: `${firstName} ${lastName}`.trim(),
            mobile: phone,
            address1: address,
            address2: apartment || "",
            country: "India", // Default to India since we removed country dropdown
            city: city,
            pincode: pincode,
            addresstype: "Home" // Default to Home
        };

        try {
            setIsPlacingOrder(true);
            
            // Step 1: Place order to get Razorpay order ID
            const orderData = await placeOrder(shippingAddress);
console.log("orderData =",orderData);
            if (!orderData?.IsSuccess) {
                const message = orderData?.Message || "Failed to place order";
                alert(message);
                return;
            }

            // Extract Razorpay order details from response
            // Structure: orderData.Data.order.razorpayOrder.id
            const razorpayOrderId = orderData?.Data?.order?.razorpayOrder?.id;
            const amount = orderData?.Data?.order?.razorpayOrder?.amount || finalTotal * 100; // Amount in paise (Razorpay expects amount in paise)
            const orderId = orderData?.Data?.order?.orderId || orderData?.Data?.order?.order_no;

            if (!razorpayOrderId) {
                alert("Failed to initialize payment. Please try again.");
                return;
            }

            // Step 2: Open Razorpay checkout
            console.log(
                "amount =",amount
            );
            
            const options = {
                key: "rzp_test_mGJqET54AHAF1d", // Razorpay Key ID
                amount: amount, // Amount in paise
                currency: "INR",
                name: "Radheva Jewels",
                description: `Order #${orderId || razorpayOrderId}`,
                order_id: razorpayOrderId, // Razorpay order ID
                prefill: {
                    name: `${firstName} ${lastName}`.trim(),
                    email: email,
                    contact: phone,
                },
                handler: async function (response) {
                    // Step 3: On successful payment, automatically call payment API
                    try {
                        setIsPlacingOrder(true);
                        const paymentResponse = await processPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (paymentResponse?.IsSuccess) {
                            setSuccessMessage(paymentResponse?.Message || "Payment successful! Order placed successfully!");
                            setShowSuccessModal(true);
                            setCountdown(5);
                        } else {
                            alert(paymentResponse?.Message || "Payment verification failed. Please contact support.");
                        }
                    } catch (paymentError) {
                        const errorMessage = paymentError?.response?.data?.Message || paymentError?.message || "Something went wrong while processing payment";
                        alert(errorMessage);
                    } finally {
                        setIsPlacingOrder(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        // User closed the payment modal without completing payment
                        setIsPlacingOrder(false);
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            
            // Handle payment failure
            razorpay.on('payment.failed', function (response) {
                setIsPlacingOrder(false);
                alert(`Payment failed: ${response.error.description || 'Payment could not be processed. Please try again.'}`);
            });

            razorpay.open();

        } catch (err) {
            const errorMessage = err?.response?.data?.Message || err?.message || "Something went wrong while placing order";
            alert(errorMessage);
            setIsPlacingOrder(false);
        }
    };
    return (
        <div className={`flex flex-col md:flex-row bg-[#1d1d1d] p-6`}>
            {/* Left Side - Form */}
            <div className="flex-1 bg-[#1d1d1d] text-white px-8 ml-60">
                {/* Logo */}
                <div className="flex justify-center items-center">
                    <img
                        src={radheva}
                        alt="Radheva Logo"
                        className="w-[200px] object-contain"
                    />
                </div>

                {/* Express Checkout */}
                <div className="mt-6 text-center text-gray-400 font-kufam text-sm">
                    Express checkout
                </div>

                <div className="flex justify-center items-center gap-4 py-4 px-10">
                    {/* Shop Pay */}
                    <div className="flex items-center justify-center bg-[#592FF4] px-3 py-2 rounded-md w-full">
                        <img src={shop} alt="Shop" className="h-6" />
                    </div>

                    {/* Google Pay */}
                    <div className="flex items-center justify-center bg-[#5E6A74] px-3 py-2 rounded-md w-full">
                        <img src={G} alt="Google Pay" className="h-6 mr-2" />
                        <span className="text-sm font-kufam">G Pay</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-gray-400 my-6">
                    <div className="flex-grow border-t border-gray-500"></div>
                    <span className="text-xs">OR</span>
                    <div className="flex-grow border-t border-gray-500"></div>
                </div>
                {/* Contact */}
                <div>
                    {/* Contact + Login in same row */}
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-kufam">Contact</h2>
                        <Link
                            to="/login"
                            className="text-sm text-gray-400 hover:text-white underline"
                        >
                            Log in
                        </Link>
                    </div>

                    {/* Input field */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-[#282828] border border-gray-600 rounded p-2 text-sm mb-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Checkbox */}
                    <label className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                        <input type="checkbox" className="accent-[#2F2F2F] border border-white" />
                        Email me with news and offers
                    </label>
                </div>

                {/* Delivery */}
                <div>
                    <h2 className="text-lg font-kufam mb-2">Delivery</h2>

                    {/* First & Last Name */}
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="First name"
                            className="bg-[#282828] font-kufam border border-gray-600 rounded p-2 text-sm"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            className="bg-[#282828] font-kufam border border-gray-600 rounded p-2 text-sm"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Address"
                        className="w-full bg-[#282828] font-kufam border border-gray-600 rounded p-2 text-sm mt-2"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                        className="w-full bg-[#282828] font-kufam border border-gray-600 rounded p-2 text-sm mt-2"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                    />

                    {/* City, State, PIN */}
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        <input
                            type="text"
                            placeholder="City"
                            className="bg-[#282828] border font-kufam border-gray-600 rounded p-2 text-sm"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        {/* State Dropdown */}
                        <select
                            className="bg-[#282828] font-kufam border border-gray-600 rounded p-2 text-sm text-white"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        >
                            <option value="">Select State</option>
                            {allStates.map((s) => (
                                <option key={s} value={s.toLowerCase()}>
                                    {s}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="PIN code"
                            className="bg-[#282828] font-kufam border border-gray-600 rounded p-2 text-sm"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Phone (optional)"
                        className="w-full bg-[#282828] font-kufam border border-gray-600 rounded p-2 text-sm mt-2"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {/* Checkbox */}
                    <label className="flex items-center gap-2 font-kufam text-gray-400 text-sm py-2 mb-4">
                        <input type="checkbox" className="accent-[#2F2F2F] rounded-sm" />
                        Text me with news and offers
                    </label>

                    {/* shipping method */}
                    {/* <div>
                        <p className="font-kufam py-3 text-lg">Shipping method</p>
                        <input
                            type="text"
                            placeholder="Enter your shipping address to view available shipping methods."
                            className="bg-[#8a8a8a] w-full py-2 px-2 rounded-sm outline-none"></input>
                    </div> */}
                </div>
                {/* pauyment */}
                {/* <div className="mt-6">
                    <h2 className="text-lg font-kufam mb-2">Payment</h2>
                    <p className="text-sm text-gray-500 font-kufam py-1">
                        All transactions are secure and encrypted.
                    </p>

                  
                    <div
                        className={`border rounded-lg mb-3 ${selected === "credit" ? "border-white" : "border-gray-600"
                            }`}
                    >
                        <label className="flex items-center justify-between p-3 cursor-pointer">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={selected === "credit"}
                                    onChange={() => setSelected("credit")}
                                    className="accent-[#592FF4]"
                                />
                                <span className="text-sm">Credit card</span>
                            </div>
                            <div className="flex gap-1">
                                <img src={visa} alt="Visa" className="h-5" />
                                <img src={master} alt="Master" className="h-5" />
                                <img src={visa} alt="Amex" className="h-5" />
                            </div>
                        </label>
                        <div>
                            {selected === "credit" && (
                                <div className="p-3 bg-[#454545] border border-gray-600">
                                    <input
                                        type="text"
                                        placeholder="Card number"
                                        className="w-full bg-transparent border rounded-sm border-gray-400  p-2 text-sm mb-2"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            placeholder="Expiration date (MM/YY)"
                                            className="bg-transparent border rounded-sm border-gray-400  p-2 text-sm"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Security code"
                                            className="bg-transparent border rounded-sm border-gray-400  p-2 text-sm"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Name on card"
                                        className="w-full bg-transparent border rounded-sm border-gray-400  p-2 text-sm mt-2"
                                    />

                                    <label className="flex items-center gap-2 text-sm text-gray-400 mt-3">
                                        <input type="checkbox" className="accent-[#592FF4]" defaultChecked />
                                        Use shipping address as billing address
                                    </label>
                                </div>

                            )}
                        </div>


                        <div
                            className={`border-b mb-3 ${selected === "razorpay" ? "border-white" : "border-gray-600 "
                                }`}
                        >
                            <label className="flex items-center justify-between p-3 cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        checked={selected === "razorpay"}
                                        onChange={() => setSelected("razorpay")}
                                        className="accent-[#592FF4]"
                                    />
                                    <span className="text-sm">
                                        Razorpay Secure (UPI, Cards, Wallets, NetBanking)
                                    </span>
                                </div>
                                <div className="flex gap-1">
                                    <img src={upi} alt="UPI" className="h-5" />
                                    <img src={visa} alt="Visa" className="h-5" />
                                    <img src={rupay} alt="Rupay" className="h-5" />
                                    <span className="text-xs text-gray-400">+16</span>
                                </div>
                            </label>
                        </div>

                     
                        <div
                            className={`border-b ${selected === "bread" ? "border-white" : "border-gray-600 "
                                }`}
                        >
                            <label className="flex items-center justify-between p-3 cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        checked={selected === "bread"}
                                        onChange={() => setSelected("bread")}
                                        className="accent-[#592FF4]"
                                    />
                                    <span className="text-sm">Pay Over Time with Bread Pay</span>
                                </div>
                                <img src={visa} alt="Bread" className="h-6" />
                            </label>
                        </div>
                    </div>
                </div> */}
                {/* Add Tip Section */}
                {/* <div className="mt-6">
                    <h2 className="text-lg font-kufam mb-2">Add tip</h2>
                    <div className="border rounded-lg mb-3">
                  
                        <label className="flex items-center gap-2 text-sm text-white border-b border-gray-400 px-4 py-3 cursor-pointer">
                            <input type="checkbox" className="accent-[#592FF4] font-kufam" />
                            Show your support for the team at Radheva Jewels
                        </label>

                    
                        <div className="grid grid-cols-4 text-center">
                            <button className="p-3 border-r bg-[#454545]">
                                <p className="text-sm">5%</p>
                                <p className="text-xs text-gray-300">₹4,740.00</p>
                            </button>
                            <button className="p-3 border-r bg-[#454545]">
                                <p className="text-sm">10%</p>
                                <p className="text-xs text-gray-300">₹9,480.00</p>
                            </button>
                            <button className="p-3 border-r bg-[#454545]">
                                <p className="text-sm">15%</p>
                                <p className="text-xs text-gray-300">₹14,220.00</p>
                            </button>
                            <button className="p-3 bg-[#454545]">
                                <p className="text-sm font-kufam">None</p>
                            </button>
                        </div>

                  
                        <div className="flex items-center gap-2 p-3 border-t border-gray-400 bg-[#454545]">
                            <input
                                type="number"
                                placeholder="Custom tip"
                                className="flex-1 bg-[#454545]  font-kufam border border-gray-500 rounded px-3 py-3 text-sm text-white"
                            />
                            <button className="bg-white text-black px-3 py-3 font-kufam rounded text-sm">
                                Add tip
                            </button>
                        </div>
                        <p className="font-kufam px-3 bg-[#454545] text-sm text-gray-400">Thank you, we appreciate it.</p>
                    </div>

                </div> */}

                {/* Remember Me */}
                <div className="mt-6">
                    <h2 className="text-lg font-kufam mb-2">Remember me</h2>
                    <div className="border border-gray-600 rounded p-3 flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="accent-[#592FF4]" />
                        <span className="text-sm">Save my information for a faster checkout</span>
                    </div>

                    {/* Secure & Encrypted */}
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 11c0-.943.657-1.75 1.5-1.933V8.5a1.5 1.5 0 10-3 0v.567C10.343 9.25 11 10.057 11 11v2h2v-2z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 11V7a4 4 0 014-4h8a4 4 0 014 4v4M4 11h16v9a2 2 0 01-2 2H6a2 2 0 01-2-2v-9z"
                                />
                            </svg>
                            Secure and encrypted
                        </span>
                        <span className="text-sm text-gray-400 font-semibold">shop</span>
                    </div>

                    {/* Pay Now Button */}
                    <button 
                        onClick={handlePlaceOrder}
                        disabled={isPlacingOrder}
                        className={`w-full mt-4 bg-[#8a6a3f] text-gray-200 py-3 rounded-md text-center font-medium cursor-pointer hover:opacity-90 ${isPlacingOrder ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                        {isPlacingOrder ? "Placing Order..." : "Pay now"}
                    </button>
                </div>
                <div className="border mt-15"></div>
                <div className="flex flex-row px-5 py-3 border-gray-600/40  ">
                    <button
                        onClick={handleReturnPolicy}
                        className="mt-3 w-full text-center text-sm font-kufam opacity-80 hover:underline"
                    >
                        RETURN POLICY
                    </button>
                    <button
                        onClick={handleShipping}
                        className="mt-3 w-full text-center text-sm font-kufam opacity-80 hover:underline"
                    >
                        SHIPPING POLICY
                    </button>
                    <button
                        onClick={handlePrivacy}
                        className="mt-3 w-full text-center text-sm font-kufam opacity-80 hover:underline"
                    >
                        PRIVACY POLICY
                    </button>
                    <button
                        onClick={handleService}
                        className="mt-3 w-full text-center text-sm font-kufam opacity-80 hover:underline"
                    >
                        TERMS OF SERVICE
                    </button>
                </div>

            </div>

            {/* Right Side - Order Summary */}
            <div className="flex-1 bg-[#2F2F2F] text-white px-8">
                <div className="text-white py-10">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                    {/* ✅ Loop through cart items */}
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => {
                            const product = item?.productId && typeof item.productId === 'object' ? item.productId : {};
                            const img = product?.productimage;
                            const qty = item?.quantity || 1;
                            const lineTotal = Number(item.totalPrice || 0);
                            return (
                            <div
                                key={item._id}
                                className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-4"
                            >
                                <div className="relative">
                                  <img
                                      src={img}
                                      alt={product?.productname || 'Product'}
                                      className="w-16 h-16 rounded object-cover"
                                  />
                                  <span className="absolute -top-2 -right-2 bg-[#C79954] text-black text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">{qty}</span>
                                </div>
                                <div>
                                    <p className="text-sm">{product?.productname || 'Product'}</p>
                                    <p className="text-xs text-gray-400">
                                        {item.metalId?.metalname || item.metalType || ''}
                                        {item.colorId?.colorname ? ` • ${item.colorId?.colorname}` : ''}
                                        {item.sizeId?.carat ? ` • ${item.sizeId?.carat}ct` : ''}
                                    </p>
                                </div>
                                <span className="ml-auto">₹{lineTotal.toLocaleString()}</span>
                            </div>
                        );})
                    ) : (
                        <p className="text-gray-400 text-sm">Your cart is empty</p>
                    )}

                    {/* Discount Code */}
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Discount code or gift card"
                        className="flex-1 bg-[#1d1d1d] border border-gray-600 rounded p-2 text-sm"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                      />
                      <button
                        onClick={handleApplyDiscount}
                        disabled={!discountCode || isApplyingDiscount}
                        className={`bg-white text-black px-4 rounded text-sm font-semibold ${(!discountCode || isApplyingDiscount) ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        {isApplyingDiscount ? "Applying..." : "Apply"}
                      </button>
                    </div>
                    {discountMessage ? (
                      <p className={`text-xs mb-3 ${discountIsError ? 'text-red-400' : 'text-green-400'}`}>{discountMessage}</p>
                    ) : null}

                    {/* Subtotal */}
                    <div className="flex justify-between text-sm mb-2">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between text-sm mb-2">
                        <span>Shipping</span>
                        <span>Enter shipping address</span>
                    </div>

                    <div className="border-t border-gray-600 my-3"></div>

                    {/* Discount Row (if any) */}
                    {totalDiscount > 0 && (
                      <div className="flex justify-between text-sm mb-2 text-[#C79954]">
                        <span>Discount</span>
                        <span>-₹{totalDiscount.toLocaleString()}</span>
                      </div>
                    )}

                    {/* Tax Amount */}
                    {totalTax > 0 && (
                      <div className="flex justify-between text-sm mb-2">
                        <span>Tax Amount</span>
                        <span>₹{totalTax.toLocaleString()}</span>
                      </div>
                    )}

                    {/* Total */}
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹{finalTotal.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center relative">
                        {/* Success Icon */}
                        <div className="mb-4">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                                <svg
                                    className="h-10 w-10 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Success Message */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
                        <p className="text-gray-600 mb-6">{successMessage}</p>

                        {/* Countdown Timer */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-500 mb-2">
                                Redirecting to order history in
                            </p>
                            <div className="text-4xl font-bold text-[#C79954]">
                                {countdown}
                            </div>
                        </div>

                        {/* OK Button */}
                        <button
                            onClick={handleSuccessModalClose}
                            className="w-full bg-[#C79954] text-white py-3 rounded-md font-semibold hover:bg-[#B5904F] transition-colors"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentFlow;
