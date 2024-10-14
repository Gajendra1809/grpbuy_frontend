import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav.js'

export default function CreateGrp() {

  const [grpData, setGrpData] = useState({
    name: '',
    categoryId: null,
    minCount: '',
    imageUrl: ''
  })
  const [categories, setCategories] = useState([])
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

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

  const getCategories = async () => {
    let response = await fetch('https://grpbuy-backend.onrender.com/api/categories/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      }
    })
    let data = await response.json();
    if (data.success) {
      setCategories(data.data)
    }
  }

  const createGroup = async (e) => {
    document.getElementById('loader').classList.remove('hidden')
    e.preventDefault();
    setTimeout(() => {

    }, 2000)
    const imageUrl = await uploadImage(e)
    const finalGrpData = { ...grpData, imageUrl: imageUrl };
    const response = await fetch('https://grpbuy-backend.onrender.com/api/groups/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      },
      body: JSON.stringify(finalGrpData)
    })
    const data = await response.json();
    console.log(data)
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
  }

  const onChangeHandler = (e) => {
    setGrpData({
      ...grpData, [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      window.location.href = '/'
    }
    getCategories()
  }, [])

  return (
    <div>
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

      <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div class="max-w-md mx-auto">
              <form onSubmit={createGroup}>
                <div class="flex items-center space-x-5">
                  <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">GrpBuy</div>
                  <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 class="leading-relaxed">Create a Group</h2>
                    <p class="text-sm text-gray-500 font-normal leading-relaxed">Note: Only Admins can create groups</p>
                  </div>
                </div>
                <div class="divide-y divide-gray-200">
                  <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div class="flex flex-col">
                      <label class="leading-loose">Product Title</label>
                      <input type="text" name='name' onChange={onChangeHandler} class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Event title" />
                    </div>

                    <div class="flex flex-col">
                      <label class="leading-loose">Product Image</label>
                      <input type="file" name='image' onChange={(e) => setImage(e.target.files[0])} class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Event title" />
                    </div>
                    <div class="flex flex-col">
                      <label class="leading-loose">Select Category</label>
                      <select name="categoryId" id="" onChange={onChangeHandler} class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option value={category._id}>{category.name}</option>
                        ))}
                      </select>
                    </div>

                    <div class="flex flex-col">
                      <label class="leading-loose">Minimum Product Count</label>
                      <input type="text" name='minCount' onChange={onChangeHandler} class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Min count..." />
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
                  <div class="pt-4 flex items-center space-x-4">
                    <button type="submit" class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Create</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
