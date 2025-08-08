import React from "react";

const LearnMore = () => {
  return (
    <section className="bg-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          Learn More About Carvia
        </h2>
        <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto">
          Established in <span className="font-semibold text-blue-700">2023</span>, Carvia was born from a vision to
          simplify and elevate car rental experiences across Bangladesh. We’ve been helping individuals and businesses
          travel smarter and smoother ever since.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-white shadow-md p-6 rounded-xl border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To make renting a car as easy as booking a cab—while ensuring reliability, affordability, and comfort.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-xl border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Our Growth</h3>
            <p className="text-gray-600">
              Since launching, we’ve served thousands of customers and expanded to over 10 major cities.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-xl border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">What We Value</h3>
            <p className="text-gray-600">
              Honesty, transparency, and top-notch service. We treat every ride as a promise to deliver excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMore;

