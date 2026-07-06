import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../Components/common/Footer";
import logo from "../assets/icon.jpeg";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>TaskTribe | Privacy, Refund & Terms</title>
        <meta
          name="description"
          content="Privacy Policy, Terms & Conditions, Cancellation and Refund Policy for TaskTribe."
        />
      </Helmet>

      <div className="min-h-screen bg-white text-slate-700">
        {/* Header */}
        <div className="border-b border-orange-200 bg-gradient-to-r from-orange-50 via-white to-orange-50">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-orange-200 bg-white">
                <img
                  src={logo}
                  alt="TaskTribe logo"
                  className="h-10 w-10 object-cover"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-orange-500">
                  Legal
                </p>
                <h1 className="text-lg font-semibold text-slate-800 sm:text-xl">
                  TaskTribe – Privacy, Refund & Terms
                </h1>
              </div>
            </div>

            <div className="hidden text-right text-xs sm:block">
              <p className="text-slate-500">Last updated</p>
              <p className="font-medium text-slate-700">29-12-2025</p>
            </div>
          </div>
        </div>

        {/* Main */}
        <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-4 block text-xs text-slate-500 sm:hidden">
            Last updated:{" "}
            <span className="font-medium text-slate-700">29-12-2025</span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-orange-200 bg-white shadow-lg">
            {/* Intro */}
            <div className="border-b border-orange-100 bg-orange-50/70 px-6 py-6 sm:px-10">
              <p className="text-sm leading-relaxed text-slate-700">
                TaskTribe is a task-based collaboration platform that connects
                users who need work done with individuals willing to complete
                those tasks. This document explains how we handle personal
                information, platform usage rules, and our cancellation and
                refund policies.
              </p>
            </div>

            {/* Content */}
            <div className="px-6 py-6 sm:px-10">
              <div className="space-y-8 text-sm leading-relaxed text-slate-700">
                {/* 1 */}
                <section>
                  <h2 className="mb-2 text-lg font-semibold text-slate-800">
                    1. Information We Collect
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Name, email address, and profile information</li>
                    <li>Login credentials and authentication data</li>
                    <li>Task details, bids, and user communications</li>
                    <li>
                      Usage data such as device, browser, and activity logs
                    </li>
                  </ul>
                </section>

                {/* 2 */}
                <section>
                  <h2 className="mb-2 text-lg font-semibold text-slate-800">
                    2. How We Use Your Information
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>To operate and maintain the TaskTribe platform</li>
                    <li>To manage accounts, tasks, and payments</li>
                    <li>To improve platform security and user experience</li>
                    <li>To send service-related notifications</li>
                  </ul>
                </section>

                {/* 3 */}
                <section>
                  <h2 className="mb-2 text-lg font-semibold text-slate-800">
                    3. Data Sharing & Disclosure
                  </h2>
                  <p className="text-sm leading-relaxed">
                    TaskTribe does not sell or rent personal data. Information
                    may be shared only when legally required, necessary to
                    prevent misuse, or voluntarily shared between users during
                    task collaboration.
                  </p>
                </section>

                {/* 4 */}
                <section>
                  <h2 className="mb-2 text-lg font-semibold text-slate-800">
                    4. Data Security
                  </h2>
                  <p className="text-sm leading-relaxed">
                    We implement reasonable technical and organizational
                    measures to protect user data. However, no digital platform
                    can guarantee complete security.
                  </p>
                </section>

                {/* 5 */}
                <section>
                  <h2 className="mb-2 text-lg font-semibold text-slate-800">
                    5. Cookies & Tracking
                  </h2>
                  <p className="text-sm leading-relaxed">
                    Cookies may be used to enhance functionality, analyze usage,
                    and improve overall user experience.
                  </p>
                </section>

                {/* 6 */}
                <section>
                  <h2 className="mb-2 text-lg font-semibold text-slate-800">
                    6. Third-Party Services
                  </h2>
                  <p className="text-sm leading-relaxed">
                    TaskTribe may integrate third-party tools such as payment
                    gateways. We are not responsible for their privacy
                    practices.
                  </p>
                </section>

                {/* 7 */}
                <section>
                  <h2 className="mb-2 text-lg font-semibold text-slate-800">
                    7. Data Retention
                  </h2>
                  <p className="text-sm leading-relaxed">
                    User data is retained only as long as necessary for platform
                    operations or legal compliance.
                  </p>
                </section>

                {/* 8 */}
                <section>
                  <h2 className="mb-2 text-lg font-semibold text-slate-800">
                    8. Terms & Conditions
                  </h2>
                  <p className="text-sm leading-relaxed">
                    TaskTribe acts solely as a technology platform connecting
                    users. We do not guarantee task completion, quality, or
                    outcomes. Users are responsible for their own agreements and
                    actions.
                  </p>
                </section>

                {/* 9 */}
                <section>
                  <h2 className="mb-2 text-lg font-semibold text-slate-800">
                    9. Cancellation Policy
                  </h2>
                  <p className="text-sm leading-relaxed">
                    Cancellation requests must be raised within{" "}
                    <strong>2 days</strong> of payment. Requests made after this
                    period may not be accepted.
                  </p>
                </section>

                {/* 10 */}
                <section>
                  <h2 className="mb-2 text-lg font-semibold text-slate-800">
                    10. Refund Policy
                  </h2>
                  <p className="text-sm leading-relaxed">
                    Approved refunds are processed to the original payment
                    method. Refunds typically take{" "}
                    <strong>5–7 working days</strong> to reflect.
                  </p>
                </section>

                {/* 11 */}
                <section>
                  <h2 className="mb-2 text-lg font-semibold text-slate-800">
                    11. Non-Refundable Cases
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Tasks already completed or delivered</li>
                    <li>Late cancellation requests</li>
                    <li>Violation of platform policies</li>
                  </ul>
                </section>

                {/* 12 */}
                <section>
                  <h2 className="mb-2 text-lg font-semibold text-slate-800">
                    12. Policy Updates
                  </h2>
                  <p className="text-sm leading-relaxed">
                    These policies may be updated periodically. Continued use of
                    TaskTribe indicates acceptance of the updated terms.
                  </p>
                </section>

                {/* 13 */}
                <section>
                  <h2 className="mb-2 text-lg font-semibold text-slate-800">
                    13. Contact Information
                  </h2>
                  <p className="text-sm leading-relaxed">
                    For support, refunds, or policy-related queries, contact us
                    at: <strong>mrsushant2005@gmail.com</strong>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
