import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../Components/Footer";
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
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="mx-auto max-w-4xl bg-white rounded-xl shadow-md p-6 md:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            TaskTribe – Terms & Conditions
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Last Updated: <span className="font-medium">21-12-2025</span>
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            By accessing or using{" "}
            <span className="font-semibold">TaskTribe</span>, you agree to be
            bound by these Terms & Conditions. If you do not agree, you must not
            use the platform.
          </p>

          {/* Section */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Platform Role & Nature of Service
            </h2>
            <p className="text-gray-700 mb-2">
              TaskTribe is an online intermediary platform that connects users
              who post tasks (“Task Creators”) with users who apply to complete
              tasks (“Freelancers”).
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>TaskTribe is not an employer, contractor, or agent</li>
              <li>No guarantee of task completion, quality, or payment</li>
              <li>Not a party to agreements between users</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. Eligibility
            </h2>
            <p className="text-gray-700">
              Users must be at least{" "}
              <span className="font-semibold">18 years old</span>. Accurate
              information is required, and only one account per user is
              permitted.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. User Accounts & Responsibilities
            </h2>
            <p className="text-gray-700">
              Users are solely responsible for activities conducted through
              their accounts, including maintaining security and ensuring
              accuracy of information.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. Tasks, Applications & Engagements
            </h2>
            <p className="text-gray-700">
              All tasks and applications are user-generated. TaskTribe does not
              verify legitimacy or capability. Engagements occur at users’ own
              risk.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              5. Payments & Financial Responsibility
            </h2>
            <p className="text-gray-700">
              TaskTribe may introduce payment features in the future. Currently,
              TaskTribe does not guarantee payments and is not responsible for
              payment disputes, delays, or failures.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              6. Prohibited Activities
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Fake or misleading tasks</li>
              <li>Plagiarized or stolen work</li>
              <li>Harassment, abuse, or scams</li>
              <li>Offensive, harmful, or illegal content</li>
            </ul>
            <p className="text-gray-700 mt-2">
              Violations may result in immediate and permanent suspension.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              7. Content Ownership & Usage
            </h2>
            <p className="text-gray-700">
              Users retain ownership of their content but grant TaskTribe a
              non-exclusive, royalty-free license to display, store, modify, or
              remove content for platform operations.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              8. Account Suspension & Termination
            </h2>
            <p className="text-gray-700">
              TaskTribe may suspend or terminate accounts, remove content, or
              restrict access at its sole discretion, without prior notice.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              9. Disputes Between Users
            </h2>
            <p className="text-gray-700">
              TaskTribe is not obligated to resolve disputes. Any administrative
              decision shall be final and binding.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              10. Limitation of Liability
            </h2>
            <p className="text-gray-700">
              TaskTribe shall not be liable for financial loss, data loss,
              missed opportunities, emotional distress, or task-related
              failures. Use of the platform is at your own risk.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              11. Indemnification
            </h2>
            <p className="text-gray-700">
              Users agree to indemnify and hold TaskTribe harmless from claims,
              damages, or legal actions arising from their actions or content.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              12. Modification of Terms
            </h2>
            <p className="text-gray-700">
              TaskTribe may modify these Terms & Conditions at any time.
              Continued use of the platform constitutes acceptance of the
              updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              13. Governing Law
            </h2>
            <p className="text-gray-700">
              These Terms & Conditions shall be governed by applicable laws,
              with jurisdiction determined by TaskTribe.
            </p>
          </section>
        </div>
      </div>
      <Footer/>
    </>
  );
}
