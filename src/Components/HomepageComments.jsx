import React, { useEffect, useRef } from "react";

function HomepageComments() {
  const scrollRef = useRef(null);
  const scrollStep = 2;
  const scrollDelay = 20;

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

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="p-5 mt-3 mx-auto w-full max-w-7xl">
        <div className="card">
          <div className="px-5 mt-20 p-5">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
              {/* Business Info */}
              <div className="flex flex-col lg:w-4/12">
                <div className="flex flex-col mt-1.5 font-semibold text-neutral-500 lg:mt-10">
                  <div className="text-xl">Why choose</div>
                  <div className="mt-3 text-4xl">
                    CHOCO Cake<span className="text-red-400"> Bakery</span>
                  </div>
                  <div className="mt-9 text-sm font-medium leading-5">
                    Since 2021, CHOCO Cake has been the go-to destination for
                    premium cakes and sweet creations. From custom-designed
                    celebration cakes to everyday indulgent treats, we blend
                    top-quality ingredients with artistic flair. Our commitment
                    to flavor, freshness, and friendly service makes every visit
                    a delight.
                  </div>
                </div>
              </div>

              {/* Auto-Scrolling Testimonials */}
              <div
                className="flex overflow-hidden rounded-xl relative whitespace-nowrap flex-1"
                ref={scrollRef}
              >
                <div className="flex">
                  {/* Testimonial 1 */}
                  <div className="flex flex-col px-5 w-[250px]">
                    <div className="flex flex-col grow pt-8 pr-3 pb-10 pl-7 text-base leading-5 rounded-xl bg-red-400 bg-opacity-10 text-neutral-500 max-md:pl-5">
                      <img
                        loading="lazy"
                        src="images/cre1.jpeg"
                        className="rounded-full border-2 border-white aspect-square w-[150px] h-[150px] object-cover"
                        alt="Customer"
                      />
                      <div className="mt-9 whitespace-normal break-words">
                        The chocolate fudge cake was absolutely divine!
                        Moist, rich, and beautifully decorated. It stole the
                        show at our birthday party.
                      </div>
                      <div className="flex mt-4">
                        {[...Array(5)].map((_, i) => (
                          <img
                            key={i}
                            src="images/star.png"
                            alt="star"
                            className="w-5 h-5"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Testimonial 2 */}
                  <div className="flex flex-col px-5 w-[250px]">
                    <div className="flex flex-col grow pt-8 pr-3 pb-10 pl-7 text-base leading-5 rounded-xl bg-red-400 bg-opacity-10 text-neutral-500 max-md:pl-5">
                      <img
                        loading="lazy"
                        src="images/cre2.jpeg"
                        className="rounded-full border-2 border-white aspect-square w-[150px] h-[150px] object-cover"
                        alt="Customer"
                      />
                      <div className="mt-9 whitespace-normal break-words">
                        I ordered a custom cake for my wedding and it
                        exceeded expectations. Not only did it look stunning,
                        but the taste was unforgettable.
                      </div>
                      <div className="flex mt-4">
                        {[...Array(5)].map((_, i) => (
                          <img
                            key={i}
                            src="images/star.png"
                            alt="star"
                            className="w-5 h-5"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Testimonial 3 */}
                  <div className="flex flex-col px-5 w-[250px]">
                    <div className="flex flex-col grow pt-8 pr-3 pb-10 pl-7 text-base leading-5 rounded-xl bg-red-400 bg-opacity-10 text-neutral-500 max-md:pl-5">
                      <img
                        loading="lazy"
                        src="images/cre3.jpeg"
                        className="rounded-full border-2 border-white aspect-square w-[150px] h-[150px] object-cover"
                        alt="Customer"
                      />
                      <div className="mt-9 whitespace-normal break-words">
                        The chocolate fudge cake was absolutely divine!
                        Moist, rich, and beautifully decorated. It stole the
                        show at our birthday party.
                      </div>
                      <div className="flex mt-4">
                        {[...Array(4)].map((_, i) => (
                          <img
                            key={i}
                            src="images/star.png"
                            alt="star"
                            className="w-5 h-5"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Testimonial 4 */}
                  <div className="flex flex-col px-5 w-[250px]">
                    <div className="flex flex-col grow pt-8 pr-3 pb-10 pl-7 text-base leading-5 rounded-xl bg-red-400 bg-opacity-10 text-neutral-500 max-md:pl-5">
                      <img
                        loading="lazy"
                        src="images/cre4.jpeg"
                        className="rounded-full border-2 border-white aspect-square w-[150px] h-[150px] object-cover"
                        alt="Customer"
                      />
                      <div className="mt-9 whitespace-normal break-words">
                        The chocolate fudge cake was absolutely divine!
                        Moist, rich, and beautifully decorated. It stole the
                        show at our birthday party.
                      </div>
                      <div className="flex mt-4">
                        {[...Array(5)].map((_, i) => (
                          <img
                            key={i}
                            src="images/star.png"
                            alt="star"
                            className="w-5 h-5"
                          />
                        ))}
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
