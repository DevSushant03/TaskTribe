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
                  TaskTribe – Terms & Conditions
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
            {/* Intro section */}
            <div className="border-b border-slate-800 bg-slate-900/60 px-6 py-6 sm:px-10 sm:py-8">
              <p className="text-sm leading-relaxed text-slate-200">
                By accessing or using{" "}
                <span className="font-semibold text-slate-50">TaskTribe</span>,
                you agree to be bound by these Terms & Conditions. If you do not
                agree, you must not use the platform.
              </p>
            </div>

            {/* Body sections */}
            <div className="px-6 py-6 sm:px-10 sm:py-8">
              <div className="space-y-8 text-sm leading-relaxed text-slate-200">
                {/* 1 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    1. Platform Role &amp; Nature of Service
                  </h2>
                  <p className="mb-2">
                    TaskTribe is an online intermediary platform that connects
                    users who post tasks (“Task Creators”) with users who apply
                    to complete tasks (“Freelancers”).
                  </p>
                  <ul className="list-disc space-y-1 pl-5 text-slate-300">
                    <li>TaskTribe is not an employer, contractor, or agent.</li>
                    <li>
                      No guarantee of task completion, quality, or payment.
                    </li>
                    <li>Not a party to agreements between users.</li>
                  </ul>
                </section>

                {/* 2 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    2. Eligibility
                  </h2>
                  <p>
                    Users must be at least{" "}
                    <span className="font-semibold text-slate-50">
                      18 years old
                    </span>
                    . Accurate information is required, and only one account per
                    user is permitted.
                  </p>
                </section>

                {/* 3 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    3. User Accounts &amp; Responsibilities
                  </h2>
                  <p>
                    Users are solely responsible for activities conducted
                    through their accounts, including maintaining security and
                    ensuring accuracy of information.
                  </p>
                </section>

                {/* 4 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    4. Tasks, Applications &amp; Engagements
                  </h2>
                  <p>
                    All tasks and applications are user-generated. TaskTribe
                    does not verify legitimacy or capability. Engagements occur
                    at users’ own risk.
                  </p>
                </section>

                {/* 5 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    5. Payments &amp; Financial Responsibility
                  </h2>
                  <p>
                    TaskTribe may introduce payment features in the future.
                    Currently, TaskTribe does not guarantee payments and is not
                    responsible for payment disputes, delays, or failures.
                  </p>
                </section>

                {/* 6 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    6. Prohibited Activities
                  </h2>
                  <ul className="list-disc space-y-1 pl-5 text-slate-300">
                    <li>Fake or misleading tasks.</li>
                    <li>Plagiarized or stolen work.</li>
                    <li>Harassment, abuse, or scams.</li>
                    <li>Offensive, harmful, or illegal content.</li>
                  </ul>
                  <p className="mt-2">
                    Violations may result in immediate and permanent suspension.
                  </p>
                </section>

                {/* 7 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    7. Content Ownership &amp; Usage
                  </h2>
                  <p>
                    Users retain ownership of their content but grant TaskTribe
                    a non-exclusive, royalty-free license to display, store,
                    modify, or remove content for platform operations.
                  </p>
                </section>

                {/* 8 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    8. Account Suspension &amp; Termination
                  </h2>
                  <p>
                    TaskTribe may suspend or terminate accounts, remove content,
                    or restrict access at its sole discretion, without prior
                    notice.
                  </p>
                </section>

                {/* 9 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    9. Disputes Between Users
                  </h2>
                  <p>
                    TaskTribe is not obligated to resolve disputes. Any
                    administrative decision shall be final and binding.
                  </p>
                </section>

                {/* 10 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    10. Limitation of Liability
                  </h2>
                  <p>
                    TaskTribe shall not be liable for financial loss, data loss,
                    missed opportunities, emotional distress, or task-related
                    failures. Use of the platform is at your own risk.
                  </p>
                </section>

                {/* 11 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    11. Indemnification
                  </h2>
                  <p>
                    Users agree to indemnify and hold TaskTribe harmless from
                    claims, damages, or legal actions arising from their actions
                    or content.
                  </p>
                </section>

                {/* 12 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    12. Modification of Terms
                  </h2>
                  <p>
                    TaskTribe may modify these Terms &amp; Conditions at any
                    time. Continued use of the platform constitutes acceptance
                    of the updated terms.
                  </p>
                </section>

                {/* 13 */}
                <section>
                  <h2 className="mb-2 text-base font-semibold text-slate-50">
                    13. Governing Law
                  </h2>
                  <p>
                    These Terms &amp; Conditions shall be governed by applicable
                    laws, with jurisdiction determined by TaskTribe.
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
