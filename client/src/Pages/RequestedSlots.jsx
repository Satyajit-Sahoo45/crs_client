import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios';

function RequestedSlots() {

    const [parkingArea, setParkingArea] = useState("MALL");
    const [requestedSlots, setRequestedSlots] = useState([])
    const [email, setEmail] = useState();
    const [vehicleType, setVehicleType] = useState("two");

    const parkingInput = (e) => {
        e.preventDefault();

        setParkingArea(e.target.value);
        console.log(parkingArea);
    }

    const vehicleTypeInput = (e) => {
        e.preventDefault();
        setVehicleType(e.target.value);
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) {
            setEmail(user.email)
        }
    }, []);


    useEffect(() => {
        async function fetchData() {

            if (parkingArea === "OFFICE" && vehicleType === "four") {
                const req = await axios.get(`api/user/officeRequestedSlots/${email}`,)

                setRequestedSlots(req.data);
            }
            else if (parkingArea === "OFFICE" && vehicleType === "two") {
                const req = await axios.get(`api/user/officeTwoWheelerRequestedSlots/${email}`,)

                setRequestedSlots(req.data);
            }
            else if (parkingArea === "MALL" && vehicleType === "two") {
                const req = await axios.get(`api/user/mallTwoWheelerRequestedSlots/${email}`,)

                setRequestedSlots(req.data);
            }
            else if (parkingArea === "MALL" && vehicleType === "four") {
                const req = await axios.get(`api/user/mallRequestedSlots/${email}`,)

                setRequestedSlots(req.data);
            }
        }

        fetchData()
    }, [parkingArea, vehicleType])


    return (
        <>
            <Header />

            <div className=" container-fluid booking-container text-center p-4">
                <section id="minimal-statistics">
                    <div className="row">
                        <div className="col-12 mt-3 mb-1">
                            <h4 className="text-uppercase">Requested slot</h4>
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
                        {requestedSlots.map((data, index) => {
                            return (
                                <div className="col-xl-3">
                                    <div className="card" key={index}>
                                        <div className="card-content">
                                            <div className="d-flex">
                                                <div className="align-self-center">
                                                    <i className="fa-solid fa-square-parking parking-icon"></i>
                                                    <p>Slot: {data.slotNo}</p>
                                                    <p>email: {data.email}</p>
                                                    <p>Area: {data.Area}</p>
                                                    {data.isParked === false ?
                                                        <button className="btn btn-info">Requested</button>
                                                        :
                                                        <button className="btn btn-primary">Booked</button>
                                                    }
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
        </>
    )
}

export default RequestedSlots