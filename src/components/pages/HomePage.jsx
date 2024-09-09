import React from 'react';
import { Link,useNavigate} from 'react-router-dom';

const HomePage = () => {
  // Sign-in function (currently not implemented)
  const signIn = () => {};
  const navigate = useNavigate();
  const handleNewPage = () => {
    navigate('/login');
  }
  return (
    <>
      {/* Navigation */}
      <nav className="p-5 w-[90%] flex justify-around mx-auto align-middle">
        <h2 className="text-4xl font-bold">
          launch<span className="text-green-600">tyme</span>
        </h2>
        <div className='flex gap-10 '>
        <Link to="/signup">
          <button className="btn text-white bg-green-600 text-lg w-[11rem] text-center">
            Get started
          </button>
        </Link>
          <button
          onClick={handleNewPage}
          className="btn text-white bg-green-600 text-lg w-[8rem] text-center">
            Log in
          </button>
        </div>
      
      </nav>

      {/* Hero Section */}
      <section className="bg-cover bg-center bg-no-repeat bg-[url('/images/food.jpg')] w-[80%] h-screen mx-auto rounded-2xl mb-10">
        <main className="flex p-10 justify-between flex-wrap">
          <div>
            <p className="font-bold text-7xl w-[30rem] text-white font-[lyon-text]">Lunch For Your Teams</p>
          </div>
          <div className="w-[40rem]"></div>
        </main>
      </section>

      {/* Menu Section */}
      <section className="w-full p-14 mb-24">
        <div className="w-full">
          <h2 className="text-center text-4xl font-semibold">
            Our <span className="text-green-600">Offers</span>
          </h2>
        </div>

        {/* Catalogue */}
        <div className="w-full flex justify-evenly flex-wrap gap-10 mt-10">
          <div className="border-2 hover:translate-y-5 transition cursor-pointer w-[25rem] bg-gray-100 text-white p-7 rounded-lg flex flex-col justify-center gap-10">
            <img
              src="images/food-1.svg"
              alt="Simplicity"
              className="w-[7rem] h-[7rem] mx-auto rounded-full border"
            />
            <h2 className="text-center text-3xl font-semibold text-green-600">Simplicity</h2>
            <p className="text-xl font-semibold text-center text-black">
              "Skip the lines, avoid the crowds, and enjoy restaurant-quality food at home - our
              seamless ordering experience makes getting your favorite dishes easier than ever."
            </p>
          </div>

          <div className="border-2 hover:translate-y-5 transition cursor-pointer w-[25rem] bg-gray-100 text-white p-7 rounded-lg flex flex-col justify-center gap-10">
            <img
              src="images/food-2.svg"
              alt="Convenience"
              className="w-[7rem] h-[7rem] mx-auto rounded-full border p-1"
            />
            <h2 className="text-center text-3xl font-semibold text-green-600">Convenience</h2>
            <p className="text-xl font-semibold text-center text-black">
              "With our food ordering app, you're never far from your next great meal - discover,
              order, and track with ease as we deliver your favorites directly to your door, hot and
              fresh."
            </p>
          </div>

          <div className="border-2 hover:translate-y-5 transition cursor-pointer w-[25rem] bg-gray-100 text-white p-7 rounded-lg flex flex-col justify-center gap-10">
            <img
              src="images/barb.svg"
              alt="Effortless"
              className="w-[7rem] h-[7rem] mx-auto border p-2 rounded-full"
            />
            <h2 className="text-center text-3xl font-semibold text-green-600">Effortless</h2>
            <p className="text-xl font-semibold text-center text-black">
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
            <h2 className="text-5xl font-semibold text-start">
              Dining <span className="text-green-600">Redefined</span>.
            </h2>
            <p className="text-2xl font-semibold w-[30rem] text-start">
              "Step beyond the usual with our innovative food ordering app—your ultimate{' '}
              <span className="text-green-600">passport</span> to a world of mouthwatering flavors,
              unique dishes, and hidden culinary gems right at your fingertips."
            </p>
            <p className="text-xl font-semibold w-[30rem] text-start">
              "Customize every bite exactly to your taste, explore{' '}
              <span className="text-green-600">diverse</span> menus from local favorites and new
              hotspots, enjoy exclusive deals and offers, and track your order every step of the
              way."
            </p>
            <p className="text-lg font-semibold w-[30rem] text-start">
              "No more long waits or bland meals—just a{' '}
              <span className="text-green-600">seamless</span>, exciting, and delicious dining
              experience delivered hot and fresh to your door every time."
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer footer-center bg-gray-100 p-10 mt-36">
        <aside>
          <p className="font-bold text-4xl">
            launch<span className="text-green-600">tyme</span>
            <br />
          </p>
          <p className="text-xl font-semibold">"Deliciousness Delivered Directly to Your Door."</p>
          <p>
            Copyright © {new Date().getFullYear()} -{' '}
            <span className="font-semibold">
              launch<span className="text-green-600">tyme</span>
            </span>
          </p>
        </aside>
      </footer>
    </>
  );
};

export default HomePage;
