import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Pricing from './pages/Pricing'
import UserPricing from './pages/UserPricing'
import BrokerPricing from './pages/BrokerPricing'
import Properties from './pages/Properties'
import PropertyDetails from './pages/PropertyDetails'
import Contact from './pages/Contact'
import Services from './pages/Services'
import SubmitProperty from './pages/SubmitProperty'
import Register from './pages/Register'
import Login from './pages/Login'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="pricing/user" element={<UserPricing />} />
          <Route path="pricing/broker" element={<BrokerPricing />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertyDetails />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
           <Route path="/submit-property" element={<SubmitProperty />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/admin" element={<AdminLogin />} />
            <Route path="/dashboard" element={<AdminDashboard />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
