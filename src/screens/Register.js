import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'


export default function Register() {

  const [userData, setUserData] = useState({
    name: '', email: '', password: '', role: 'buyer', imageUrl: ''
  })
  const [image, setImage] = useState(null)

  const uploadImage = async (e) => {
    console.log(image)
    e.preventDefault();
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: data
    })
    const file = await res.json()
    return file.secure_url;
  }

  const registerUser = async (e) => {
    document.getElementById('loader').classList.remove('hidden')
    e.preventDefault()
    const imageUrl = await uploadImage(e)
    const finalUserData = { ...userData, imageUrl: imageUrl };
    console.log(finalUserData.imageUrl)
    let response = await fetch('https://grpbuy-backend.onrender.com/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(finalUserData)
    })
    let data = await response.json()
    if (data.success) {
      document.getElementById('loader').classList.add('hidden')
      document.getElementById('alert-1').classList.remove('hidden')
      document.getElementById('messageS').innerHTML = data.message
      setTimeout(() => {
        document.getElementById('alert-1').classList.add('hidden')
      }, 3000)
    } else {
      document.getElementById('loader').classList.add('hidden')
      document.getElementById('alert-2').classList.remove('hidden')
      document.getElementById('messageE').innerHTML = data.error
      setTimeout(() => {
        document.getElementById('alert-2').classList.add('hidden')
      }, 3000)
    }
    console.log(data)
  }

  const onChangeHandler = (e) => {
    setUserData({
      ...userData, [e.target.name]: e.target.value
    })
  }
  return (
    <div className="bg-gray-100 h-screen">
      <div className="sticky top-0">
        <Nav />
      </div>

      {/* Alert Messages */}

      <div class="max-w-lg fixed top-5 right-5 z-50 mt-20">
        <div class="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700 hidden" role="alert" id='alert-2'>
          <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          <div>
            <span class="font-medium" id='messageE'>Danger alert!</span>
          </div>
        </div>
        <div class="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700 hidden" role="alert" id='alert-1'>
          <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          <div>
            <span class="font-medium" id='messageS'>Success alert!</span>
          </div>
        </div>
      </div>

      <div>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
              rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
              integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
              crossorigin="anonymous"
            />
          </head>
          <body className='bg-grey-100'>
            <div
              class="flex flex-col items-center justify-center"
            >
              <div
                class="
          flex flex-col
          bg-white
          shadow-md
          lg:px-10
          py-8
          px-8
          rounded-2xl
          w-50
          max-w-md
          my-20
        "
              >
                <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
                  Join us Now
                </div>
                <div class="mt-4 self-center text-xl sm:text-sm text-gray-800">
                  Enter your credentials to get access account
                </div>

                <div class="mt-10">
                  <form onSubmit={registerUser}>
                    <div class="flex flex-col mb-5">
                      <label
                        for="name"
                        class="mb-1 text-xs tracking-wide text-gray-600"
                      >Name:</label
                      >
                      <div class="relative">
                        <div
                          class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                          <i class="fas fa-user text-blue-500"></i>
                        </div>

                        <input
                          id="name"
                          type="name"
                          name="name"
                          value={userData.name}
                          onChange={onChangeHandler}
                          required
                          class="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                    <div class="flex flex-col mb-5">
                      <label
                        for="image"
                        class="mb-1 text-xs tracking-wide text-gray-600"
                      >Upload your Image:</label
                      >
                      <div class="relative">
                        <div
                          class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                          <i class="fas fa-user text-blue-500"></i>
                        </div>

                        <input
                          id=""
                          type="file"
                          name=""
                          onChange={(event) => setImage(event.target.files[0])}
                          required
                          class="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                    <div class="flex flex-col mb-5">
                      <label
                        for="email"
                        class="mb-1 text-xs tracking-wide text-gray-600"
                      >E-Mail Address:</label
                      >
                      <div class="relative">
                        <div
                          class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                          <i class="fas fa-at text-blue-500"></i>
                        </div>

                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={onChangeHandler}
                          required
                          class="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <div class="flex flex-col mb-6">
                      <label
                        for="password"
                        class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                      >Password:</label
                      >
                      <div class="relative">
                        <div
                          class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                          <span>
                            <i class="fas fa-lock text-blue-500"></i>
                          </span>
                        </div>

                        <input
                          id="password"
                          type="password"
                          name="password"
                          value={userData.password}
                          onChange={onChangeHandler}
                          required
                          class="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>

                    <div class="flex flex-col mb-6">
                      <label
                        for="role"
                        class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                      >Select Role:</label
                      >
                      <div class="relative">
                        <div
                          class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                        </div>

                        <select className="select" name='role' onChange={onChangeHandler}>
                          <option disabled selected>Pick one</option>
                          <option value={'buyer'}>Buyer</option>
                          <option value={'bidder'}>Bidder</option>
                        </select>
                      </div>
                    </div>

                    <div className='flex justify-center hidden' id='loader'>
                    <button disabled="" type="button" class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                      <svg aria-hidden="true" role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                      </svg>
                      Creating...
                    </button>
                  </div>

                    <div class="flex w-full">
                      <button
                        type="submit"
                        class="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
                      >
                        <span class="mr-2 uppercase">Sign Up</span>
                        <span>
                          <svg
                            class="h-6 w-6"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="flex justify-center items-center mt-6">
                <a
                  href="#"
                  target="_blank"
                  class="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          "
                >
                  <span class="ml-2"
                  >You have an account?
                    <Link
                      to="/"
                      class="text-xs ml-2 text-blue-500 font-semibold"
                    >Login here</Link
                    ></span
                  >
                </a>
              </div>
            </div>
          </body>
        </html>
      </div>
    </div>
  )
}
