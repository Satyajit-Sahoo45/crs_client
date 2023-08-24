import React from "react";
import Header from "./Header"
import Footer from './FooterSection'


const Dashboard = () => {
    return (
        <>
            <Header />

            <div className="dashboard-container d-flex justify-content-center align-items-center">
                <div className="container d-flex justify-content-center align-items-center">
                    <div>
                        <h2> Hii, Join us to book your parking slot quikly</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis cum optio dolorum? Ab iste a autem dolorem dolore molestiae omnis.</p>

                        <button type="button" className="btn btn-light m-2">Contact Us</button>
                        <button type="button" className="btn btn-info m-2">
                            <a href="/booking" className="nav-link">
                                Start Booking
                            </a>
                        </button>
                    </div>

                    <div>
                        <img className="home-img" src="https://mediaservice.audi.com/media/live/50710/fly1400x601n1/f83rj7/2023.png?wid=850" alt="car img" />
                    </div>
                </div>
            </div>

            <Footer />
        </>

    )
}

export default Dashboard;