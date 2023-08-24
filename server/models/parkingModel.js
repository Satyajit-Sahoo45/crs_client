const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const parkingModel = mongoose.Schema(
    {
        slotNo: { type: Number, required: true },
        Area: { type: String, required: true },
        isParked: { type: Boolean, default: false },
        email: { type: String, unique: true },
        phone: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);


const Parking = mongoose.model("parkingModel", parkingModel);

module.exports = Parking;