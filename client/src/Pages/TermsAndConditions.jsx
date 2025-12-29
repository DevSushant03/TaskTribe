import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../Components/Footer";
import logo from "../assets/icon.jpeg";

export default function TermsAndConditions() {
  return (
    <>
      <Helmet>
        <title>TaskTribe | Terms & Conditions</title>
        <meta
          name="description"
          content="Read TaskTribe terms, conditions, refund, cancellation, and platform usage policies."
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
                  className="h-8 w-8 object-cover"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-orange-500">
                  Legal
                </p>
                <h1 className="text-lg font-semibold text-slate-800 sm:text-xl">
                  TaskTribe – Terms & Conditions
                </h1>
              </div>
            </div>

            <div className="hidden text-right text-xs sm:block">
              <p className="text-slate-500">Last updated</p>
              <p className="font-medium text-slate-700">29-12-2025</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-4 block text-xs text-slate-500 sm:hidden">
            Last updated:{" "}
            <span className="font-medium text-slate-700">29-12-2025</span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-orange-200 bg-white shadow-lg">
            {/* Intro */}
            <div className="border-b border-orange-100 bg-orange-50 px-6 py-6 sm:px-10">
              <p className="text-sm leading-relaxed text-slate-700">
                By accessing or using{" "}
                <span className="font-semibold text-orange-600">TaskTribe</span>
                , you agree to comply with and be legally bound by these Terms &
                Conditions. If you do not agree, please discontinue use of the
                platform.
              </p>
            </div>

            {/* Sections */}
            <div className="px-6 py-6 sm:px-10">
              <div className="space-y-10 text-sm leading-relaxed text-slate-700">
                {/* 1 */}
                <section>
                  <h2 className="text-base font-semibold text-slate-800 mb-2">
                    1. About TaskTribe
                  </h2>
                  <p>
                    TaskTribe is an online task-based collaboration platform
                    that connects individuals who post tasks (“Task Creators”)
                    with individuals who apply to complete those tasks
                    (“Freelancers”). TaskTribe acts only as a technology
                    platform and does not guarantee task outcomes or user
                    behavior.
                  </p>
                </section>

                {/* 2 */}
                <section>
                  <h2 className="text-base font-semibold text-slate-800 mb-2">
                    2. Eligibility
                  </h2>
                  <p>
                    You must be at least <strong>18 years old</strong> to use
                    TaskTribe. Users must provide accurate and complete
                    information and are responsible for keeping it updated.
                  </p>
                </section>

                {/* 3 */}
                <section>
                  <h2 className="text-base font-semibold text-slate-800 mb-2">
                    3. User Accounts & Responsibilities
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      You are responsible for maintaining account security
                    </li>
                    <li>
                      All activity under your account is your responsibility
                    </li>
                    <li>Misuse or false information may lead to suspension</li>
                  </ul>
                </section>

                {/* 4 */}
                <section>
                  <h2 className="text-base font-semibold text-slate-800 mb-2">
                    4. Tasks & Engagements
                  </h2>
                  <p>
                    All tasks, proposals, timelines, and deliverables are
                    user-generated. TaskTribe does not verify task authenticity
                    and is not responsible for disputes between users.
                  </p>
                </section>

                {/* 5 */}
                <section>
                  <h2 className="text-base font-semibold text-slate-800 mb-2">
                    5. Payments & Platform Fees
                  </h2>
                  <p>
                    Payments on TaskTribe are processed securely using a
                    third-party payment gateway. TaskTribe may hold payments
                    temporarily to ensure task completion and dispute handling.
                  </p>
                </section>

                {/* 6 */}
                <section>
                  <h2 className="text-base font-semibold text-slate-800 mb-2">
                    6. Cancellation Policy
                  </h2>
                  <p>
                    Task creators may request cancellation within{" "}
                    <strong>2 days</strong> of payment, provided the task work
                    has not started. Cancellation requests after this period may
                    be rejected.
                  </p>
                </section>

                {/* 7 */}
                <section>
                  <h2 className="text-base font-semibold text-slate-800 mb-2">
                    7. Refund Policy
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      Approved refunds are issued to the original payment method
                    </li>
                    <li>
                      Refunds typically take <strong>5–7 business days</strong>
                    </li>
                    <li>Completed or approved tasks are non-refundable</li>
                  </ul>
                </section>

                {/* 8 */}
                <section>
                  <h2 className="text-base font-semibold text-slate-800 mb-2">
                    8. Prohibited Activities
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Fraud, scams, or payment bypass attempts</li>
                    <li>Harassment, abuse, or hate content</li>
                    <li>Illegal, offensive, or misleading tasks</li>
                  </ul>
                </section>

                {/* 9 */}
                <section>
                  <h2 className="text-base font-semibold text-slate-800 mb-2">
                    9. Account Suspension & Termination
                  </h2>
                  <p>
                    TaskTribe reserves the right to suspend or permanently
                    terminate accounts violating platform rules, without prior
                    notice.
                  </p>
                </section>

                {/* 10 */}
                <section>
                  <h2 className="text-base font-semibold text-slate-800 mb-2">
                    10. Limitation of Liability
                  </h2>
                  <p>
                    TaskTribe shall not be liable for financial losses, task
                    failures, disputes, or indirect damages. Use of the platform
                    is entirely at your own risk.
                  </p>
                </section>

                {/* 11 */}
                <section>
                  <h2 className="text-base font-semibold text-slate-800 mb-2">
                    11. Governing Law
                  </h2>
                  <p>
                    These Terms & Conditions are governed by the laws of{" "}
                    <strong>India</strong>. Any disputes shall be subject to
                    Indian jurisdiction.
                  </p>
                </section>

                {/* 12 */}
                <section>
                  <h2 className="text-base font-semibold text-slate-800 mb-2">
                    12. Contact Information
                  </h2>
                  <p>
                    For questions related to terms, refunds, or cancellations,
                    please contact us at{" "}
                    <strong>mrsushant2005@gmail.com</strong>
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
