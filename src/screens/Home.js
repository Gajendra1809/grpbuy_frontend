import Nav from '../components/Nav.js'
import ProductCard from '../components/ProductCard.js'
import React, { useState, useEffect } from 'react'

export default function Home() {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    let response = await fetch('https://grpbuy-backend.onrender.com/api/groups/groups', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      }
    });
    let data = await response.json();
    console.log(data)
    if (data.success) {
      setProducts(data.data);
      document.getElementById('loader').classList.add('hidden')
    }
  }

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      window.location.href = '/';
    }
    getProducts();
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
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

      <div className="flex w-full flex-col lg:flex-row my-20">
        <div className="card rounded-box grid h-32 flex-grow place-items-center my-10">
          <h1 className="text-5xl font-bold">Welcome to GrpBuy</h1>
          <h4>Buy things in group and get heavy discounts...</h4>
        </div>
      </div>
      <div className='' id='loader'>
        <section class="bg-white dark:bg-gray-900">
          <div class="container px-6 py-10 mx-auto animate-pulse">
            <h1 class="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

            <p class="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            <p class="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>

            <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>

              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>

              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>

              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>

              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>

              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>

              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>

              <div class="w-full ">
                <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10 justify-items-center">
        {
          products.map((product, index) => {
            return (
              <div className='col-12 col-md-4 '>
                <ProductCard key={index} product={product} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
