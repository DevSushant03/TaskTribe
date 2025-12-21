import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../Components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>TaskTribe | Privacy Policy</title>
        <meta
          name="description"
          content="Join TaskTribe to post tasks or earn money by solving tasks. Free to sign up."
        />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="mx-auto max-w-4xl bg-white rounded-xl shadow-md p-6 md:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            TaskTribe – Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Last Updated: <span className="font-medium">21-12-2025</span>
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            TaskTribe respects your privacy. This Privacy Policy explains how we
            collect, use, store, and protect your personal information when you
            use our platform.
          </p>

          {/* Section 1 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Information We Collect
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Personal details (name, email, profile information)</li>
              <li>Account credentials and authentication data</li>
              <li>Task-related content and communications</li>
              <li>Usage data and platform activity</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>To operate and maintain the TaskTribe platform</li>
              <li>To create and manage user accounts</li>
              <li>To facilitate task posting and applications</li>
              <li>To improve platform performance and security</li>
              <li>To communicate important updates and notifications</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. Data Sharing & Disclosure
            </h2>
            <p className="text-gray-700">
              TaskTribe does not sell or rent user data. Information may be
              shared only when:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
              <li>Required by law or legal process</li>
              <li>Necessary to protect platform integrity or user safety</li>
              <li>Users voluntarily share information with other users</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. Data Security
            </h2>
            <p className="text-gray-700">
              We implement reasonable security measures to protect user data.
              However, no method of transmission or storage is 100% secure, and
              TaskTribe cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              5. User Responsibilities
            </h2>
            <p className="text-gray-700">
              Users are responsible for maintaining the confidentiality of their
              account credentials and for all activities performed under their
              accounts.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              6. Cookies & Tracking
            </h2>
            <p className="text-gray-700">
              TaskTribe may use cookies or similar technologies to enhance user
              experience, analyze usage patterns, and improve platform
              functionality.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              7. Third-Party Services
            </h2>
            <p className="text-gray-700">
              TaskTribe may integrate third-party tools or services. We are not
              responsible for the privacy practices of third-party platforms.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              8. Data Retention
            </h2>
            <p className="text-gray-700">
              User data is retained only as long as necessary to operate the
              platform or comply with legal obligations.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              9. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700">
              TaskTribe may update this Privacy Policy at any time. Continued
              use of the platform indicates acceptance of the revised policy.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              10. Contact Information
            </h2>
            <p className="text-gray-700">
              If you have questions or concerns regarding this Privacy Policy,
              please contact TaskTribe through official platform channels.
            </p>
          </section>
        </div>
      </div>
      <Footer/>
    </>
  );
}
