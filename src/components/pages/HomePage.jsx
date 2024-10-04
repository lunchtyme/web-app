import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNewPage = () => {
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <section className="bg-gray-50">
        {/* Nav section */}
        <nav className="border-b-2 border-gray-300 bg-gray-50 h-[6rem] w-full flex justify-between items-center p-5">
          <div className="pl-10">
            <img src="/images/lunchtyme-black.svg" className="h-9 align-middle" />
          </div>
          <div className=" gap-5 hidden md:flex">
            <Link to="signup">
              <button className="bg-gray-200 lato-bold text-2xl py-4 rounded-lg text-center px-5 hover:bg-gray-300 transition">
                Get Started
              </button>
            </Link>
            <Link to="login">
              <button className="bg-gray-200 lato-bold text-2xl py-4 hover:bg-gray-300 rounded-lg text-center px-5 transition">
                Log In
              </button>
            </Link>
          </div>
          {/* Hamburger menu for mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              <svg
                className="w-8 h-8 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center gap-5 py-5 bg-white p-10 rounded-lg shadow-lg">
            <Link to="signup">
              <button className="bg-gray-200 lato-bold text-2xl py-4 rounded-lg text-center px-5 hover:bg-gray-300 transition">
                Get Started
              </button>
            </Link>
            <Link to="login">
              <button className="bg-gray-200 lato-bold text-2xl py-4 hover:bg-gray-300 rounded-lg text-center px-5 transition">
                Log In
              </button>
            </Link>
          </div>
        )}

        {/* Hero Section */}
        <section className="mx-auto mb-10 mt-3 text-center h-auto p-8">
          <main className=" p-5">
            <div className="flex flex-col lg:flex-row justify-between gap-10 flex-wrap p-10">
              <div className="flex-1 lg:w-[45rem] flex flex-col gap-10">
                <p className="text-4xl lg:text-8xl lato-bold text-left leading-tight lg:leading-[7rem] text-gray-700">
                  Empowering remote teams with seamless lunch solutions
                </p>
                <p className="lato-regular text-gray-500 text-lg lg:text-4xl text-start leading-tight">
                  Lunchtyme offers companies of all sizes an easy and automated way to buy lunch for
                  their remote teams.
                </p>
                <div className="flex justify-start gap-5 pt-10">
                  <Link to="/signup">
                    <button className="bg-gray-200 lato-bold text-lg lg:text-2xl py-3 lg:py-4 hover:bg-gray-300 rounded-lg text-center px-5 transition">
                      Get started
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex-1 flex flex-col lg:flex-row justify-start items-center gap-5">
                <div className="z-50 bg-gray-800 border-[1rem] shadow-2xl border-b-[3rem] rounded-[3rem] border-gray-800 w-full lg:w-[25rem]">
                  <img src="/images/food-hero-new.jpeg" alt="" className="rounded-[3rem]" />
                </div>
                <div className="relative lg:right-[2rem] bg-gray-800 border-[1rem] shadow-2xl border-b-[3rem] rounded-[3rem] border-gray-800 w-full lg:w-[20rem]">
                  <img src="/images/lunch.jpg" alt="" className="rounded-[3rem]" />
                </div>
              </div>
            </div>
          </main>
        </section>

        {/* The rest of your sections remain the same */}

        {/* features */}
        <section className="w-full p-5 lg:p-10">
          <div className="shadow-lg border-2 border-gray-800 rounded-lg flex flex-col gap-10 sm:flex-col md:flex-col lg:flex-row flex-wrap justify-evenly p-5 lg:p-10 items-center">
            <div className="w-full lg:w-[40%] flex flex-col gap-10">
              <p className="text-4xl lg:text-7xl lato-bold text-left leading-tight">
                Delicious Features You'll Love
              </p>
              <p className="lato-regular text-gray-500 text-xl lg:text-4xl text-start leading-snug">
                Lunchtyme offers a range of features designed to enhance your food ordering
                experience. Explore what we have to offer below.
              </p>

              <div className="flex flex-col gap-10 lg:gap-14 p-0 lg:p-5 w-auto lg:w-auto">
                <div className="flex items-start gap-5">
                  <img src="/images/case.svg" alt="" className="w-8" />
                  <div>
                    <p className="text-2xl lg:text-3xl lato-bold">Easy Ordering</p>
                    <p className="text-lg lg:text-2xl lato-regular text-gray-600">
                      Select your favorite dishes and place an order in just a few taps. Enjoy the
                      convenience of quick and hassle-free food delivery.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <img src="/images/mail.svg" alt="" className="w-8" />
                  <div>
                    <p className="text-2xl lg:text-3xl lato-bold">Real-Time Tracking</p>
                    <p className="text-lg lg:text-2xl lato-regular text-gray-600">
                      Track your order from the kitchen to your doorstep with our real-time tracking
                      feature. You'll never wonder where your food is again.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <img src="/images/bell.svg" alt="" className="w-8" />
                  <div>
                    <p className="text-2xl lg:text-3xl lato-bold">Exclusive Deals</p>
                    <p className="text-lg lg:text-2xl lato-regular text-gray-600">
                      Enjoy special discounts and offers available only on YummyCart. Save more on
                      every meal with our exclusive deals.
                    </p>
                  </div>
                </div>
                <Link to="/signup">
                  <button className="w-[10rem] bg-gray-200 lato-bold text-xl lg:text-2xl py-3 lg:py-4 hover:bg-gray-300 rounded-lg text-center px-5 transition">
                    Try it now
                  </button>
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-auto mt-10 lg:mt-0">
              <img
                src="/images/hero-2-new.jpeg"
                alt=""
                className="w-full sm:w-[30rem] lg:w-[35rem]"
              />
            </div>
          </div>
        </section>

        <section className="bg-white flex flex-col gap-16 pt-12 lg:gap-24 lg:pt-24">
          <div className="w-full text-center flex flex-col gap-5 p-8 lg:p-14">
            <p className="text-4xl lg:text-7xl lato-bold text-gray-700">Key Features at a Glance</p>
            <p className="text-xl lg:text-3xl lato-regular text-gray-500 text-center">
              Lunchtyme is packed with features that make food ordering simple, fast, and enjoyable.
              Learn more about what sets us apart.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row flex-wrap gap-10 lg:gap-14 p-8 lg:p-14 justify-center">
            {/* Feature 1 */}
            <div className="bg-white p-8 lg:p-10 text-center w-full lg:w-[30rem] border-2 h-auto lg:h-[30rem] border-gray-200 shadow-md rounded-lg flex flex-col items-center gap-7">
              <img src="/images/speed.svg" alt="" className="w-10" />
              <div className="flex flex-col gap-5">
                <p className="lato-bold text-2xl lg:text-3xl">Instant Support</p>
                <p className="text-gray-500 text-lg lg:text-2xl leading-normal">
                  Need help? Our customer support team is available 24/7 to assist you with any
                  inquiries or issues you might have. Your satisfaction is our priority.
                </p>
              </div>
              <button className="w-[10rem] lg:w-[14rem] bg-gray-200 lato-bold text-xl lg:text-2xl py-3 lg:py-4 hover:bg-gray-300 rounded-lg text-center px-5 transition">
                Try it now
              </button>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 lg:p-10 text-center w-full lg:w-[30rem] border-2 h-auto lg:h-[30rem] border-gray-200 shadow-md rounded-lg flex flex-col items-center gap-7">
              <img src="/images/time.svg" alt="" className="w-10" />
              <div className="flex flex-col gap-5">
                <p className="lato-bold text-2xl lg:text-3xl">Variety of Cuisines</p>
                <p className="text-gray-500 text-lg lg:text-2xl leading-normal">
                  From local to intercontinental, Indian to Italian, Lunchtyme offers a wide array
                  of cuisines to cater to every taste bud. Explore endless culinary options with us.
                </p>
              </div>
              <button className="w-[10rem] lg:w-[14rem] bg-gray-200 lato-bold text-xl lg:text-2xl py-3 lg:py-4 hover:bg-gray-300 rounded-lg text-center px-5 transition">
                Discover more
              </button>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 lg:p-10 text-center w-full lg:w-[30rem] border-2 h-auto lg:h-[30rem] border-gray-200 shadow-md rounded-lg flex flex-col items-center gap-7">
              <img src="/images/cloud.svg" alt="" className="w-10" />
              <div className="flex flex-col gap-5">
                <p className="lato-bold text-2xl lg:text-3xl">Safe Payments</p>
                <p className="text-gray-500 text-lg lg:text-2xl leading-normal">
                  Your payment information is secure with our encrypted transaction system. Enjoy
                  peace of mind knowing your details are protected.
                </p>
              </div>
              <button className="w-[10rem] bg-gray-200 lato-bold text-xl lg:text-2xl py-3 lg:py-4 hover:bg-gray-300 rounded-lg text-center px-5 transition">
                More info
              </button>
            </div>
          </div>
        </section>

        <section className="w-full bg-white p-8 lg:p-14">
          <div className="flex flex-col gap-5">
            <p className="text-4xl lg:text-6xl text-gray-700 lato-bold">
              Frequently Asked Questions
            </p>
            <p className="text-lg lg:text-2xl text-gray-500">
              Got questions? We have answers! Below you'll find some of the most common questions
              about Lunchtyme.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 p-8 lg:p-10 pt-10 lg:pt-14">
            {/* FAQ 1 */}
            <div className="flex flex-col gap-5">
              <p className="text-2xl lg:text-3xl text-gray-600 font-[600]">
                How do I place an order?
              </p>
              <p className="text-[1.2rem] lg:text-[1.4rem] text-gray-500 leading-normal">
                Simply download the YummyCart app, browse our partnered restaurants, select your
                desired meals, and place your order. It's that easy!
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="flex flex-col gap-5">
              <p className="text-2xl lg:text-3xl text-gray-600 font-[600]">
                What if my order is late?
              </p>
              <p className="text-[1.2rem] lg:text-[1.4rem] text-gray-500">
                If your order is late, you can track its status in real-time and contact our support
                team for any assistance required. We're here to help!
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="flex flex-col gap-5">
              <p className="text-2xl lg:text-3xl text-gray-600 font-[600]">
                Are there delivery fees?
              </p>
              <p className="text-[1.2rem] lg:text-[1.4rem] text-gray-500">
                Delivery fees may vary based on your location and the restaurant. Some restaurants
                offer free delivery promos. Check the app for details!
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="flex flex-col gap-5">
              <p className="text-2xl lg:text-3xl text-gray-600 font-[600]">
                How do I apply a promo code?
              </p>
              <p className="text-[1.2rem] lg:text-[1.4rem] text-gray-500">
                During checkout, enter your promo code in the designated field and the discount will
                be applied to your order. Enjoy your savings!
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white text-center p-8 lg:p-10">
          <div className="flex flex-col gap-5 lg:gap-10">
            <p className="text-4xl lg:text-6xl text-gray-800 lato-bold">
              Our Impressive Achievements
            </p>
            <p className="text-lg lg:text-2xl text-gray-500">
              With millions of happy customers and thousands of partnered restaurants, Lunchtyme is
              the go-to food ordering app for all your culinary needs. See our success in numbers
              below.
            </p>
          </div>

          <div className="p-8 lg:p-16">
            <div className="p-5 border-2 border-gray-300 rounded-lg flex-col lg:flex-row flex w-full lg:w-[90%] mx-auto h-auto lg:h-[10rem] items-center">
              {/* Achievement 1 */}
              <div className="flex-1 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-300 h-full flex flex-col items-center">
                <div className="my-auto">
                  <p className="text-3xl lg:text-4xl lato-bold">25</p>
                  <p className="text-xl lg:text-2xl text-gray-500 lato-regular">Orders placed</p>
                </div>
              </div>

              {/* Achievement 2 */}
              <div className="flex-1 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-300 h-full flex flex-col items-center">
                <div className="my-auto">
                  <p className="text-3xl lg:text-4xl lato-bold">10</p>
                  <p className="text-xl lg:text-2xl text-gray-500 lato-regular">
                    Partnered restaurants
                  </p>
                </div>
              </div>

              {/* Achievement 3 */}
              <div className="flex-1">
                <p className="text-3xl lg:text-4xl lato-bold">30</p>
                <p className="text-xl lg:text-2xl text-gray-500 lato-regular">Happy customers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="footer footer-center bg-white p-10">
          <aside className="flex justify-between w-full">
            <p className="font-bold text-4xl">
              Lunchtyme
              <br />
            </p>
            {/** 
             *<p className="text-xl font-semibold">
              "Deliciousness Delivered Directly to Your Door."
            </p>
            */}
            <p>Copyright © {new Date().getFullYear()} - </p>
          </aside>
        </footer>
      </section>
    </>
  );
};

export default HomePage;
