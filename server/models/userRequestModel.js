const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userRequestModel = mongoose.Schema(
    {
        slotNo: { type: Number, required: true },
        Area: { type: String, required: true },
        email: { type: String, unique: true, default: "xyz@gmail.com" },
        phone: { type: String, required: true, default: "xxxxxxxxxx" },
        isParked: { type: Boolean, default: false },
    }
);


const requestModel = mongoose.model("requestModel", userRequestModel);

module.exports = requestModel;