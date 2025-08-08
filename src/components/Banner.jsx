const Banner = () => {
  return (
    <section
      id="banner"
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://i.ibb.co/TMBnPb29/pexels-tdcat-70912.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6">
        <div className="max-w-4xl text-center md:text-left text-white space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center leading-tight drop-shadow-md">
            Drive Your Dreams Today!
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 drop-shadow max-w-xl text-center mx-auto ">
            Discover a wide range of premium cars ready to take you on your next journey. Rent with confidence, ride in luxury.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/available-cars"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition text-center"
            >
              View Available Cars
            </a>
            <a
              href="/learn-more"
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-6 py-3 rounded-full transition text-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;





