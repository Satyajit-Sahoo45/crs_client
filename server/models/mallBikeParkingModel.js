const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const mallBikeParkingModel = mongoose.Schema(
    {
        slotNo: { type: Number, required: true },
        vehicleNo: { type: String, required: true },
        Area: { type: String, required: true, default: "MALL" },
        email: { type: String, unique: true, default: "xyz@gmail.com" },
        phone: { type: String, required: true, default: "xxxxxxxxxx" },
        date: { type: String, required: true },
        isRequested: { type: Boolean, default: false },
        isParked: { type: Boolean, default: false },
        duration: { type: Number, required: true, default: 0 }
    }
);

const mallBikeParkModel = mongoose.model("mallBikeParkModel", mallBikeParkingModel);

module.exports = mallBikeParkModel;