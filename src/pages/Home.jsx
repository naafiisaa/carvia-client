import Banner from "../components/Banner";
import FeaturedCars from "../components/FeaturedCars";

import SpecialOffers from "../components/SpecialOffers";

import WhyChooseUs from "../components/WhyChooseUs";
import CustomerReviews from "../components/CustomerReviews";
import CarviaStats from "../components/CarviaStats";

const Home = () => {
  return (
    <>
      <Banner></Banner>
       <WhyChooseUs />
      <FeaturedCars />
     
      <SpecialOffers />
     <CustomerReviews /> 
     <CarviaStats />
    </>
  );
};

export default Home;
