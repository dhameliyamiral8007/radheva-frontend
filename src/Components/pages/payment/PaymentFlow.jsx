
import React, { useState } from "react";
import radheva from "../../../assets/Radhevalogo.svg";
import shop from "../../../assets/shop.svg";
import G from "../../../assets/gpay.svg";
import { Link, useNavigate } from "react-router-dom";
import upi from "../../../assets/upi.svg"
import rupay from "../../../assets/rupay.svg"
import visa from "../../../assets/visa.svg"
import master from "../../../assets/master.svg"
import { useCart } from "../../context/CartProvider";
const PaymentFlow = () => {
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [selected, setSelected] = useState("credit");
    const navigate = useNavigate();
    const { cartItems } = useCart(); // ✅ ACCESS cartItems
    const subtotal = cartItems.reduce(
        (acc, item) => acc + Number(item.price) * (item.quantity || 1),
        0
    );

    // Country → States mapping
    const statesByCountry = {
        india: ["Gujarat", "Maharashtra", "Delhi", "Karnataka"],
        usa: ["California", "Texas", "New York", "Florida"],
        uk: ["England", "Scotland", "Wales", "Northern Ireland"],
        canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
    };

    // Country list (keys must match statesByCountry)
    const countries = [
        { code: "india", name: "India" },
        { code: "usa", name: "United States" },
        { code: "uk", name: "United Kingdom" },
        { code: "canada", name: "Canada" },
    ];
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

                    {/* Country Dropdown */}
                    <div className="mb-2">
                        <select
                            className="w-full bg-[#282828] border border-gray-600 font-kufam rounded p-2 text-sm text-white"
                            value={country}
                            onChange={(e) => {
                                setCountry(e.target.value);
                                setState("");
                            }}
                        >
                            <option value="">Select Country/Region</option>
                            {countries.map((c) => (
                                <option key={c.code} value={c.code}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* First & Last Name */}
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="First name"
                            className="bg-[#282828] font-kufam border border-gray-600 rounded p-2 text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            className="bg-[#282828] font-kufam border border-gray-600 rounded p-2 text-sm"
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Address"
                        className="w-full bg-[#282828] font-kufam border border-gray-600 rounded p-2 text-sm mt-2"
                    />

                    <input
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                        className="w-full bg-[#282828] font-kufam border border-gray-600 rounded p-2 text-sm mt-2"
                    />

                    {/* City, State, PIN */}
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        <input
                            type="text"
                            placeholder="City"
                            className="bg-[#282828] border font-kufam border-gray-600 rounded p-2 text-sm"
                        />

                        {/* State Dropdown */}
                        <select
                            className="bg-[#282828] font-kufam border border-gray-600 rounded p-2 text-sm text-white"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            disabled={!country} // disable if no country selected
                        >
                            <option value="">{country ? "Select State" : "Select Country first"}</option>
                            {country &&
                                statesByCountry[country].map((s) => (
                                    <option key={s} value={s.toLowerCase()}>
                                        {s}
                                    </option>
                                ))}
                        </select>

                        <input
                            type="text"
                            placeholder="PIN code"
                            className="bg-[#282828] font-kufam border border-gray-600 rounded p-2 text-sm"
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Phone (optional)"
                        className="w-full bg-[#282828] font-kufam border border-gray-600 rounded p-2 text-sm mt-2"
                    />
                    {/* Checkbox */}
                    <label className="flex items-center gap-2 font-kufam text-gray-400 text-sm py-2 mb-4">
                        <input type="checkbox" className="accent-[#2F2F2F] rounded-sm" />
                        Text me with news and offers
                    </label>

                    {/* shipping method */}
                    <div>
                        <p className="font-kufam py-3 text-lg">Shipping method</p>
                        <input
                            type="text"
                            placeholder="Enter your shipping address to view available shipping methods."
                            className="bg-[#8a8a8a] w-full py-2 px-2 rounded-sm outline-none"></input>
                    </div>
                </div>
                {/* pauyment */}
                <div className="mt-6">
                    <h2 className="text-lg font-kufam mb-2">Payment</h2>
                    <p className="text-sm text-gray-500 font-kufam py-1">
                        All transactions are secure and encrypted.
                    </p>

                    {/* Credit Card */}
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


                        {/* Razorpay */}
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

                        {/* Bread Pay */}
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
                </div>
                {/* Add Tip Section */}
                <div className="mt-6">
                    <h2 className="text-lg font-kufam mb-2">Add tip</h2>
                    <div className="border rounded-lg mb-3">
                        {/* Checkbox */}
                        <label className="flex items-center gap-2 text-sm text-white border-b border-gray-400 px-4 py-3 cursor-pointer">
                            <input type="checkbox" className="accent-[#592FF4] font-kufam" />
                            Show your support for the team at Radheva Jewels
                        </label>

                        {/* Tip Options */}
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

                        {/* Custom Tip */}
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

                </div>

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
                    <button className="w-full mt-4 bg-[#8a6a3f] text-gray-200 py-3 rounded-md text-center font-medium cursor-pointer hover:opacity-90">
                        Pay now
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
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-4"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 rounded object-cover"
                                />
                                <div>
                                    <p className="text-sm">{item.name}</p>
                                    <p className="text-xs text-gray-400">
                                        {item.metalType} • {item.metalColor}{" "}
                                        {item.ringSize && `• Size: ${item.ringSize}`}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                                <span className="ml-auto">
                                    ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm">Your cart is empty</p>
                    )}

                    {/* Discount Code */}
                    <input
                        type="text"
                        placeholder="Discount code or gift card"
                        className="w-full bg-[#1d1d1d] border border-gray-600 rounded p-2 text-sm mb-3"
                    />

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

                    {/* Total */}
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentFlow;
