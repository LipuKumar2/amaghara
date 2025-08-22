import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all')

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: '🏠' },
    { id: 'buy', name: 'Buy', icon: '💰' },
    { id: 'sell', name: 'Sell', icon: '📈' },
    { id: 'rent', name: 'Rent', icon: '🏡' },
    { id: 'lease', name: 'Lease', icon: '📋' },
    { id: 'commercial', name: 'Commercial', icon: '🏢' },
  ]

  const services = [
    {
      id: 1,
      name: 'Land Buy & Sell',
      category: 'sell',
      description: 'Professional land buying and selling services with legal verification and market analysis.',
      features: [
        'Land verification & documentation',
        'Market value assessment',
        'Legal title verification',
        'Property survey & mapping',
        'Negotiation support',
        'Registration assistance'
      ],

      icon: '🌍',
      popular: true
    },
    {
      id: 2,
      name: '1RK Rent & Sale',
      category: 'rent',
      description: 'Find or list 1RK properties for rent and sale with complete tenant/buyer verification.',
      features: [
        '1RK property listings',
        'Tenant/buyer screening',
        'Property photography',
        'Rent/sale agreement',
        'Maintenance coordination',
        '24/7 support'
      ],

      icon: '🏠',
      popular: false
    },
    {
      id: 3,
      name: '1BHK Rent & Sale',
      category: 'rent',
      description: 'Comprehensive 1BHK property services for both rental and sale transactions.',
      features: [
        '1BHK property search',
        'Professional photography',
        'Virtual tour creation',
        'Tenant/buyer verification',
        'Legal documentation',
        'Property management'
      ],

      icon: '🏡',
      popular: true
    },
    {
      id: 4,
      name: '2BHK Rent & Sale',
      category: 'rent',
      description: 'Premium 2BHK properties for families with complete end-to-end service.',
      features: [
        '2BHK property listings',
        'Family-friendly options',
        'School & hospital proximity',
        'Security verification',
        'Furnished/unfurnished options',
        'Maintenance services'
      ],

      icon: '🏘️',
      popular: false
    },
    {
      id: 5,
      name: '3BHK Rent & Sale',
      category: 'rent',
      description: 'Luxury 3BHK properties with premium amenities and professional management.',
      features: [
        '3BHK luxury properties',
        'Premium amenities',
        'Gated community options',
        'Security & parking',
        'Clubhouse access',
        'Concierge services'
      ],

      icon: '🏰',
      popular: false
    },
    {
      id: 6,
      name: 'Duplex Rent & Sale',
      category: 'rent',
      description: 'Exclusive duplex properties with modern design and premium features.',
      features: [
        'Duplex property listings',
        'Modern architecture',
        'Premium finishes',
        'Private garden/terrace',
        'Smart home features',
        'Exclusive community'
      ],

      icon: '🏛️',
      popular: false
    },
    {
      id: 7,
      name: 'Home Buy & Sell',
      category: 'sell',
      description: 'Complete home buying and selling services with professional guidance.',
      features: [
        'Home valuation',
        'Market analysis',
        'Buyer/seller matching',
        'Legal documentation',
        'Home inspection',
        'Negotiation support'
      ],

      icon: '🏠',
      popular: true
    },
    {
      id: 8,
      name: 'Office Space Rent',
      category: 'commercial',
      description: 'Commercial office spaces for businesses with flexible lease terms.',
      features: [
        'Office space listings',
        'Flexible lease terms',
        'Business amenities',
        'Parking facilities',
        'Security services',
        'Maintenance support'
      ],

      icon: '🏢',
      popular: false
    },
    {
      id: 9,
      name: 'Apartment Rent & Sale',
      category: 'rent',
      description: 'Modern apartments with community amenities and professional management.',
      features: [
        'Apartment listings',
        'Community amenities',
        'Swimming pool & gym',
        'Security & CCTV',
        'Maintenance staff',
        'Resident services'
      ],

      icon: '🏢',
      popular: false
    },
    {
      id: 10,
      name: 'Building Rent & Sale',
      category: 'sell',
      description: 'Complete building transactions for investors and developers.',
      features: [
        'Building valuation',
        'Investment analysis',
        'Legal verification',
        'Rental income assessment',
        'Development potential',
        'Financial planning'
      ],

      icon: '🏗️',
      popular: false
    },
    {
      id: 11,
      name: 'Commercial Space',
      category: 'commercial',
      description: 'Commercial properties for retail, warehouse, and industrial use.',
      features: [
        'Retail spaces',
        'Warehouse facilities',
        'Industrial properties',
        'Loading/unloading areas',
        'Security systems',
        'Business support'
      ],

      icon: '🏭',
      popular: false
    },
    {
      id: 12,
      name: '1RK/PG Accommodation',
      category: 'rent',
      description: 'Affordable 1RK and PG accommodations for students and professionals.',
      features: [
        '1RK & PG listings',
        'Student-friendly options',
        'Meal plans available',
        'Security deposit',
        'Monthly billing',
        'Housekeeping services'
      ],

      icon: '🏘️',
      popular: false
    }
  ]

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory)

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Property Buyer',
      content: 'Ama Ghara helped me find my dream home within my budget. Their property search service was exceptional!',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Property Seller',
      content: 'Sold my property in just 2 weeks with their professional marketing and listing service. Highly recommended!',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: 'Meera Patel',
      role: 'Landlord',
      content: 'Their rental management service has made my life so much easier. Professional and reliable team.',
      rating: 5,
      avatar: '👩‍🏫'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-white shadow-2xl">
        <div className="absolute inset-0">
          <img src="/images/p-4.png" alt="Services" className="w-full h-80 sm:h-96 lg:h-[30rem] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/40"></div>
        </div>
        <div className="relative px-6 py-12 sm:py-16 lg:py-24 text-white">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-5">
              🛠️ Our Services
            </div>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">Complete Real Estate Solutions</h1>
            <p className="mt-3 text-white/90 text-lg">From property search to legal assistance, we provide comprehensive real estate services to make your journey smooth and successful.</p>
          </div>
        </div>
      </section>

      {/* Services Content */}
      <section className="px-6 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Choose Your Service</h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Select from our comprehensive range of real estate services designed to meet all your property needs.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {serviceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className={`relative rounded-3xl border-2 transition-all duration-500 hover:scale-105 ${
                  service.popular
                    ? 'border-indigo-200 bg-white shadow-2xl shadow-indigo-500/20'
                    : 'border-slate-200 bg-white shadow-xl hover:shadow-2xl'
                }`}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                      ⭐ Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Service Header */}
                  <div className="text-center mb-6">
                    <div className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{service.name}</h3>
                    <p className="text-slate-600 text-sm mb-4">{service.description}</p>
                    
                    
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link to="/contact" className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl block text-center">
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Why Choose Ama Ghara?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We provide comprehensive real estate solutions with expertise, transparency, and personalized service.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Expert Guidance</h3>
                <p className="text-slate-600 text-sm">Professional advice from experienced real estate experts.</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Fast Service</h3>
                <p className="text-slate-600 text-sm">Quick turnaround times and efficient service delivery.</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Secure & Safe</h3>
                <p className="text-slate-600 text-sm">Your data and transactions are completely secure with us.</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Premium Quality</h3>
                <p className="text-slate-600 text-sm">High-quality service standards and customer satisfaction.</p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-4">What Our Clients Say</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our satisfied clients have to say about our services.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full flex items-center justify-center text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{testimonial.name}</h3>
                      <p className="text-slate-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-700 mb-4">{testimonial.content}</p>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-3xl p-8 lg:p-12 text-white">
              <h2 className="text-3xl font-black mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss your real estate needs and get personalized service recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all duration-300">
                  Contact Us
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
