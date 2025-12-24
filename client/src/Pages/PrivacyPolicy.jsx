import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../Components/Footer";
import logo from "../assets/icon.jpeg";

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

      <div className="min-h-screen bg-slate-950 text-slate-100">
        {/* Top gradient header */}
        <div className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-800 bg-slate-900/60">
                <img
                  src={logo}
                  alt="TaskTribe logo"
                  className="h-8 w-8 object-cover"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Legal
                </p>
                <h1 className="text-lg font-semibold text-slate-50 sm:text-xl">
                  TaskTribe – Privacy Policy
                </h1>
              </div>
            </div>

            <div className="hidden text-right text-xs sm:block">
              <p className="text-slate-400">Last updated</p>
              <p className="font-medium text-slate-100">21-12-2025</p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-4 block text-xs text-slate-400 sm:hidden">
            Last updated:{" "}
            <span className="font-medium text-slate-200">21-12-2025</span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl shadow-slate-950/50 backdrop-blur">
            {/* Intro */}
            <div className="border-b border-slate-800 bg-slate-900/60 px-6 py-6 sm:px-10 sm:py-8">
              <p className="text-sm leading-relaxed text-slate-200">
                TaskTribe respects your privacy. This Privacy Policy explains
                how TaskTribe collects, uses, stores, and protects your personal
                information when you use the platform.
              </p>
            </div>

            {/* Sections */}
            <div className="px-6 py-6 sm:px-10 sm:py-8">
              <div className="space-y-8 text-sm leading-relaxed text-slate-200">
                {/* 1 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    1. Information We Collect
                  </h2>
                  <ul className="list-disc space-y-1 pl-5 text-slate-300">
                    <li>
                      Personal details (name, email, profile information).
                    </li>
                    <li>Account credentials and authentication data.</li>
                    <li>Task-related content and communications.</li>
                    <li>Usage data and platform activity.</li>
                  </ul>
                </section>

                {/* 2 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    2. How We Use Your Information
                  </h2>
                  <ul className="list-disc space-y-1 pl-5 text-slate-300">
                    <li>To operate and maintain the TaskTribe platform.</li>
                    <li>To create and manage user accounts.</li>
                    <li>To facilitate task posting and applications.</li>
                    <li>To improve platform performance and security.</li>
                    <li>To communicate important updates and notifications.</li>
                  </ul>
                </section>

                {/* 3 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    3. Data Sharing &amp; Disclosure
                  </h2>
                  <p>
                    TaskTribe does not sell or rent user data. Information may
                    be shared only when:
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
                    <li>Required by law or legal process.</li>
                    <li>
                      Necessary to protect platform integrity or user safety.
                    </li>
                    <li>
                      Users voluntarily share information with other users.
                    </li>
                  </ul>
                </section>

                {/* 4 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    4. Data Security
                  </h2>
                  <p>
                    TaskTribe implements reasonable security measures to protect
                    user data. However, no method of transmission or storage is
                    100% secure, and TaskTribe cannot guarantee absolute
                    security.
                  </p>
                </section>

                {/* 5 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    5. User Responsibilities
                  </h2>
                  <p>
                    Users are responsible for maintaining the confidentiality of
                    their account credentials and for all activities performed
                    under their accounts.
                  </p>
                </section>

                {/* 6 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    6. Cookies &amp; Tracking
                  </h2>
                  <p>
                    TaskTribe may use cookies or similar technologies to enhance
                    user experience, analyze usage patterns, and improve
                    platform functionality.
                  </p>
                </section>

                {/* 7 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    7. Third-Party Services
                  </h2>
                  <p>
                    TaskTribe may integrate third-party tools or services.
                    TaskTribe is not responsible for the privacy practices of
                    third-party platforms.
                  </p>
                </section>

                {/* 8 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    8. Data Retention
                  </h2>
                  <p>
                    User data is retained only as long as necessary to operate
                    the platform or comply with legal obligations.
                  </p>
                </section>

                {/* 9 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    9. Changes to This Privacy Policy
                  </h2>
                  <p>
                    TaskTribe may update this Privacy Policy at any time.
                    Continued use of the platform indicates acceptance of the
                    revised policy.
                  </p>
                </section>

                {/* 10 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    10. Contact Information
                  </h2>
                  <p>
                    For questions or concerns regarding this Privacy Policy,
                    please contact TaskTribe through official platform channels.
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
