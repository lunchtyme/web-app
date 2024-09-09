import React from 'react'
import { useNavigate } from 'react-router-dom'
const AdminForm = () => {
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
  }
  return (
   <>
   <div className="p-5 flex justify-evenly">
        <h2 className="text-2xl font-semibold">
          launch<span className="text-green-600">tyme</span>
        </h2>
        <button 
        onClick={handleGoBack}
        className='btn text-white bg-green-600 text-lg w-[8rem]'>Back</button>
      </div>

      <div className="p-5">
        <h2 className="text-3xl font-semibold">
          Sign up as a <span className="text-green-700">Administrator</span>
        </h2>
      </div>

      <section className="w-full flex justify-evenly flex-wrap mb-20">
        {/* Image */}
        <div className="w-[30rem] h-auto mt-24 pt-24">
          <img src="/images/onboarding.svg" alt="Form Illustration" />
        </div>

        {/* Form */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Account Type</span>
              </label>
              <input
                type="text"
                placeholder="eg.. Company"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">First Name</span>
              </label>
              <input
                type="text"
                placeholder="first name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="last name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Dial code</span>
              </label>
              <input
                type="text"
                placeholder="eg.. +1"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Phone Number</span>
              </label>
              <input
                type="text"
                placeholder="last name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn text-white bg-green-600 text-xl">Login</button>
            </div>
          </form>
        </div>
      </section>
   </>
  )
}

export default AdminForm