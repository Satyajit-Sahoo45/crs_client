import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Header from "./Header"


const Booking = () => {

    const [parkingArea, setParkingArea] = useState("MALL");
    const [vehicleType, setVehicleType] = useState("two");
    const [slots, setSlots] = useState([])

    const parkingInput = (e) => {
        e.preventDefault();

        setParkingArea(e.target.value);
    }

    const vehicleTypeInput = (e) => {
        e.preventDefault();
        setVehicleType(e.target.value);
    }

    useEffect(() => {

        async function fetchData() {

            if (parkingArea === "OFFICE" && vehicleType === "four") {
                const req = await axios.get(`api/user/getOfficeParkingSlots`)

                setSlots(req.data);
            } else if (parkingArea === "OFFICE" && vehicleType === "two") {
                const req = await axios.get(`api/user/getOfficeTwoWheelerParkingSlots`)

                setSlots(req.data);
            }
            else if (parkingArea === "MALL" && vehicleType === "four") {
                const req = await axios.get(`api/user/getMallParkingSlots`)

                setSlots(req.data);
            }
            else if (parkingArea === "MALL" && vehicleType === "two") {
                const req = await axios.get(`api/user/getMallTwoWheelerParkingSlots`)

                setSlots(req.data);
            }
        }

        fetchData()
    }, [parkingArea, vehicleType])



    return (
        <>
            <Header />
            <div className="booking-container text-center p-4">
                <div className=" container-fluid">
                    <section id="minimal-statistics">
                        <div className="row">
                            <div className="col-12 mt-3 mb-1">
                                <h4 className="text-uppercase">Check Parking Slot</h4>
                                <p> <i className="fa-solid fa-square-parking"></i>  -  Availabel</p>
                            </div>
                        </div>

                        <div className="row justify-content-between text-left">
                            <div className="form-group col-sm-6 flex-column d-flex">
                                <label className="form-control-label px-3 text-white">
                                    Select Location
                                    <span className="text-danger"> *</span>
                                </label>
                                <select className="form-select"
                                    value={parkingArea}
                                    onChange={parkingInput}
                                >
                                    <option value="MALL">Mall</option>
                                    <option value="OFFICE">Office</option>
                                </select>
                            </div>
                            <div class="form-group col-sm-6 flex-column d-flex">
                                <label className="form-control-label px-3 text-white">
                                    Vechicle Type
                                    <span className="text-danger"> *</span>
                                </label>
                                <select className="form-select"
                                    value={vehicleType}
                                    onChange={vehicleTypeInput}
                                >
                                    <option value="two">Two Wheeler</option>
                                    <option value="four">Four Wheeler</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            {slots.map((data, index) => {
                                return (
                                    <div className="col-xl-2" key={index}>
                                        <div className={data.isParked === true ? "non_point card" : "pointer card"} onClick={() => window.location.href = `/slotRequest/${data.Area}/${data.slotNo}/${vehicleType}/${data._id}`}>
                                            <div className="card-content">
                                                <div className="d-flex">
                                                    <div className="align-self-center">
                                                        <p>Area: {data.Area}</p>
                                                        <i className="fa-solid fa-square-parking parking-icon"></i>
                                                        <p> SLOT: {data.slotNo}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Booking