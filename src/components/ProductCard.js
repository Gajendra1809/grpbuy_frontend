import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard(props) {
    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-xl mx-10">
                <figure>
                    <img
                        src={props.product.imageUrl? props.product.imageUrl : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                        alt="Shoes"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {props.product.name}
                        {
                            props.product.openToBid ? <div className="badge badge-secondary">Open to Bid</div> : <div></div>
                        }
                    </h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline hover:bg-blue-500 hover:text-white"><Link to={`/details/${props.product._id}`}>Details</Link>&nbsp;&nbsp;<i class="fa fa-external-link" aria-hidden="true"></i></div>
                        <div className="badge badge-outline">Buyer Count: {props.product.countBuyer}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
