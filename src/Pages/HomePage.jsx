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
// responsive enable
function Homepage() {

  const curRef = useRef();
  // Inside your component
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
    <div className="">
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:h-80 md:h-96 lg:h-[25rem] xl:h-[30rem] 2xl:h-[35rem]">
          <Carousel slideInterval={3000}>
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
            <h3 className="text-xl font-bold tracking-wide">Our Categories</h3>
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
              subIconStyles="bottom-0 mb-3 ml-4"
            />

            {/* One to One Warranty */}
            <FeatureCard
              icon="/images/Vector.png"
              subIcon="/images/OnetoOne.png"
              title="One to one Warranty"
              description="Within 30 days for an exchange"
              subIconStyles="bottom-0 ml-4 mb-1"
            />

            {/* Easy Payment */}
            <FeatureCard
              icon="/images/Vector.png"
              subIcon="/images/EasyPayment.png"
              title="Easy Payment"
              description="Pay with multiple Credit Cards"
              subIconStyles="bottom-0 right-3 ml-1 mb-3"
            />

            {/* Online Support */}
            <FeatureCard
              icon="/images/Vector.png"
              subIcon="/images/Online.png"
              title="Online Support"
              description="24/7 Support"
              subIconStyles="bottom-0 right-3 ml-1 mb-2"
            />
          </div>

          <h2 className="text-left mt-12 font-bold text-xl">Hot Deals</h2>

          {/* hot deal section */}
          <HomePageHotDeals />
          {/* popular products */}
          <h2 className="text-left mt-12 font-bold text-xl mb-10">
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
            <div className="flex flex-col mt-10 ">
              <h2 className="font-bold text-3xl text-white">
                Score Big Saving on Sport Gear
              </h2>
              <p className="mt-5 text-white">
                Explore a wide range of products across various categories, from drones and gimbals to smartwatches and more. We are excited to announce that you can enjoy discounts of up to 20% on selected items!{" "}
              </p>
              <div className="flex align-middle items-center justify-between mt-10">
                <h1 className="text-8xl font-semibold text-left text-white">
                  20%
                </h1>
                <button className="border px-10 py-2.5 rounded-md mr-28 font-bold text-white tracking-wide outline outline-2" onClick={handleShopNow}>
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>

          {/* brands */}

          <div className="2xl:flex flex-col mt-20 sm:hidden ">
            <div className="w-full bg-zinc-100 min-h-[5px] max-md:max-w-full" />
            <div className="flex gap-5 justify-between items-center mt-7 w-full max-md:flex-wrap max-md:max-w-full">
              <img
                alt="Your Company"
                src="/images/Rectangle 407.png"
                width={80}
                className="shrink-0 self-stretch max-w-full aspect-[1.82] w-[115px]"
              />
              <img
                alt="Your Company"
                src="/images/Rectangle 408.png"
                width={80}
                className="shrink-0 self-stretch my-auto max-w-full aspect-[3.7] w-[182px]"
              />
              <img
                alt="Your Company"
                src="/images/Rectangle 410.png"
                width={80}
                className="shrink-0 self-stretch my-auto aspect-[1.64] w-[94px]"
              />
              <img
                alt="Your Company"
                src="/images/Potensic.png"
                width={80}
                className="shrink-0 self-stretch max-w-full aspect-[3.03] w-[193px]"
              />
              <img
                alt="Your Company"
                src="/images/Zeblaze.png"
                width={80}
                className="shrink-0 self-stretch my-auto max-w-full aspect-[2.94] w-[161px]"
              />
              <img
                alt="Your Company"
                src="/images/Aochuan.png"
                width={80}
                className="shrink-0 self-stretch my-auto max-w-full aspect-[4.17] w-[213px]"
              />
            </div>
            <div className="mt-7 w-full bg-zinc-100 min-h-[5px] max-md:max-w-full" />
          </div>

          {/* comments */}
          <HomepageComments />
        </div>

        {/* the big image */}
      </div>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-full max-w-full">
        <img
          alt="Your Company"
          src="images/EndImage.png"
          className="w-full"
        //   width={550}
        // height={}
        />
      </div>

      <Footer />
    </div>
  );
}

export default Homepage