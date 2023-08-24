import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";

const SlotRequest = () => {

    const { Area, slotNo, vehicleType, id } = useParams();

    const [userEmail, setUserEmail] = useState()
    const [userReqData, setUserReqData] = useState([{
        SlotNo: "",
        email: "",
        phone: "",
        vehicleNo: "",
    }])
    const [slotDuration, setDuration] = useState();
    const [durationPrice, setDurationPrice] = useState();
    const [isPaid, setIsPair] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        setUserEmail(user.email)
    }, [userReqData]);

    const userReqInput = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        setUserReqData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    }

    const payDurationPrice = (e) => {
        e.preventDefault();
        setIsPair(true)
    }

    async function sendUserRequest(e) {
        e.preventDefault();
        console.log(id);

        if (userReqData.SlotNo === slotNo) {
            const slotNo = userReqData.SlotNo;
            const email = userEmail;
            const phone = userReqData.phone;
            const vehicleNo = userReqData.vehicleNo;
            const duration = slotDuration;
            const isRequested = true;
            const month = new Date().getMonth()
            const date = `${new Date().getFullYear()}-${month < 10 ? ("0" + (month + 1)) : (month + 1)}-${new Date().getDate()}`

            if (duration > 0) {
                if (Area === "OFFICE" && vehicleType === "four") {
                    const checkSlotNo = await axios.put(`/api/user/updateOfficeParkingSlot/${id}`,
                        { slotNo, Area, email, phone, vehicleNo, date, isRequested, duration });
                    console.log(checkSlotNo);
                    window.location.href = "/booking";
                }
                else if (Area === "OFFICE" && vehicleType === "two") {
                    const checkSlotNo = await axios.put(`/api/user/updateOfficeTwoWheelerParkingSlot/${id}`,
                        { slotNo, Area, email, phone, vehicleNo, date, isRequested, duration });
                    console.log(checkSlotNo);
                    window.location.href = "/booking";
                }
                else if (Area === "MALL" && vehicleType === "two") {
                    const checkSlotNo = await axios.put(`/api/user/updateMallTwoWheelerParkingSlot/${id}`,
                        { slotNo, Area, email, phone, vehicleNo, date, isRequested, duration });
                    console.log(checkSlotNo);
                    window.location.href = "/booking";
                }
                else if (Area === "MALL" && vehicleType === "four") {
                    const checkSlotNo = await axios.put(`/api/user/updateMallParkingSlot/${id}`,
                        { slotNo, Area, email, phone, vehicleNo, date, isRequested, duration });
                    console.log(checkSlotNo);
                    window.location.href = "/booking";
                }
            } else {
                window.alert("Duration period should be greater than 0" + duration)
            }
        }
        else {
            window.alert("input slotNo and selected parking no should be same")
        }
    }


    return (
        <div className="request-container">
            <div className="request-container container-fluid px-1 py-5 mx-auto">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                        <h3>Request for slot</h3>
                        {/* <p className="blue-text">Just answer a few questions<br> so that we can personalize the right experience for you.</p> */}
                        <div className="card">
                            <h5 className="text-center mb-4"> Book Your Parking Slot By One Click</h5>
                            <form className="form-card" onsubmit="event.preventDefault()">
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3">
                                            Slot No
                                            <span className="text-danger"> *</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="slotno"
                                            name="SlotNo"
                                            value={userReqData.SlotNo}
                                            onChange={userReqInput}
                                            placeholder="Slot No"
                                            onblur="validate(1)"
                                            autoComplete='off'
                                        />
                                    </div>
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3">
                                            Duration in Hour
                                            <span className="text-danger"> *</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="duration"
                                            name="duration"
                                            value={slotDuration}
                                            onChange={(e) => {
                                                setDuration(e.target.value)
                                                vehicleType === "four" ? (
                                                    setDurationPrice(e.target.value * 100)
                                                ) : (
                                                    setDurationPrice(e.target.value * 50)
                                                )
                                                setIsPair(false)
                                            }

                                            }
                                            placeholder="Duration"
                                            onblur="validate(3)"
                                            autoComplete='off'
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3">
                                            Email
                                            <span className="text-danger"> *</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                            placeholder="Email"
                                            onblur="validate(3)"
                                            autoComplete='off'
                                        />
                                    </div>
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3">
                                            Phone number
                                            <span className="text-danger"> *</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            value={userReqData.phone}
                                            onChange={userReqInput}
                                            placeholder="Mobile No"
                                            onblur="validate(4)"
                                            autoComplete='off'
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-sm-6 flex-column d-flex">
                                    <label className="form-control-label px-3">
                                        Vehicle number
                                        <span className="text-danger"> *</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="vehicleNo"
                                        name="vehicleNo"
                                        value={userReqData.vehicleNo}
                                        onChange={userReqInput}
                                        placeholder="Vehicle No"
                                        onblur="validate(4)"
                                        autoComplete='off'
                                    />
                                </div>

                                <div className="row justify-content-end">
                                    <div className="form-group col-sm-6">
                                        {isPaid === false ?
                                            (
                                                <button type="submit" className="btn btn-danger"
                                                    onClick={payDurationPrice}
                                                >
                                                    Pay ₹{durationPrice}
                                                </button>
                                            )
                                            :
                                            (
                                                <button type="submit" className="btn btn-primary"
                                                    onClick={sendUserRequest}
                                                >
                                                    Request for Slot
                                                </button>
                                            )
                                        }
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

export default SlotRequest