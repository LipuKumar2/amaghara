import React from "react";
import { Shield, Info, Lock } from "lucide-react";

const Privacy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <section className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">
            Your privacy is very important to us. This Privacy Policy outlines how{" "}
            <span className="font-semibold text-indigo-600">Amaghara</span> collects, uses, 
            and protects your information while using our platform.
          </p>

          {/* Section 1 */}
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <Info className="text-indigo-600 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">
                1. Information We Collect
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We may collect personal details such as your name, email, phone number, 
              and property details when you submit a listing, register, or contact an agent.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <Shield className="text-indigo-600 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">
                2. How We Use Your Information
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your information is used only to provide our services, improve user 
              experience, and connect buyers and sellers effectively. We do not 
              sell your data to third parties.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <div className="flex items-center mb-3">
              <Lock className="text-indigo-600 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">
                3. Data Protection
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We implement strict security measures to protect your personal data and 
              ensure it is not accessed, shared, or altered by unauthorized third parties.
            </p>
          </div>

          {/* Footer Note */}
        <div className="mt-10 border-t pt-6">
  <p className="text-sm text-gray-500">
    If you have any questions regarding our Privacy Policy, please contact us at{" "}
    <a
      href="mailto:contact.amaghara@gmail.com"
      className="text-indigo-600 font-medium hover:underline"
    >
      contact.amaghara@gmail.com
    </a>
    .
  </p>
</div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
