import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function UserPricing() {
  const [selectedPlan, setSelectedPlan] = useState('one-time')

  const plans = [
    {
      id: 'one-time',
      name: 'One-Time Visit',
      description: 'Perfect for limited customers',
      price: 99,
      duration: 'One-time',
      houseVisits: 1,
      features: [
        'Single property visit',
        'Basic property details',
        'Owner contact information',
        'Property photos & videos',
        'Location details',
        'Price negotiation support'
      ],
      popular: false,
      color: 'from-slate-500 to-slate-600',
      isOneTime: true
    },
    {
      id: '3house',
      name: '3 House Plan',
      description: 'Visit 3 houses',
      price: 499,
      duration: '3 house',
      houseVisits: 3,
      features: [
        '3 house visits included',
        'Priority customer support',
        'Advanced search filters',
        'Saved searches & favorites',
        'Direct owner contact',
        'Property history & insights',
        'Virtual tour access',
        'Market trend reports'
      ],
      popular: true,
      color: 'from-indigo-500 to-fuchsia-500'
    },
    {
      id: '6house',
      name: '6 House Plan',
      description: 'Visit 6 houses',
      price: 799,
      duration: '6 house',
      houseVisits: 6,
      features: [
        '6 house visits included',
        'Everything in 3 months plan',
        'Site visit scheduling',
        'Legal document assistance',
        'Premium property listings',
        'Investment analysis tools',
        'Negotiation support',
        'Property valuation reports'
      ],
      popular: false,
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: '9house',
      name: '9 House Plan',
      description: 'Visit 9 houses',
      price: 999,
      duration: '9 house',
      houseVisits: 9,
      features: [
        '9 house visits included',
        'Everything in 9 house plan',
        '24/7 dedicated support',
        'Custom property alerts',
        'Market comparison tools',
        'Exclusive property access',
        'Personal property consultant',
        'Document verification support'
      ],
      popular: false,
      color: 'from-emerald-500 to-teal-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-white shadow-2xl">
        <div className="absolute inset-0">
          <img src="/images/p-5.png" alt="User Pricing" className="w-full h-80 sm:h-96 lg:h-[30rem] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/40"></div>
        </div>
        <div className="relative px-6 py-12 sm:py-16 lg:py-24 text-white">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-5">
              👤 User Pricing Plans
            </div>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">Find Your Perfect Home</h1>
            <p className="mt-3 text-white/90 text-lg">Choose the perfect plan for your property search. From one-time visits to extended packages with multiple house visits.</p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* One-Time Visit Card - Top */}
          <div className="mb-12">
            <div className="max-w-sm mx-auto">
              <div onClick={() => setSelectedPlan('one-time')} className={`relative rounded-3xl border-2 cursor-pointer transition-all duration-500 hover:scale-105 overflow-hidden ${
                selectedPlan === 'one-time'
                  ? 'border-indigo-200 bg-white shadow-2xl shadow-indigo-500/20 ring-4 ring-indigo-500/20'
                  : 'border-indigo-200 bg-gradient-to-br from-indigo-50 to-fuchsia-50 shadow-xl hover:shadow-2xl'
              }`}>
                {/* Special Offer Badge */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                    🔥 LIMITED TIME OFFER
                  </div>
                </div>
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}></div>
                </div>
                
                <div className="pt-12 px-6 pb-6 text-center relative z-10">
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-indigo-900 mb-2">One-Time Visit</h3>
                    <p className="text-indigo-700 mb-4">Perfect for limited customers</p>
                    
                    {/* Special Price Display */}
                    <div className="mb-6">
                      <div className="relative">
                        {/* Original Price (Strikethrough) */}
                        <div className="text-lg text-slate-400 line-through mb-1">₹199</div>
                        
                        {/* Special Price */}
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">₹99</span>
                          <span className="text-lg text-indigo-700">/visit</span>
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
                  <div className="space-y-2 mb-6">
                    {plans[0].features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span className="text-indigo-800 text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Special CTA Button */}
                  <Link
                    to="/contact"
                    className="w-full py-3 px-4 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl animate-pulse block text-center"
                  >
                    🔥 GRAB THIS OFFER NOW
                  </Link>
                  
                  {/* Urgency Message */}
                  <div className="mt-2 text-xs text-indigo-700 font-medium">
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
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-3xl border-2 cursor-pointer transition-all duration-500 hover:scale-105 ${
                  selectedPlan === plan.id || plan.popular
                    ? 'border-indigo-200 bg-white shadow-2xl shadow-indigo-500/20'
                    : 'border-slate-200 bg-white shadow-xl hover:shadow-2xl'
                } ${selectedPlan === plan.id ? 'ring-4 ring-indigo-500/20' : ''}`}
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
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{plan.name}</h3>
                    <p className="text-slate-600 mb-6">{plan.description}</p>
                    
                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-black text-slate-900">
                          ₹{plan.price}
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
                  <Link
                    to="/contact"
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl block text-center ${
                      (plan.popular || selectedPlan === plan.id)
                        ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600'
                        : 'bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700'
                    }`}
                  >
                    Choose {plan.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
              Have questions about our pricing? We're here to help you find the perfect plan.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">How do house visits work?</h3>
                <p className="text-slate-600 text-sm">Each plan includes a specific number of house visits. You can schedule visits through our platform and our team will arrange everything.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Can I extend my plan?</h3>
                <p className="text-slate-600 text-sm">Yes! You can upgrade to a higher plan anytime. Unused visits from your current plan will be carried forward.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">What payment methods?</h3>
                <p className="text-slate-600 text-sm">We accept all major credit cards, UPI, net banking, and digital wallets for secure payments.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-3xl p-8 lg:p-12 text-white">
              <h2 className="text-3xl font-black mb-4">Ready to Find Your Dream Property?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who found their perfect home with Ama Ghara.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all duration-300">
                  Contact Sales
                </Link>
                <Link to="/properties" className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300">
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 