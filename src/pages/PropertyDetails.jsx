import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'

export default function PropertyDetails() {
  const { id } = useParams()
  const [activeImage, setActiveImage] = useState(0)
  const [showContact, setShowContact] = useState(false)

  // Mock property data - in real app this would come from API
  const property = {
    id: id,
    title: '2BHK Modern Apartment in Nayapalli',
    price: '₹45 Lakhs',
    pricePerSqft: '₹3,200/sqft',
    type: '2BHK Apartment',
    status: 'For Sale',
    location: 'Nayapalli, Bhubaneswar',
    area: '1,400 sqft',
    built: '2019',
    facing: 'East',
    floor: '3rd Floor of 5',
    furnished: 'Semi-Furnished',
    parking: '1 Car + 1 Bike',
    description: 'Beautiful 2BHK apartment with modern amenities in prime Nayapalli location. Close to schools, hospitals, and shopping centers. Excellent connectivity to IT hubs.',
    images: [
      '/images/p-2.png',
      '/images/p-4.png',
      '/images/p-5.png',
      '/images/p-6.png',
    ],
    amenities: [
      { name: '24x7 Security', icon: '🛡️' },
      { name: 'Swimming Pool', icon: '🏊' },
      { name: 'Gym', icon: '💪' },
      { name: 'Garden', icon: '🌳' },
      { name: 'Power Backup', icon: '🔌' },
      { name: 'Lift', icon: '🛗' },
      { name: 'Parking', icon: '🅿️' },
      { name: 'Club House', icon: '🏠' },
    ],
    nearby: [
      { name: 'DAV Public School', distance: '0.5 km', type: 'school' },
      { name: 'AIIMS Bhubaneswar', distance: '3.2 km', type: 'hospital' },
      { name: 'Esplanade One Mall', distance: '1.8 km', type: 'shopping' },
      { name: 'Patia Railway Station', distance: '4.5 km', type: 'transport' },
    ],
    agent: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@amaghara.in',
      experience: '8+ years',
    }
  }

  const getTypeIcon = (type) => {
    switch(type) {
      case 'school': return '🏫'
      case 'hospital': return '🏥'
      case 'shopping': return '🛒'
      case 'transport': return '🚉'
      default: return '📍'
    }
  }

  return (
    <section className="space-y-12 px-6 sm:px-8 lg:px-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-sky-600">Home</Link>
        <span>/</span>
        <Link to="/properties" className="hover:text-sky-600">Properties</Link>
        <span>/</span>
        <span className="text-slate-900">{property.title}</span>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-white shadow-2xl">
        <div className="absolute inset-0">
                     <img src="/images/p-7.png" alt="Property" className="w-full h-72 sm:h-80 lg:h-[26rem] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/40"></div>
        </div>
        <div className="relative px-6 py-10 sm:py-14 lg:py-16 text-white">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-4">
              🏠 Property Details
            </div>
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">{property.title}</h1>
            <p className="mt-2 text-white/90">{property.location}</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="badge">{property.type}</span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
              {property.status}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{property.title}</h1>
          <p className="text-slate-600 flex items-center gap-1">
            <span>📍</span> {property.location}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-sky-600">{property.price}</div>
          <div className="text-sm text-slate-500">{property.pricePerSqft}</div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Price + Badges Row */}
        <div className="lg:col-span-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 -mt-4">
          <div className="flex items-center gap-2">
            <span className="badge">{property.type}</span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
              {property.status}
            </span>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-indigo-600">{property.price}</div>
            <div className="text-sm text-slate-500">{property.pricePerSqft}</div>
          </div>
        </div>
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div>
            <div className="mb-4">
              <img
                src={property.images[activeImage]}
                alt={`${property.title} - Image ${activeImage + 1}`}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`rounded-lg overflow-hidden border-2 transition ${
                    activeImage === index ? 'border-sky-500' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-bold mb-4">Property Details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Area:</span>
                <span className="font-semibold">{property.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Built Year:</span>
                <span className="font-semibold">{property.built}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Facing:</span>
                <span className="font-semibold">{property.facing}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Floor:</span>
                <span className="font-semibold">{property.floor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Furnished:</span>
                <span className="font-semibold">{property.furnished}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Parking:</span>
                <span className="font-semibold">{property.parking}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-bold mb-4">Description</h3>
            <p className="text-slate-600 leading-relaxed">{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-bold mb-4">Amenities</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {property.amenities.map((amenity) => (
                <div key={amenity.name} className="flex items-center gap-2 text-sm">
                  <span className="text-lg">{amenity.icon}</span>
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Places */}
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-bold mb-4">What's Nearby</h3>
            <div className="space-y-3">
              {property.nearby.map((place, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(place.type)}</span>
                    <span>{place.name}</span>
                  </div>
                  <span className="text-sm text-slate-500">{place.distance}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Map */}
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-bold mb-4">Location</h3>
            <div className="w-full h-64 rounded-xl overflow-hidden border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11487.919780990083!2d85.8350311397493!3d20.284486360855393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19090069a9e991%3A0x79f9a2326986a08b!2sCorenova%20Agency%20pvt%20ltd!5e1!3m2!1sen!2sin!4v1754720557866!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Property Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="rounded-2xl border-2 border-white bg-white p-6 shadow-xl sticky top-24">
            <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
            
            {/* Agent Info */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold">
                  {property.agent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold">{property.agent.name}</div>
                  <div className="text-sm text-slate-500">{property.agent.experience} experience</div>
                </div>
              </div>
            </div>

            {showContact ? (
              <div className="space-y-3">
                <a href={`tel:${property.agent.phone}`} className="btn-primary w-full">
                  📞 Call {property.agent.phone}
                </a>
                <a href={`mailto:${property.agent.email}`} className="btn-outline w-full">
                  ✉️ Email Agent
                </a>
                <button 
                  onClick={() => setShowContact(false)}
                  className="w-full text-sm text-slate-500 hover:text-slate-700"
                >
                  Hide Contact
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <input className="w-full rounded-xl border px-4 py-3" placeholder="Your Name" />
                <input className="w-full rounded-xl border px-4 py-3" placeholder="Phone Number" type="tel" />
                <input className="w-full rounded-xl border px-4 py-3" placeholder="Email" type="email" />
                <textarea 
                  className="w-full rounded-xl border px-4 py-3" 
                  rows="3" 
                  placeholder="I'm interested in this property..."
                />
                <button 
                  onClick={() => setShowContact(true)}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Get Contact Details
                </button>
                <div className="text-center">
                  <button className="w-full py-3 px-5 rounded-2xl font-bold text-indigo-700 bg-white border-2 border-indigo-200 hover:bg-indigo-50 transition-all">Schedule Site Visit</button>
                </div>
              </form>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border-2 border-white bg-white p-6 shadow-xl">
            <h4 className="font-bold mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition">
                ❤️ Save to Favorites
              </button>
              <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition">
                📤 Share Property
              </button>
              <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition">
                📊 Property Report
              </button>
              <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition">
                🏦 EMI Calculator
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <div className="border-t pt-8">
        <h3 className="text-2xl font-bold mb-6">Similar Properties</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { id: 2, title: '1BHK in Patia', price: '₹28L', badge: '1BHK', img: '/images/p-2.png' },
            { id: 3, title: '3BHK in Jaydev Vihar', price: '₹65L', badge: '3BHK', img: '/images/p-5.png' },
            { id: 4, title: '2BHK in Saheed Nagar', price: '₹42L', badge: '2BHK', img: '/images/p-4.png' },
          ].map((prop) => (
            <Link key={prop.id} to={`/properties/${prop.id}`} className="group">
              <article className="overflow-hidden rounded-2xl border bg-white group-hover:shadow-lg transition">
                <div className="relative">
                  <img src={prop.img} alt={prop.title} className="h-48 w-full object-cover" />
                  <span className="badge absolute left-3 top-3">{prop.badge}</span>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold group-hover:text-sky-600 transition">{prop.title}</h4>
                  <div className="text-sky-600 font-bold mt-1">{prop.price}</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
