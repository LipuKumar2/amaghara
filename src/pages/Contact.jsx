import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Us',
      details: ['Corenova Agency Pvt Ltd', 'Bhubaneswar, Odisha', 'India'],
      color: 'from-indigo-500 to-fuchsia-500'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 98765 43211', 'Mon-Sat: 9AM-6PM'],
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: '📧',
      title: 'Email Us',
      details: ['hello@amaghara.com', 'support@amaghara.com', '24/7 Support'],
      color: 'from-emerald-500 to-teal-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-white shadow-2xl">
        <div className="absolute inset-0">
          <img src="/images/p-6.png" alt="Contact" className="w-full h-80 sm:h-96 lg:h-[30rem] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/40"></div>
        </div>
        <div className="relative px-6 py-12 sm:py-16 lg:py-24 text-white">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-5">
              📞 Get in Touch
            </div>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">Let's Talk About Your Dream Property</h1>
            <p className="mt-3 text-white/90 text-lg">Ready to find your perfect home? Contact us today and let our experts help you make the right choice.</p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="px-6 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Contact Information Cards */}
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className={`h-16 w-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl`}>
                  {info.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-slate-600">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-4">Send Us a Message</h2>
                <p className="text-slate-600">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select a subject</option>
                      <option value="property-inquiry">Property Inquiry</option>
                      <option value="rental-service">Rental Service</option>
                      <option value="buying-service">Buying Service</option>
                      <option value="legal-assistance">Legal Assistance</option>
                      <option value="general-inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-8 bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="p-8 border-b border-slate-200">
                <h2 className="text-3xl font-black text-slate-900 mb-4">Find Us</h2>
                <p className="text-slate-600">Visit our office in Bhubaneswar, Odisha for a personal consultation.</p>
              </div>
              <div className="h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11487.919780990083!2d85.8350311397493!3d20.284486360855393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19090069a9e991%3A0x79f9a2326986a08b!2sCorenova%20Agency%20pvt%20ltd!5e1!3m2!1sen!2sin!4v1754720557866!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ama Ghara Office Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Why Choose Ama Ghara?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We provide personalized service and expert guidance to help you find the perfect property.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Expert Guidance</h3>
                <p className="text-slate-600 text-sm">Professional advice from experienced real estate experts who understand your needs.</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Quick Response</h3>
                <p className="text-slate-600 text-sm">We respond to all inquiries within 24 hours to ensure you get timely assistance.</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Personalized Service</h3>
                <p className="text-slate-600 text-sm">Tailored solutions based on your specific requirements and budget constraints.</p>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="mt-20 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-3xl p-8 lg:p-12 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-black mb-4">Business Hours</h2>
              <p className="text-xl text-white/90 mb-8">Visit us during our business hours for the best service experience.</p>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
                <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-t-2xl"></div>
                  <div className="text-2xl font-black mb-2 text-slate-900">Monday</div>
                  <div className="text-slate-600">9:00 AM - 6:00 PM</div>
                </div>
                <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-t-2xl"></div>
                  <div className="text-2xl font-black mb-2 text-slate-900">Tuesday</div>
                  <div className="text-slate-600">9:00 AM - 6:00 PM</div>
                </div>
                <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 to-orange-500 rounded-t-2xl"></div>
                  <div className="text-2xl font-black mb-2 text-slate-900">Wednesday</div>
                  <div className="text-slate-600">9:00 AM - 6:00 PM</div>
                </div>
                <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-t-2xl"></div>
                  <div className="text-2xl font-black mb-2 text-slate-900">Thursday</div>
                  <div className="text-slate-600">9:00 AM - 6:00 PM</div>
                </div>
                <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-t-2xl"></div>
                  <div className="text-2xl font-black mb-2 text-slate-900">Friday</div>
                  <div className="text-slate-600">9:00 AM - 6:00 PM</div>
                </div>
                <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-2xl"></div>
                  <div className="text-2xl font-black mb-2 text-slate-900">Saturday</div>
                  <div className="text-slate-600">9:00 AM - 4:00 PM</div>
                </div>
                <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-t-2xl"></div>
                  <div className="text-2xl font-black mb-2 text-slate-900">Sunday</div>
                  <div className="text-slate-600">Closed</div>
                </div>
                <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-rose-500 rounded-t-2xl"></div>
                  <div className="text-2xl font-black mb-2 text-slate-900">Emergency</div>
                  <div className="text-slate-600">24/7 Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
