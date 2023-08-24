const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require("../config/generateToken");
const mallParkModel = require('../models/mallCarParkingModel');
const officeParkModel = require('../models/officeCarParkingModel');
const officeBikeModel = require('../models/officeBikeParkingModel')
const mallBikeModel = require('../models/mallBikeParkingModel')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        console.log("User Already Exists");
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create user");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

// /api/user?search=satya
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } }
            ],
        }
        : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
})

const parkingSlot = asyncHandler(async (req, res) => {

    const { slotNo, Area, isParked, email, phone } = req.body;

    // const user = await User.findOne({ email });

    const createdSlot = await Parking.create({
        slotNo,
        Area,
        isParked,
        email,
        phone
    });

    if (createdSlot) {
        res.status(201).json({
            slotNo: createdSlot.slotNo,
            Area: createdSlot.Area,
            isParked: createdSlot.isParked,
            email: email,
            phone: createdSlot.phone
        })
    } else {
        res.status(401);
        throw new Error("parking slot can't create!");
    }
});

const fetchBooking = asyncHandler(async (req, res) => {

    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error("Please Enter the email field to get data");
    }

    const userBookingExits = await Parking.findOne({ email })

    if (userBookingExits) {
        res.status(201).json({
            email: userBookingExits.email,
            slotNo: userBookingExits.slotNo,
            Area: userBookingExits.Area,
            isParked: userBookingExits.isParked

        })
    } else {
        res.status(401);
        throw new Error("Couldn't fetch the parking data")
    }
});

const fetchMallSlots = asyncHandler(async (req, res) => {
    const slots = await mallParkModel.find();

    if (slots) {
        res.status(201).json(slots)
    }
    else {
        res.status(401)
        throw new Error("couldn't fetch slots")
    }
});

const fetchOfficeSlots = asyncHandler(async (req, res) => {
    const slots = await officeParkModel.find();

    if (slots) {
        res.status(201).json(slots)
        console.log(slots);
    }
    else {
        res.status(401)
        throw new Error("couldn't fetch slots")
    }
});

const fetchOfficeTwoWheelerSlots = asyncHandler(async (req, res) => {
    const slots = await officeBikeModel.find();

    if (slots) {
        res.status(201).json(slots)
    }
    else {
        res.status(401)
        throw new Error("couldn't fetch slots")
    }
});

const fetchMallTwoWheelerSlots = asyncHandler(async (req, res) => {
    const slots = await mallBikeModel.find();

    if (slots) {
        res.status(201).json(slots)
    }
    else {
        res.status(401)
        throw new Error("couldn't fetch slots")
    }
});

const updateOfficeParkingSlot = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { slotNo, Area, email, phone, vehicleNo, isRequested, duration } = req.body;
    console.log(req.body);

    const updatedSlot = await officeParkModel.findByIdAndUpdate(
        id,
        {
            slotNo: slotNo,
            Area: Area,
            email: email,
            vehicleNo: vehicleNo,
            phone: phone,
            isRequested: isRequested,
            duration: duration
        },
        {
            new: true
        }
    );

    if (!updatedSlot) {
        res.status(404)
        throw new Error("Slot Not Found")
    }
    else {
        res.status(201).json(updatedSlot);
    }
});

const updateMallParkingSlot = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { slotNo, Area, email, vehicleNo, phone, isRequested, duration } = req.body;

    const updatedSlot = await mallParkModel.findByIdAndUpdate(
        id,
        {
            slotNo: slotNo,
            Area: Area,
            email: email,
            phone: phone,
            vehicleNo: vehicleNo,
            isRequested: isRequested,
            duration: duration,
        },
        {
            new: true
        }
    );

    if (!updatedSlot) {
        res.status(404)
        throw new Error("Slot Not Found")
    }
    else {
        res.status(201).json(updatedSlot);
    }
});

const updateOfficeTwoWheelerParkingSlot = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { slotNo, Area, email, phone, vehicleNo, isRequested, duration } = req.body;

    const updatedSlot = await officeBikeModel.findByIdAndUpdate(
        id,
        {
            slotNo: slotNo,
            Area: Area,
            email: email,
            phone: phone,
            vehicleNo: vehicleNo,
            isRequested: isRequested,
            duration: duration,
        },
        {
            new: true
        }
    );

    if (!updatedSlot) {
        res.status(404)
        throw new Error("Slot Not Found")
    }
    else {
        res.status(201).json(updatedSlot);
    }
});

const updateMallTwoWheelerParkingSlot = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { slotNo, Area, email, phone, vehicleNo, isRequested, duration } = req.body;

    const updatedSlot = await mallBikeModel.findByIdAndUpdate(
        id,
        {
            slotNo: slotNo,
            Area: Area,
            email: email,
            phone: phone,
            vehicleNo: vehicleNo,
            isRequested: isRequested,
            duration: duration,
        },
        {
            new: true
        }
    );

    if (!updatedSlot) {
        res.status(404)
        throw new Error("Slot Not Found")
    }
    else {
        res.status(201).json(updatedSlot);
    }
});

const officeRequestedSlots = asyncHandler(async (req, res) => {
    const email = req.params.email;
    // console.log(email);

    const requestedSlot = await officeParkModel.find({ email });
    // console.log(requestedSlot);

    if (requestedSlot) {
        res.status(201).json(requestedSlot)
    }
    else {
        res.status(401)
        throw new Error("can't fetch the requested slots")
    }
});

const mallTwoWheelerRequestedSlots = asyncHandler(async (req, res) => {
    const email = req.params.email;
    // console.log(email);

    const requestedSlot = await mallBikeModel.find({ email });
    // console.log(requestedSlot);

    if (requestedSlot) {
        res.status(201).json(requestedSlot)
    }
    else {
        res.status(401)
        throw new Error("can't fetch the requested slots")
    }
});
const officeTwoWheelerRequestedSlots = asyncHandler(async (req, res) => {
    const email = req.params.email;
    // console.log(email);

    const requestedSlot = await officeBikeModel.find({ email });
    // console.log(requestedSlot);

    if (requestedSlot) {
        res.status(201).json(requestedSlot)
    }
    else {
        res.status(401)
        throw new Error("can't fetch the requested slots")
    }
});
const mallRequestedSlots = asyncHandler(async (req, res) => {
    const email = req.params.email;
    // console.log(email);

    const requestedSlot = await mallParkModel.find({ email });
    // console.log(requestedSlot);

    if (requestedSlot) {
        res.status(201).json(requestedSlot)
    }
    else {
        res.status(401)
        throw new Error("can't fetch the requested slots")
    }
});

const approveOfficeRequestedSlots = asyncHandler(async (req, res) => {
    const { id, isRequested, isParked } = req.body;
    // console.log(req.body);

    const updatedSlot = await officeParkModel.findByIdAndUpdate(
        id,
        {
            isRequested: isRequested,
            isParked: isParked
        },
        {
            new: true
        }
    );
    console.log(updatedSlot);

    if (!updatedSlot) {
        res.status(404)
        throw new Error("Slot Not Found")
    }
    else {
        res.status(201).json(updatedSlot);
    }
});

const approveMallRequestedSlots = asyncHandler(async (req, res) => {
    const { id, isRequested, isParked } = req.body;
    // console.log(req.body);

    const updatedSlot = await mallParkModel.findByIdAndUpdate(
        id,
        {
            isRequested: isRequested,
            isParked: isParked
        },
        {
            new: true
        }
    );
    console.log(updatedSlot);

    if (!updatedSlot) {
        res.status(404)
        throw new Error("Mall Slot Not Found")
    }
    else {
        res.status(201).json(updatedSlot);
    }
});

const approveMallTwoWheelerRequestedSlots = asyncHandler(async (req, res) => {
    const { id, isRequested, isParked } = req.body;
    // console.log(req.body);

    const updatedSlot = await mallBikeModel.findByIdAndUpdate(
        id,
        {
            isRequested: isRequested,
            isParked: isParked
        },
        {
            new: true
        }
    );
    console.log(updatedSlot);

    if (!updatedSlot) {
        res.status(404)
        throw new Error("Mall Slot Not Found")
    }
    else {
        res.status(201).json(updatedSlot);
    }
});

const approveOfficeTwoWheelerRequestedSlots = asyncHandler(async (req, res) => {
    const { id, isRequested, isParked } = req.body;
    // console.log(req.body);

    const updatedSlot = await officeBikeModel.findByIdAndUpdate(
        id,
        {
            isRequested: isRequested,
            isParked: isParked
        },
        {
            new: true
        }
    );
    console.log(updatedSlot);

    if (!updatedSlot) {
        res.status(404)
        throw new Error("Mall Slot Not Found")
    }
    else {
        res.status(201).json(updatedSlot);
    }
});

module.exports = {
    registerUser,
    authUser,
    allUsers,
    parkingSlot,
    fetchBooking,
    fetchMallSlots,
    fetchOfficeSlots,
    fetchOfficeTwoWheelerSlots,
    fetchMallTwoWheelerSlots,
    updateOfficeParkingSlot,
    updateMallParkingSlot,
    updateMallTwoWheelerParkingSlot,
    updateOfficeTwoWheelerParkingSlot,
    officeRequestedSlots,
    mallRequestedSlots,
    mallTwoWheelerRequestedSlots,
    officeTwoWheelerRequestedSlots,
    approveOfficeRequestedSlots,
    approveMallRequestedSlots,
    approveMallTwoWheelerRequestedSlots,
    approveOfficeTwoWheelerRequestedSlots
}