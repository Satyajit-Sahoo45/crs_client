const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')
const generateToken = require("../config/generateToken");
const officeParkModel = require('../models/officeCarParkingModel');
const mallParkModel = require('../models/mallCarParkingModel');
const officeBikeModel = require('../models/officeBikeParkingModel')
const mallBikeModel = require('../models/mallBikeParkingModel')

const registerAdmin = asyncHandler(async (req, res) => {
    const { organisationName, email, password } = req.body;

    if (!organisationName || !email || !password) {
        res.status(400);
        throw new Error("Please eneter all the fields")
    }

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
        res.status(400);
        throw new Error("Admin already exists");
    }

    const admin = await Admin.create({
        organisationName,
        email,
        password,
    });

    if (admin) {
        res.status(201).json({
            _id: admin._id,
            organisationName: admin.organisationName,
            email: admin.email,
            token: generateToken(admin._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create admin");
    }
});

const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

const mallParkingModel = asyncHandler(async (req, res) => {
    const { slotNo, email, Area, phone, date, isParked, duration } = req.body;

    if (!slotNo) {
        res.status(401)
        throw new Error("Please enter the slotNo to addd slot")
    }

    const createdMallSlot = await mallParkModel.create({
        slotNo,
        email,
        Area,
        phone,
        date,
        isParked,
        duration
    });

    if (createdMallSlot) {
        res.status(201).json({
            slotNo: createdMallSlot.slotNo,
            email: createdMallSlot.email,
            Area: createdMallSlot.Area,
            phone: createdMallSlot.phone,
            date: createdMallSlot.date,
            isParked: createdMallSlot.isParked,
            duration: createdMallSlot.duration
        })
    }
    else {
        res.status(400)
        throw new Error("Can't create the slot")
    }
});

const officeParkingModel = asyncHandler(async (req, res) => {
    const { slotNo, Area, email, phone, date, isParked, duration } = req.body;

    if (!slotNo) {
        res.status(401)
        throw new Error("Please enter the slotNo to addd slot")
    }

    const createdOfficeSlot = await officeParkModel.create({
        slotNo,
        Area,
        email,
        phone,
        date,
        isParked,
        duration
    });

    if (createdOfficeSlot) {
        res.status(201).json({
            slotNo: createdOfficeSlot.slotNo,
            Area: createdOfficeSlot.Area,
            email: createdOfficeSlot.email,
            phone: createdOfficeSlot.phone,
            date: createdOfficeSlot.date,
            isParked: createdOfficeSlot.isParked,
            duration: createdOfficeSlot.duration
        })
    }
    else {
        res.status(400)
        throw new Error("Can't create the slot")
    }
})

const officeTwoWheelerParkingModel = asyncHandler(async (req, res) => {
    const { slotNo, Area, email, phone, date, isParked, duration } = req.body;

    if (!slotNo) {
        res.status(401)
        throw new Error("Please enter the slotNo to addd slot")
    }

    const createdOfficeSlot = await officeBikeModel.create({
        slotNo,
        Area,
        email,
        phone,
        date,
        isParked,
        duration
    });

    if (createdOfficeSlot) {
        res.status(201).json({
            slotNo: createdOfficeSlot.slotNo,
            Area: createdOfficeSlot.Area,
            email: createdOfficeSlot.email,
            phone: createdOfficeSlot.phone,
            date: createdOfficeSlot.date,
            isParked: createdOfficeSlot.isParked,
            duration: createdOfficeSlot.duration
        })
    }
    else {
        res.status(400)
        throw new Error("Can't create the slot")
    }
})

const mallTwoWheelerParkingModel = asyncHandler(async (req, res) => {
    const { slotNo, Area, email, phone, date, isParked, duration } = req.body;

    if (!slotNo) {
        res.status(401)
        throw new Error("Please enter the slotNo to addd slot")
    }

    const createdOfficeSlot = await mallBikeModel.create({
        slotNo,
        Area,
        email,
        phone,
        date,
        isParked,
        duration
    });

    if (createdOfficeSlot) {
        res.status(201).json({
            slotNo: createdOfficeSlot.slotNo,
            Area: createdOfficeSlot.Area,
            email: createdOfficeSlot.email,
            phone: createdOfficeSlot.phone,
            date: createdOfficeSlot.date,
            isParked: createdOfficeSlot.isParked,
            duration: createdOfficeSlot.duration
        })
    }
    else {
        res.status(400)
        throw new Error("Can't create the slot")
    }
})



module.exports = {
    registerAdmin,
    authAdmin,
    mallParkingModel,
    officeParkingModel,
    officeTwoWheelerParkingModel,
    mallTwoWheelerParkingModel,
}