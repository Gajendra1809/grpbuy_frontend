import React, { useState } from 'react'
import "./popup.css"

export default function BidFormPopup({ closepop, groupId }) {

    const [bidData, setBidData] = useState({
        bidAmountPerUnit: '',
        other: '',
        groupId: groupId
    })

    const createBid = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:4000/api/bids/bids', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify(bidData)
        });
        let data = await response.json();
        if (data.success) {
            document.getElementById('alert-1').classList.remove('hidden')
            document.getElementById('messageS').innerHTML = data.message
            setTimeout(() => {
                document.getElementById('alert-1').classList.add('hidden')
                closepop()
            }, 3000)
        } else {
            document.getElementById('alert-2').classList.remove('hidden')
            document.getElementById('messageE').innerHTML = data.error
            setTimeout(() => {
                document.getElementById('alert-2').classList.add('hidden')
            }, 3000)
        }
    }
console.log(bidData)
    const onChangeHandler = (e) => {
        setBidData({
            ...bidData, [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            {/* Success Messages */}
            <div className="hidden z-10" id="alert-1">
                <div role="alert" className="alert alert-success shadow-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span id='messageS'></span>
                </div>
            </div>

            {/* Error Messages */}
            <div className="hidden z-10" id="alert-2">
                <div role="alert" className="alert alert-error shadow-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span id='messageE'></span>
                </div>
            </div>
            <div className="popup-container flex justify-center items-center">
                <div className="popup-body"><br />
                    <h1>Fill Bid details here...</h1>&nbsp;
                    <form>
                        <div>
                            <label className="input input-bordered flex items-center gap-2 mt-5">
                                Enter your Bid Amount per unit:
                                <input type="text" name="bidAmountPerUnit" onChange={onChangeHandler} className="grow" placeholder="Enter here..." />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 mt-5">
                                Enter some details you would like to add:
                                <input type="text" name="other" onChange={onChangeHandler} className="grow" placeholder="Enter here..." />
                            </label>
                            <button onClick={closepop} className='btn btn-danger mt-5 ml-20'>Cancel</button>
                            <button onClick={createBid} className='btn btn-primary mt-5 ml-5'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
