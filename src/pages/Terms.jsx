import React from "react";
import {
  Book,
  Users,
  Shield,
  CreditCard,
  AlertTriangle,
  Slash,
  RefreshCw,
} from "lucide-react";

const Terms = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <section className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Welcome to <span className="font-semibold text-indigo-600">Amaghara</span>. 
            These Terms & Conditions govern your use of our property marketplace. 
            By creating an account or using our services, you acknowledge and agree 
            to comply with these terms. If you do not agree, please discontinue 
            using our platform immediately.
          </p>

          {/* Section 1 */}
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <Book className="text-indigo-600 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">
                1. Platform Purpose
              </h2>
            </div>
            <p className="text-gray-600 mb-3">
              Amaghara provides a digital marketplace where individuals, 
              agents, and property developers can:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Browse available homes, land, and rental opportunities.</li>
              <li>List properties for sale, lease, or short-term rental.</li>
              <li>Communicate directly with verified buyers, sellers, or landlords.</li>
            </ul>
            <p className="mt-3 text-gray-600">
              Misuse of the platform for fraudulent or unlawful activity is 
              strictly prohibited and may result in legal action.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <Users className="text-indigo-600 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">
                2. User Eligibility
              </h2>
            </div>
            <p className="text-gray-600">
              You must be at least <span className="font-semibold">18 years old</span> 
              to register or transact on Amaghara. By using our platform, you 
              confirm that you meet this eligibility requirement and that all 
              information you provide is accurate and complete.
            </p>
          </div>

          {/* Section 3 */}
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <Shield className="text-indigo-600 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">
                3. User Obligations
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Ensure that property listings are truthful and lawful.</li>
              <li>Use respectful and professional communication with other users.</li>
              <li>Comply with all real estate, rental, and land regulations in your region.</li>
              <li>Keep your account credentials secure and confidential.</li>
            </ul>
            <p className="mt-3 text-gray-600">
              Amaghara reserves the right to suspend accounts that violate 
              these obligations.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <CreditCard className="text-indigo-600 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">
                4. Financial Transactions
              </h2>
            </div>
            <p className="text-gray-600">
              Unless specifically stated, Amaghara does not handle or guarantee 
              financial transactions between users. Payments for properties or 
              rentals are strictly between buyers, sellers, and agents. 
              We strongly advise using secure and traceable payment methods.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <AlertTriangle className="text-indigo-600 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">
                5. Limitation of Liability
              </h2>
            </div>
            <p className="text-gray-600">
              Amaghara serves only as a property listing platform. We are not 
              responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-2">
              <li>Fraudulent, misleading, or outdated property information.</li>
              <li>Disputes or negotiations between buyers, sellers, or agents.</li>
              <li>Losses or damages resulting from reliance on property listings.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <Slash className="text-indigo-600 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">
                6. Account Suspension
              </h2>
            </div>
            <p className="text-gray-600">
              We may suspend, restrict, or terminate accounts found to be 
              involved in fraudulent activity, policy violations, or any 
              actions harmful to other users or the integrity of the platform.
            </p>
          </div>

          {/* Section 7 */}
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <RefreshCw className="text-indigo-600 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">
                7. Updates to These Terms
              </h2>
            </div>
            <p className="text-gray-600">
              Amaghara reserves the right to revise or update these Terms & 
              Conditions at any time. Users will be notified of significant 
              changes, and continued use of the platform constitutes acceptance 
              of the updated terms.
            </p>
          </div>

          {/* Closing */}
          <div className="mt-10 border-t pt-6">
            <p className="italic text-gray-600 mb-3">
              By using{" "}
              <span className="font-semibold text-indigo-600">Amaghara</span>, 
              you confirm that you have read, understood, and agreed to these 
              Terms & Conditions.
            </p>
            <p className="text-sm text-gray-500">
              For inquiries or support, contact us at{" "}
              <a
    href="mailto:contact.amaghara@gmail.com?subject=Privacy Policy Inquiry"
    className="text-indigo-600 font-medium hover:underline"
  >
    contact.amaghara@gmail.com
  </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
