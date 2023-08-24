import React from 'react'
import { useParams } from 'react-router-dom'

function BookedSlot() {

    const { slotNo, area, email } = useParams();

    return (
        <div className='bookedSlot text-white d-flex justify-content-center align-items-center flex-column'>
            <h1> This slot has been booked by : </h1>
            <div className="card text-center align-items-center" style={{ "width": "18rem", "height": "18rem", "background": "rgb(120, 113, 139)" }}>
                <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" alt='img' width="40" height="40" className="rounded-circle" />
                <div className="card">
                    <h5 className="card-title"> Slot No - {slotNo}</h5>
                    <h5 className="card-title"> Area - {area} </h5>
                    <h5 className="card-title"> Email - {email}</h5>
                </div>
            </div>
        </div>
    )
}

export default BookedSlot