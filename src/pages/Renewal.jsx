import { useState } from "react";

const Renewal = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // Fake request delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Hide success after a few seconds
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-200 relative overflow-hidden">

      <div className="max-w-7xl mx-auto flex justify-between px-6 py-24">

        {/* LEFT */}
        <div>
          <h1 className="text-6xl font-bold text-orange-500">
            trust-platformfincance
          </h1>

          <div className="w-[420px] h-[2px] bg-gray-400 mt-6"></div>
        </div>


        {/* RIGHT FORM */}
        <div className="w-[420px] bg-white p-8 rounded-md shadow-lg">

          <h2 className="text-xl text-gray-700 mb-6 leading-snug">
            For general inquiries, please use the form below.
          </h2>


          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ Your message has been submitted successfully!
            </div>
          )}


          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              placeholder="Your email *"
              required
              className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Your name *"
              required
              className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              rows="4"
              placeholder="Message *"
              required
              className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xs text-gray-600 leading-relaxed">
              With this form, we collect your name and contact information so
              that we can process your inquiry. Please refer to our
              <span className="text-blue-600 ml-1 cursor-pointer">
                privacy policy
              </span>{" "}
              to learn about how we protect and manage this data.
            </p>

            <label className="flex items-start gap-2 text-xs text-gray-700">
              <input type="checkbox" required className="mt-1" />
              I consent to having this information stored in order to process my
              inquiry.
            </label>

            {/* Fake captcha */}
            <div className="border rounded p-4 flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" required />
              I'm not a robot
            </div>


            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md text-white font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-900 hover:bg-blue-800"
              }`}
            >
              {loading ? "Sending..." : "› Contact us"}
            </button>

          </form>
        </div>
      </div>


      {/* Decorative bottom background */}
      <div className="absolute -bottom-40 left-0 w-full h-64 hi">
        <div className="absolute bottom-0 w-full h-full bg-teal-500 rounded-t-[50%]"></div>
        <div className="absolute bottom-0 w-full h-40 bg-teal-200 rounded-t-[60%]"></div>
      </div>

    </div>
  );
};

export default Renewal;