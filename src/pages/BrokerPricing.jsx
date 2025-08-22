import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function BrokerPricing() {
  const [selectedPlan, setSelectedPlan] = useState('6months')

  const plans = [
    {
      id: '3months',
      name: '3 Months Plan',
      description: 'Perfect for new brokers',
      price: 499,
      duration: '3 months',
      features: [
        ' Up to 10 house lisiting',
        'Lead generation tools',
        'Client database access',
        'Property photography services',
        'Marketing materials',
        'Basic analytics dashboard',
        'Email support',
        'Mobile app access'
      ],
      popular: false,
      color: 'from-indigo-500 to-fuchsia-500'
    },
    {
      id: '6months',
      name: '6 Months Plan',
      description: 'Ideal for growing brokerages',
      price: 799,
      duration: '6 months',
      features: [
        'Up to 30 house lisiting',
        'Advanced lead scoring',
        'CRM integration',
        'Virtual tour creation',
        'Social media marketing',
        'Advanced analytics',
        'Priority support',
        'Team collaboration tools',
        'Commission tracking',
        'Legal document templates'
      ],
      popular: true,
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: '12months',
      name: '12 Months Plan',
      description: 'Complete solution for established brokers',
      price: 999,
      duration: '12 months',
      features: [
        'Up to 50 house lisiting',
        'AI-powered lead matching',
        'Advanced market insights',
        'Custom branding tools',
        'API access',
        '24/7 dedicated support',
        'Training & certification',
        'Exclusive property access',
        'Partnership opportunities',
        'Revenue optimization tools'
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
          <img src="/images/p-7.png" alt="Broker Pricing" className="w-full h-80 sm:h-96 lg:h-[30rem] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/40"></div>
        </div>
        <div className="relative px-6 py-12 sm:py-16 lg:py-24 text-white">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-5">
              🏢 Broker Pricing Plans
            </div>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">Grow Your Brokerage Business</h1>
            <p className="mt-3 text-white/90 text-lg">Professional tools and features designed specifically for real estate brokers. Scale your business with our comprehensive solutions.</p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Broker Plans */}
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl border-2 transition-all duration-500 hover:scale-105 ${
                  plan.popular
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
                        Professional Broker Tools
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
                      plan.popular
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

          {/* Broker Benefits Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Why Choose Ama Ghara for Brokers?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Professional tools and features designed to help you grow your brokerage business and serve your clients better.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Advanced Analytics</h3>
                <p className="text-slate-600 text-sm">Track performance, leads, and conversions with detailed analytics and insights.</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Lead Generation</h3>
                <p className="text-slate-600 text-sm">AI-powered lead matching and scoring to help you find the best prospects.</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛠️</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Professional Tools</h3>
                <p className="text-slate-600 text-sm">CRM, marketing tools, and legal templates to streamline your workflow.</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Mobile Access</h3>
                <p className="text-slate-600 text-sm">Access all features on the go with our mobile-optimized platform.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
              Have questions about our broker pricing? We're here to help you grow your business.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">How do I get started?</h3>
                <p className="text-slate-600 text-sm">Choose your plan, complete the registration, and our team will help you set up your broker account.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Can I upgrade my plan?</h3>
                <p className="text-slate-600 text-sm">Yes! You can upgrade to a higher plan anytime. We'll prorate the difference for the remaining period.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">What support is included?</h3>
                <p className="text-slate-600 text-sm">All plans include email support. 6 and 9-month plans include priority and 24/7 dedicated support.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-3xl p-8 lg:p-12 text-white">
              <h2 className="text-3xl font-black mb-4">Ready to Grow Your Brokerage?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join hundreds of successful brokers who trust Ama Ghara to grow their business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all duration-300">
                  Contact Sales Team
                </Link>
                <Link to="/services" className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300">
                  View All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 