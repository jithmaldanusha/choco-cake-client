import React, { useRef } from "react";
import { Carousel } from "flowbite-react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import HomepageComments from "../Components/HomepageComments";
import HomePageHotDeals from "../Components/HomePageHotDeals";
import HomepagePopular from "../Components/HomepagePopular";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import CategoryCard from "../Components/CategoryCard";
import FeatureCard from "../Components/FeatureCard";

import "../css/homepage.css";
// responsive enable
function Homepage() {

  // const cookieget = Cookies.get("memberToken");

  // const decoded = jwtDecode(cookieget);

  // checking logged user
  const cookieget = Cookies.get("memberToken");
  // const decoded = jwtDecode(cookieget);
  // console.log(decoded.given_name);

  let username = "";

  if (cookieget) {
    const decoded = jwtDecode(cookieget);
    if (decoded.given_name) {
      username = decoded.given_name;
    } else {
      username = decoded.username || "";
    }
  }

  const curRef = useRef();
  const navigate = useNavigate();

  const eventScroll = (direction) => {
    if (direction === "left") {
      if (curRef) {
        curRef.current.scrollLeft -= 300;
      }
    } else {
      if (curRef) {
        curRef.current.scrollLeft += 300;
      }
    }
  };

  const handleShopNow = () => {
    navigate('/drones');
  };

  const handleRedirect = () => {
    navigate('/drones');
  };

  const categoriesData = [
    {
      title: 'Lemon',
      imageSrc: 'images/Category1.png',
    },
    {
      title: 'Butter',
      imageSrc: 'images/Category2.png',
    },
    {
      title: 'Cream',
      imageSrc: 'images/Category3.png',
    },
    {
      title: 'Chocolate',
      imageSrc: 'images/Category4.png',
    },
  ];

  return (
    <div className="bg-black">
      <Navbar data={username} />
      <div className="flex min-h-full flex-1 flex-col justify-center">
        <div className="sm:h-80 md:h-96 lg:h-[25rem] xl:h-[30rem] 2xl:h-[35rem]">
          <Carousel slideInterval={3000} className="carousel">
            <img
              src="images/HomeImage3.png"
              alt="..."
            />
            <img
              src="images/HomeImage2.png"
              alt="..."
            />
            <img
              src="images/HomeImage.png"
              alt="..."
            />
          </Carousel>
        </div>

        <div className="p-5 mt-3 sm:mx-auto sm:w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">

          <div className="text-center p-5 mt-8">
            <h3 className="text-xl font-bold text-white tracking-wide">Our Categories</h3>
            <p className="font-semibold text-gray-400 tracking-wide mt-1">
              Explore our main categories on the go
            </p>
          </div>

          {/* categories section */}
          <section className="categories-section">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoriesData.map((category, index) => (
                <CategoryCard
                  key={index}
                  imageSrc={category.imageSrc}
                  title={category.title}
                />
              ))}
            </div>
          </section>

          <div className="flex flex-wrap justify-between items-center rounded-md mt-12">
            {/* Free Shipping */}
            <FeatureCard
              icon="/images/Vector.png"
              subIcon="/images/freeShipping.png"
              title="Free Shipping"
              description="Free shipping for all fully paid items"
              subIconStyles="bottom-0"
            />

            {/* One to One Warranty */}
            <FeatureCard
              icon="/images/Vector.png"
              subIcon="/images/OnetoOne.png"
              title="Delivery With Care"
              description="Eye catching packaging with care"
              subIconStyles="bottom-0"
            />

            {/* Easy Payment */}
            <FeatureCard
              icon="/images/Vector.png"
              subIcon="/images/EasyPayment.png"
              title="Easy Payment"
              description="Pay with multiple Credit Cards"
              subIconStyles="bottom-0"
            />

            {/* Online Support */}
            <FeatureCard
              icon="/images/Vector.png"
              subIcon="/images/Online.png"
              title="Online Support"
              description="24/7 Support"
              subIconStyles="bottom-0"
            />
          </div>

          {/* hot deal section */}
          <h2 className="text-left text-white mt-12 font-bold text-xl">Hot Deals</h2>
          <HomePageHotDeals />

          {/* popular products */}
          <h2 className="text-left mt-12 text-white font-bold text-xl mb-10">
            Popular Products
          </h2>

          <div className="2xl:flex flex-row align-middle items-center justify-between max-w-full ">
            <HomepagePopular />
          </div>
          {/* save amount 20% banner */}
          <div className="2xl:flex  bg-red-400 mt-32 rounded-xl sm:hidden">
            <div className="bg-red-400 w-4/5 rounded-l-xl">
              <div className=" relative ">
                <div className=" h-80 w-full relative overflow-hidden  ">
                  <div className="ml-24 box-content absolute bottom-12 h-80 w-80 m-auto border bg-white rounded-b-full rounded-l-full rounded-r-full"></div>
                </div>
                <div>
                  <img
                    alt="Your Company"
                    src="images/handpic.png"
                    className=" absolute h-96  bottom-0 right-16 "
                  // width={900}
                  // height={30}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* comments */}

          <HomepageComments />
        </div>

        {/* the big image */}
      </div>
      <div className="">
        <img
          alt="Your Company"
          src="images/EndImage.png"
          className="w-full h-auto block"
        />
      </div>
      <Footer />
    </div>
  );
}

export default Homepage