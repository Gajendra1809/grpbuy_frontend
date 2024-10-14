import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

export default function Login() {

    const [userData, setUserData] = useState({
        email: '', password: ''
    })

    const loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('https://grpbuy-backend.onrender.com/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        let data = await response.json()
        if (data.success) {
            document.getElementById('alert-1').classList.remove('hidden')
            document.getElementById('messageS').innerHTML = data.message
            setTimeout(() => {
                document.getElementById('alert-1').classList.add('hidden')
            }, 3000)
            localStorage.setItem('authToken', data.data.token)
            localStorage.setItem('user', JSON.stringify(data.data.user));
            window.location.href = '/home'
        } else {
            document.getElementById('alert-2').classList.remove('hidden')
            document.getElementById('messageE').innerHTML = data.error
            setTimeout(() => {
                document.getElementById('alert-2').classList.add('hidden')
            }, 3000)
        }
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
                <div class="my-20 flex items-center justify-center w-full dark:bg-gray-950">
                    <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                        <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome Back!</h1>
                        <form onSubmit={loginUser}>
                            <div class="mb-4">
                                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                <input type="email" id="email" name="email" value={userData.email} onChange={onChangeHandler} class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required />
                            </div>
                            <div class="mb-4">
                                <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                                <input type="password" id="password" name="password" value={userData.password} onChange={onChangeHandler} class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />
                                <a href="#"
                                    class="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
                                    Password?</a>
                            </div>
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center">
                                    <input type="checkbox" id="remember" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" checked />
                                    <label for="remember" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">Remember me</label>
                                </div>
                                <Link to="/register"
                                    class="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create
                                    Account</Link>
                            </div>
                            <button type="submit" class="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
