import React, { useEffect, useRef } from "react";
// responsive enable
function HomepageComments() {
  const scrollRef = useRef(null);
  const scrollStep = 2; // Amount to scroll each interval
  const scrollDelay = 20; // Delay between scroll steps in milliseconds

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const autoScroll = () => {
      if (scrollContainer) {
        scrollAmount += scrollStep;
        if (
          scrollAmount >
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
    };

    const scrollInterval = setInterval(autoScroll, scrollDelay);

    return () => clearInterval(scrollInterval); // Cleanup interval on unmount
  }, [scrollStep, scrollDelay]); // Dependencies

  return (
    <div className="scroll-container flex min-h-full flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="scroll-content p-5 mt-3 sm:mx-auto sm:w-full sm:max-w-xl 2xl:max-w-7xl">
        <div className="card">
          <div className="px-5 mt-20 p-5">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
              <div className="flex flex-col lg:w-4/12">
                <div className="flex flex-col mt-1.5 font-semibold text-neutral-500 lg:mt-10">
                  <div className="text-xl">Why shop with</div>
                  <div className="mt-3 text-4xl text-black">
                    SPK<span className="text-red-400"> STORE</span>
                  </div>
                  <div className="mt-9 text-sm font-medium leading-4">
                    Established in 2021, SPK Store has quickly emerged as a
                    trusted retailerspecializing in cutting-edge technology
                    products. We pride ourselves on offering adiverse range of
                    items including gimbals, drones, cameras, and various
                    electronicdevices. Our commitment to exceptional customer
                    service and robust warranty supportdistinguishes us as a
                    preferred choice among tech enthusiasts.
                  </div>
                </div>
              </div>
              <div
                className="flex overflow-hidden rounded-xl relative whitespace-nowrap"
                ref={scrollRef}
              >
                <div className="flex align-middle">
                  <div className="px-5 max-w-[942px]">
                    <div className="flex gap-5 max-md:flex-col">
                      <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                       
                      <div className="flex flex-col grow pt-8 pr-3 pb-20 pl-7 w-full text-base leading-5 rounded-xl bg-red-400 bg-opacity-10 text-neutral-500 max-md:pl-5 max-md:mt-9">
                      <img
                        loading="lazy"
                        src="images/cre1.jpeg"
                        className="max-w-full rounded-full border-2 border-white border-solid aspect-square w-[150px] h-[150px]"
                      />
                       <div className="mt-9">
                         &quot;Customer service was top-
                         <br />
                         notch. They promptly answered <br />
                         all my questions and helped <br />
                         me choose the right drone for <br />
                         my needs.&quot;
                       </div>
                       <div className="flex mt-4">
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                       </div>
                     </div>
                    </div>


                      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow px-6 pt-8 pb-20 w-full text-base leading-5 rounded-xl bg-red-400 bg-opacity-10 text-neutral-500 max-md:px-5 max-md:mt-9">
                          <img
                            loading="lazy"
                            src="images/cre2.jpeg"
                            className="max-w-full rounded-full border-2 border-white border-solid aspect-square w-[150px] h-[150px]"
                            />
                          <div className="mt-9">
                          &quot;The facial product I bought <br /> from this site is wonderful! <br /> My skin feels soft and <br /> refreshed. Highly recommend <br /> for skincare lovers!&quot;
                          </div>
                          <div className="flex mt-4">
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                       </div>

                        </div>
                      </div>



                      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow px-6 pt-8 pb-20 w-full text-base leading-5 rounded-xl bg-red-400 bg-opacity-10 text-neutral-500 max-md:px-5 max-md:mt-9">
                          <img
                            loading="lazy"
                            src="images/cre3.jpeg"
                            className="max-w-full rounded-full border-2 border-white border-solid aspect-square w-[150px] h-[150px]"
                            />
                          <div className="mt-9">
                          &quot;The drone I purchased here <br /> is outstanding! Easy to fly, <br /> and the camera quality <br /> is top-notch. Just as <br /> described. Highly recommend!&quot;
                          </div>
                          <div className="flex mt-4">
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                       </div>

                        </div>
                      </div>
                      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow px-6 pt-8 pb-20 w-full text-base leading-5 rounded-xl bg-red-400 bg-opacity-10 text-neutral-500 max-md:px-5 max-md:mt-9">
                          <img
                            loading="lazy"
                           src="images/cre4.jpeg"
                           className="max-w-full rounded-full border-2 border-white border-solid aspect-square w-[150px] h-[150px]"
                           />
                          <div className="mt-9">
                          &quot;The gimbal I bought is <br /> excellent! Smooth controls, <br /> and it's easy to set up. <br /> Makes filming a breeze. <br /> Highly recommend!&quot;
                          </div>
                          <div className="flex mt-4">
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                       </div>
                        </div>
                      </div>
                      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow px-6 pt-8 pb-20 w-full text-base leading-5 rounded-xl bg-red-400 bg-opacity-10 text-neutral-500 max-md:px-5 max-md:mt-9">
                          <img
                            loading="lazy"
                            src="images/cre5.jpeg"
                            className="max-w-full rounded-full border-2 border-white border-solid aspect-square w-[150px] h-[150px]"
                            />
                          <div className="mt-9">
                          &quot;This smartwatch I ordered <br /> is fantastic! The battery life <br /> is impressive, and it tracks <br /> my health metrics accurately. <br /> Highly recommend it!&quot;

                          </div>
                          <div className="flex mt-4">
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                       </div>
                        </div>
                      </div>

                      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow px-6 pt-8 pb-20 w-full text-base leading-5 rounded-xl bg-red-400 bg-opacity-10 text-neutral-500 max-md:px-5 max-md:mt-9">
                          <img
                            loading="lazy"
                            src="images/cre6.jpeg"
                            className="max-w-full rounded-full border-2 border-white border-solid aspect-square w-[150px] h-[150px]"
                            />
                          <div className="mt-9">
                          &quot;The mobile phone accessories <br /> I purchased are excellent! <br /> High quality and work <br /> perfectly with my phone. <br /> Totally recommend this!&quot;
                          </div>
                          <div className="flex mt-4">
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                       </div>
                        </div>
                      </div>

                      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow px-6 pt-8 pb-20 w-full text-base leading-5 rounded-xl bg-red-400 bg-opacity-10 text-neutral-500 max-md:px-5 max-md:mt-9">
                          <img
                            loading="lazy"
                            src="images/cre7.jpeg"
                            className="max-w-full rounded-full border-2 border-white border-solid aspect-square w-[150px] h-[150px]"
                            />
                          <div className="mt-9">
                          &quot;The drone accessories I got <br /> from this site are awesome! <br /> They fit perfectly and <br /> improved my flight experience. <br /> Highly recommend them!&quot;
                          </div>
                          <div className="flex mt-4">
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                       </div>
                        </div>
                      </div>

                      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow px-6 pt-8 pb-20 w-full text-base leading-5 rounded-xl bg-red-400 bg-opacity-10 text-neutral-500 max-md:px-5 max-md:mt-9">
                          <img
                            loading="lazy"
                            src="images/cre7.jpeg"
                            className="max-w-full rounded-full border-2 border-white border-solid aspect-square w-[150px] h-[150px]"
                            />
                          <div className="mt-9">
                          &quot;The storage device I ordered <br /> is great! Fast data transfer, <br /> and it’s very reliable. Just <br /> as described. Highly recommend!&quot;
                          </div>
                          <div className="flex mt-4">
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                       </div>
                        </div>
                      </div>


                      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow px-6 pt-8 pb-20 w-full text-base leading-5 rounded-xl bg-red-400 bg-opacity-10 text-neutral-500 max-md:px-5 max-md:mt-9">
                          <img
                            loading="lazy"
                            src="images/cre8.jpeg"
                            className="max-w-full rounded-full border-2 border-white border-solid aspect-square w-[150px] h-[150px]"
                            />
                          <div className="mt-9">
                            &quot;The drone I purchased from this site <br /> is
                            fantastic! The build quality is <br /> excellent,
                            and it performs just as <br /> described. Highly
                            recommend!&quot;
                          </div>
                          <div className="flex mt-4">
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                       </div>
                        </div>
                      </div>

                      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow px-6 pt-8 pb-20 w-full text-base leading-5 rounded-xl bg-red-400 bg-opacity-10 text-neutral-500 max-md:px-5 max-md:mt-9">
                          <img
                            loading="lazy"
                            src="images/cre9.jpeg"
                            className="max-w-full rounded-full border-2 border-white border-solid aspect-square w-[150px] h-[150px]"
                            />
                          <div className="mt-9">
                          &quot;The gimbal I purchased from this site <br /> is amazing! The stabilization is <br /> flawless, and it makes my <br /> 
                          video shoots look professional. <br /> Highly recommend!&quot;
                          </div>
                          <div className="flex mt-4">
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                       </div>
                        </div>
                      </div>

                      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow px-6 pt-8 pb-20 w-full text-base leading-5 rounded-xl bg-red-400 bg-opacity-10 text-neutral-500 max-md:px-5 max-md:mt-9">
                          <img
                            loading="lazy"
                            src="images/cre10.jpeg"
                            className="max-w-full rounded-full border-2 border-white border-solid aspect-square w-[150px] h-[150px]"
                            />
                          <div className="mt-9">
                            &quot;The drone I purchased from this site <br /> is
                            fantastic! The build quality is <br /> excellent,
                            and it performs just as <br /> described. Highly
                            recommend!&quot;
                          </div>
                          <div className="flex mt-4">
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                         <img src="images/star.png" alt="star" className="w-5 h-5" />
                       </div>
                        </div>
                      </div>



                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomepageComments;
