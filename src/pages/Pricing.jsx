import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("house");
  const [selectedPlan, setSelectedPlan] = useState("plus");

  const plans = [
    {
      id: "one-time",
      name: "One-Time Visit",
      description: "Perfect for limited customers",
      price: 99,
      duration: "One-time",
      houseVisits: 1,
      features: [
        "Single property visit",
        "Basic property details",
        "Owner contact information",
        "Property photos & videos",
        "Location details",
        "Price negotiation support",
      ],
      popular: false,
      color: "from-slate-500 to-slate-600",
      isOneTime: true,
    },
    {
      id: "3 House",
      name: "3 House Plan",
      description: "Visit 3 houses ",
      price: 499,
      duration: "3 house ",
      houseVisits: 3,
      features: [
        "3 house visits included",
        "Priority customer support",
        "Advanced search filters",
        "Saved searches & favorites",
        "Direct owner contact",
        "Property history & insights",
        "Virtual tour access",
        "Market trend reports",
      ],
      popular: true,
      color: "from-indigo-500 to-fuchsia-500",
    },
    {
      id: "6House",
      name: "6 House Plan",
      description: "Visit 6 houses",
      price: 799,
      duration: "6 House",
      houseVisits: 6,
      features: [
        "6 house visits included",
        "Everything in 6 house plan",
        "Site visit scheduling",
        "Legal document assistance",
        "Premium property listings",
        "Investment analysis tools",
        "Negotiation support",
        "Property valuation reports",
      ],
      popular: false,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "9 House",
      name: "9 House Plan",
      description: "Visit 9 houses",
      price: 999,
      duration: "9 House",
      houseVisits: 9,
      features: [
        "9 house visits included",
        "Everything in 9 House plan",
        "24/7 dedicated support",
        "Custom property alerts",
        "Market comparison tools",
        "Exclusive property access",
        "Personal property consultant",
        "Document verification support",
      ],
      popular: false,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const currentPrice = (plan) => {
    return plan.price;
  };

  const savings = (plan) => {
    return 0;
  };

  const paymentHandler = async (price,e) => {
    e.preventDefault();
    const orders = {
      amount: price * 100,
      currency: "INR",
      receipt: `receipt_${new Date().getTime()}`,
    };
    const response = await fetch("http://localhost:5000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orders), // Example amount in paise
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_R7wI25WYrMMWvw", // Enter the Key ID generated from the Dashboard
      amount: orders.amount, // Amount is in currency subunits.
      currency: orders.currency, // Currency code
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "+919876543210", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/p-5.png"
            alt="Pricing Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/80 via-fuchsia-600/80 to-amber-500/80"></div>
        </div>
        <div className="relative px-6 py-20 sm:py-28 lg:py-32 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-6">
              💰 Choose Your Plan
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your property search. From one-time
              visits to extended packages with multiple house visits.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* One-Time Visit Card - Top */}
          <div className="mb-12">
            <div className="max-w-md mx-auto">
              <div className="relative rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-fuchsia-50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden">
                {/* Special Offer Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                    🔥 LIMITED TIME OFFER
                  </div>
                </div>

                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  ></div>
                </div>
                <div className="p-8 text-center relative z-10">
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-indigo-900 mb-2">
                      One-Time Visit
                    </h3>
                    <p className="text-indigo-700 mb-4">
                      Perfect for limited customers
                    </p>

                    {/* Special Price Display */}
                    <div className="mb-6">
                      <div className="relative">
                        {/* Original Price (Strikethrough) */}
                        <div className="text-lg text-slate-400 line-through mb-1">
                          ₹199
                        </div>

                        {/* Special Price */}
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-6xl font-black bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                            ₹99
                          </span>
                          <span className="text-lg text-indigo-700">
                            /visit
                          </span>
                        </div>

                        {/* Savings Badge */}
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          50% OFF
                        </div>
                      </div>

                      <div className="text-green-600 font-bold text-sm mt-3">
                        1 House Visit Included
                      </div>

                      {/* Limited Time Warning */}
                      <div className="mt-3 text-fuchsia-600 font-bold text-sm animate-pulse">
                        ⏰ Offer ends in 3 days!
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plans[0].features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span className="text-indigo-800 text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Special CTA Button */}
                  <button
                    onClick={(e) => {
                      setSelectedPlan("one-time");
                      paymentHandler(99,e);
                    }}
                    className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl animate-pulse"
                  >
                    🔥 GRAB THIS OFFER NOW
                  </button>

                  {/* Urgency Message */}
                  <div className="mt-3 text-xs text-indigo-700 font-medium">
                    *Limited to first 100 customers only
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Plans */}
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
            {plans.slice(1).map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl border-2 transition-all duration-500 hover:scale-105 ${
                  plan.popular
                    ? "border-indigo-200 bg-white shadow-2xl shadow-indigo-500/20"
                    : "border-slate-200 bg-white shadow-xl hover:shadow-2xl"
                } ${
                  selectedPlan === plan.id ? "ring-4 ring-indigo-500/20" : ""
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                      ⭐ Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-slate-600 mb-6">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-black text-slate-900">
                          ₹{currentPrice(plan)}
                        </span>
                        <span className="text-lg text-slate-500">
                          /{plan.duration}
                        </span>
                      </div>
                      <div className="text-green-600 font-bold text-sm mt-2">
                        {plan.houseVisits} House Visits Included
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-sm">✓</span>
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${
                      plan.popular
                        ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600"
                        : "bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700"
                    }`}
                  >
                    Choose {plan.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
              Have questions about our pricing? We're here to help you find the
              perfect plan.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">
                  How do house visits work?
                </h3>
                <p className="text-slate-600 text-sm">
                  Each plan includes a specific number of house visits. You can
                  schedule visits through our platform and our team will arrange
                  everything.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">
                  Can I extend my plan?
                </h3>
                <p className="text-slate-600 text-sm">
                  Yes! You can upgrade to a higher plan anytime. Unused visits
                  from your current plan will be carried forward.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">
                  What payment methods?
                </h3>
                <p className="text-slate-600 text-sm">
                  We accept all major credit cards, UPI, net banking, and
                  digital wallets for secure payments.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-3xl p-8 lg:p-12 text-white">
              <h2 className="text-3xl font-black mb-4">
                Ready to Find Your Dream Property?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who found their perfect
                home with Ama Ghara.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all duration-300"
                >
                  Contact Sales
                </Link>
                <Link
                  to="/properties"
                  className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300"
                >
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
