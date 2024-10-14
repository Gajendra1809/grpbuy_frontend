import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom';

export default function Mygrps() {

    const [groups, setGroups] = useState([]);
    const [bids, setBids] = useState([]);

    const getGroups = async () => {
        let response = await fetch('https://grpbuy-backend.onrender.com/api/groups/groups/applied', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        let data = await response.json();
        console.log(data)
        if (data.success) {
            setGroups(data.data);
        }
    }

    const cancelApplication = async (id) => {
        let response = await fetch(`https://grpbuy-backend.onrender.com/api/groups/groups/cancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify({ groupId: id })
        });
        let data = await response.json();
        console.log(data)
        if (data.success) {
            document.getElementById('alert-1').classList.remove('hidden')
            document.getElementById('messageS').innerHTML = data.message
            setTimeout(() => {
                document.getElementById('alert-1').classList.add('hidden')
                getGroups();
            }, 3000)
        } else {
            document.getElementById('alert-2').classList.remove('hidden')
            document.getElementById('messageE').innerHTML = data.error
            setTimeout(() => {
                document.getElementById('alert-2').classList.add('hidden')
            }, 3000)
        }
    }

    const cancelBid = async (id) => {
        let response = await fetch(`https://grpbuy-backend.onrender.com/api/bids/bids/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        let data = await response.json();
        console.log(data)
        if (data.success) {
            document.getElementById('alert-1').classList.remove('hidden')
            document.getElementById('messageS').innerHTML = data.message
            setTimeout(() => {
                document.getElementById('alert-1').classList.add('hidden')
                getBids();
            }, 3000)
        } else {
            document.getElementById('alert-2').classList.remove('hidden')
            document.getElementById('messageE').innerHTML = data.error
            setTimeout(() => {
                document.getElementById('alert-2').classList.add('hidden')
            }, 3000)
        }
    }

    const getBids = async () => {
        let response = await fetch('https://grpbuy-backend.onrender.com/api/bids/bids/applied', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        let data = await response.json();
        console.log(data)
        if (data.success) {
            setBids(data.data);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            window.location.href = '/';
        }
        getGroups();
        getBids();
    }, [])
    return (
        <div>
            <Nav />
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
                <div className="flex w-full mt-5">
                    <div className="card bg-base-300 rounded-box grid h-full flex-grow place-items-center">

                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
                            <h1 className='text-2xl font-bold'>Groups you belong to...</h1>
                            <div className="overflow-x-auto overflow-y-auto max-h-128 mb-10">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-10">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-16 py-3">
                                                <span className="">Image</span>
                                            </th>
                                            <th scope="col" className="px-6 py-3">Product</th>
                                            <th scope="col" className="px-6 py-3">Price</th>
                                            <th scope="col" className="px-6 py-3">
                                                <span className="">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groups.length ? groups.map((group) => {
                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={group.id}>
                                                    <td className="p-4">
                                                        <img src={group.imageUrl} className="w-16 md:w-32 max-w-full max-h-full" alt="product image" />
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                        <Link to={`/details/${group._id}`}>{group.name}</Link>&nbsp;&nbsp;<i class="fa fa-external-link" aria-hidden="true"></i><br />
                                                        {group.openToBid ? <div className="badge badge-primary">Bidding started...</div> : <div></div>}
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                        $599
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button onClick={() => cancelApplication(group._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                                                    </td>
                                                </tr>
                                            )
                                        }) : <div className="text-center mt-10">No groups found...</div>}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <div className="divider divider-horizontal">OR</div>
                    <div className="card bg-base-300 rounded-box grid h-full flex-grow place-items-center">

                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg max-h-128 mt-20">
                            <h1 className='text-2xl font-bold'>Products you have bidded to...</h1>
                            <div className="overflow-x-auto overflow-y-auto max-h-128 mb-10">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-10">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-16 py-3">
                                                <span className="">Image</span>
                                            </th>
                                            <th scope="col" className="px-6 py-3">Product</th>
                                            <th scope="col" className="px-6 py-3">Price/Unit</th>
                                            <th scope="col" className="px-6 py-3">
                                                <span className="">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bids.length ? bids.map((bid) => {
                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={bid.id}>
                                                    <td className="p-4">
                                                    <img src={bid.groupId.imageUrl} className="w-16 md:w-32 max-w-full max-h-full" alt="product image" />
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                        {bid.groupId.name}
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                        Rs.{bid.bidAmountPerUnit}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button onClick={() => cancelBid(bid._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove Bid</button>
                                                    </td>
                                                </tr>
                                            )
                                        }) : <div className='text-center mt-10'>No bids found...</div>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

