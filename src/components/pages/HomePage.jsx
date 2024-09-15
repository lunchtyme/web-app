import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
 
 
  const navigate = useNavigate();
  const handleNewPage = () => {
    navigate('/login');
  };
  return (
    <>
      <section className="bg-gray-200">
        {/* Navigation */}
        <nav className="p-10 w-[90%] flex justify-left mx-auto align-middle gap-20">
          <h2 className="text-4xl font-bold">
            Lunch<span className="text-green-600">tyme</span>
          </h2>
        </nav>

        {/* Hero Section */}
        <section className="mx-auto mb-10 mt-3 text-center h-auto p-8">
          <main className="flex flex-col align-middle justify-center">
            <div className="text-center">
              <p className="font-bold text-7xl text-black font-[wise-sans]">
                Automated Lunch For Your
              </p>
              <p className="font-bold text-7xl text-black font-[wise-sans]">Remote Teams</p>
            </div>
            <div>
              <p className="text-3xl mt-4 text-center w-[50%] mx-auto">
                Lunchtyme offers company of all size an easy and automated way to buy lunch for
                their remote teams.
              </p>
            </div>
            <div className="my-10">
              <Link to="/signup" className="mr-2">
                <button
                  className="btn text-white
                bg-green-600 text-xl w-[15rem] h-[4rem] text-center rounded-xl
                hover:bg-white hover:text-green-600"
                >
                  Get started
                </button>
              </Link>
              <button
                onClick={handleNewPage}
                className="border-2 border-green-600 btn text-green-600 bg-white text-xl w-[15rem] h-[4rem] text-center"
              >
                Log in
              </button>
            </div>
          </main>
        </section>

        {/* Menu Section */}
        <section className="w-full p-14 mb-24">
          <div className="w-full">
            <h2 className="text-center text-4xl font-semibold font-[wise-sans]  ">
              Why should you use Lunchtyme?
            </h2>
          </div>

          {/* Catalogue */}
          <div className="w-full flex justify-evenly flex-wrap gap-10 mt-10">
            <div
              className="border-2 w-[80%] bg-gray-100 text-white p-16
            rounded-lg flex justify-center items-center gap-10"
            >
              <img
                src="images/food-1.svg"
                alt="Simplicity"
                className="w-[15rem] h-[15rem] mx-auto border flex-1"
              />
              <p className="text-2xl tracking-tight text-center text-black flex-2 w-[60%]">
                "Skip the lines, avoid the crowds, and enjoy restaurant-quality food at home - our
                seamless ordering experience makes getting your favorite dishes easier than ever."
              </p>
            </div>

            <div
              className="border-2 w-[80%] bg-gray-100 text-white p-16 rounded-lg flex
            justify-center gap-10 items-center"
            >
              <p className="text-2xl tracking-tight text-center text-black w-[60%]">
                "With our food ordering app, you're never far from your next great meal - discover,
                order, and track with ease as we deliver your favorites directly to your door, hot
                and fresh."
              </p>
              <img
                src="images/food-2.svg"
                alt="Convenience"
                className="w-[15rem] h-[15rem] mx-auto border"
              />
            </div>

            <div
              className="border-2 w-[80%] bg-gray-100 text-white p-16 rounded-lg flex
            justify-center gap-10 items-center"
            >
              <img
                src="images/barb.svg"
                alt="Effortless"
                className="w-[15rem] h-[15rem] mx-auto border p-2"
              />
              <p className="text-2xl tracking-tight text-center text-black">
                "Why wait in line when your meal can find you? With our app, explore diverse menus,
                customize your orders, and enjoy timely delivery that's as convenient as it is
                delicious."
              </p>
            </div>
          </div>
        </section>

        {/* Hero 2 Section */}
        <section className="w-full flex justify-center">
          <div className="w-[90%] bg-gray-100 p-10 flex gap-14 rounded-2xl sm:flex-wrap md:flex-wrap justify-center align-middle">
            <div className="w-[40rem] gap-10 p-10">
              <img
                src="images/hero-2.jpg"
                alt="Dining Redefined"
                className="mt-16 rounded-full w-[40rem] h-[40rem] mx-auto sm:w-[25rem] sm:h-[25rem] text-center"
              />
              <Link to="/onboarding">
                <button className="mt-10 hover:text-white hover:bg-green-600 btn text-green-600 border-green-600 border-2 font-bold">
                  Get Started
                </button>
              </Link>
            </div>
            <div className="p-10 w-[40rem] flex flex-col justify-evenly gap-10">
              <p className="text-2xl w-[30rem] text-start">
                "Step beyond the usual with our innovative food ordering app—your ultimate{' '}
                <span className="text-green-600">passport</span> to a world of mouthwatering
                flavors, unique dishes, and hidden culinary gems right at your fingertips."
              </p>
              <p className="text-xl w-[30rem] text-start">
                "Customize every bite exactly to your taste, explore{' '}
                <span className="text-green-600">diverse</span> menus from local favorites and new
                hotspots, enjoy exclusive deals and offers, and track your order every step of the
                way."
              </p>
              <p className="text-lg w-[30rem] text-start">
                "No more long waits or bland meals—just a{' '}
                <span className="text-green-600">seamless</span>, exciting, and delicious dining
                experience delivered hot and fresh to your door every time."
              </p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="footer footer-center bg-gray-100 p-10 mt-36">
          <aside className='flex justify-between w-full'>
            <p className="font-bold text-4xl">
              Lunch<span className="text-green-600">tyme</span>
              <br />
            </p>
            {/** 
             *<p className="text-xl font-semibold">
              "Deliciousness Delivered Directly to Your Door."
            </p>
            */}

            <p>
              Copyright © {new Date().getFullYear()} -{' '}
            </p>
          </aside>
        </footer>
      </section>
    </>
  );
};

export default HomePage;
