import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../components/Nav'
import BidFormPopup from '../components/popup/BidFormPopup'

export default function Details() {

    const { groupId } = useParams();
    const [product, setProduct] = useState({});
    const [bids, setBids] = useState([]);
    const [flag, setFlag] = useState(false);
    const [openBidForm, setOpenBidForm] = useState(false);

    const getProduct = async () => {
        let response = await fetch(`https://grpbuy-backend.onrender.com/api/groups/groups/${groupId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        let data = await response.json();
        console.log(data)
        if (data.success) {
            setProduct(data.data);
            if (data.data.openToBid) {
                getBids();
            }
        }
    }

    const getBids = async () => {
        let response = await fetch(`https://grpbuy-backend.onrender.com/api/bids/bids/${groupId}`, {
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

    const applyToGroup = async () => {
        let response = await fetch(`https://grpbuy-backend.onrender.com/api/groups/groups/apply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify({ groupId: groupId })
        });
        let data = await response.json();
        setFlag(!flag);
        if (data.success) {
            document.getElementById('alert-1').classList.remove('hidden')
            document.getElementById('messageS').innerHTML = data.message
            setTimeout(() => {
                document.getElementById('alert-1').classList.add('hidden')
            }, 3000)
        } else {
            document.getElementById('alert-2').classList.remove('hidden')
            document.getElementById('messageE').innerHTML = data.error
            setTimeout(() => {
                document.getElementById('alert-2').classList.add('hidden')
            }, 3000)
        }
    }

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            window.location.href = '/';
        }
        getProduct();
        getBids();
    }, [flag])

    return (
        <div>
            <div className="sticky top-0">
                <Nav />
            </div>

            <div>
                <style>@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);</style>
                <div class="min-w-screen min-h-screen bg-yellow-300 flex items-center p-5 lg:p-10">

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
                    <div class="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                        <div class="md:flex items-center -mx-10">
                            <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                                <div class="relative">
                                    <img src={product.imageUrl} class="w-full relative z-10" alt="product image" />
                                    <div class="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2 px-10">
                                <div class="mb-10">
                                    <h1 class="font-bold uppercase text-2xl mb-5">{product.name}</h1>
                                    <p class="text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos, voluptatum dolorum! Laborum blanditiis consequatur, voluptates, sint enim fugiat saepe, dolor fugit, magnam explicabo eaque quas id quo porro dolorum facilis... <a href="#" class="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE <i class="mdi mdi-arrow-right"></i></a></p>
                                </div>
                                <div>
                                    <div class="inline-block align-bottom mr-5">
                                        <span class="text-2xl leading-none align-baseline">Buyer Count: </span>
                                        <span class="font-bold text-5xl leading-none align-baseline">{product.countBuyer}</span>
                                    </div>
                                    <div class="inline-block align-bottom">
                                        <button onClick={applyToGroup} class="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"><i class="mdi mdi-cart -ml-2 mr-2"></i>Apply </button>
                                    </div>
                                </div>
                                <div>
                                    <div class="inline-block align-bottom mr-5">
                                        <span class="text-2xl leading-none align-baseline">Min Count: </span>
                                        <span class="font-bold text-5xl leading-none align-baseline">{product.minCount}</span>
                                    </div>
                                </div>
                                <div class="mt-10">
                                    {
                                        product.openToBid ?
                                            <div>
                                                <div className="badge badge-outline">Open to Bid</div>
                                                <button onClick={() => setOpenBidForm(true)} className='btn btn-primary mx-2'>Put a Bid</button>
                                            </div>
                                            : <div>Not Open to Bid until buyer count reaches minimum count!</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead className="sticky top-0 bg-white">
                                    <tr>
                                        <th>Name</th>
                                        <th>Details</th>
                                        <th>Bid amount per unit</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            </table>
                            <div className="max-h-100 overflow-y-auto">
                                <table className="table ">
                                    <tbody>
                                        {/* row 1 */}
                                        {
                                            bids.length ?
                                                bids.map((bid) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="avatar">
                                                                        <div className="mask mask-squircle h-12 w-12">
                                                                            <img
                                                                                src={bid.bidderId.imageUrl}
                                                                                alt="Avatar Tailwind CSS Component" />
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-bold">{bid.bidderId.name}</div>
                                                                        <div className="text-sm opacity-50">India</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {bid.other}
                                                            </td>
                                                            <th>
                                                                <button className="btn btn-ghost btn-xs">{bid.bidAmountPerUnit}</button>
                                                            </th>
                                                        </tr>
                                                    )
                                                }) : <div className='text-center text-xl mt-10'>No Bids yet...</div>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {
                openBidForm ? <BidFormPopup closepop={() => setOpenBidForm(false)} groupId={groupId} /> : <div></div>
            }
        </div>
    )
}
