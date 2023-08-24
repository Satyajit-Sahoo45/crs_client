
const express = require('express')
const { protect } = require("../middleware/authMiddleware")
const { registerUser,
    authUser,
    allUsers,
    fetchBooking,
    parkingSlot,
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
    approveOfficeRequestedSlots,
    approveMallRequestedSlots,
    approveMallTwoWheelerRequestedSlots,
    approveOfficeTwoWheelerRequestedSlots,
    mallTwoWheelerRequestedSlots,
    officeTwoWheelerRequestedSlots,
} = require("../controllers/userControllers");

const router = express.Router()

router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser)
router.route('/booking').post(parkingSlot);
router.route('/fetchBooking').get(fetchBooking)
router.route("/getMallParkingSlots").get(fetchMallSlots)
router.route("/getOfficeParkingSlots").get(fetchOfficeSlots)
router.route("/getOfficeTwoWheelerParkingSlots").get(fetchOfficeTwoWheelerSlots)
router.get("/getMallTwoWheelerParkingSlots", fetchMallTwoWheelerSlots)
router.put("/updateOfficeParkingSlot/:id", updateOfficeParkingSlot)
router.put("/updateMallParkingSlot/:id", updateMallParkingSlot)
router.put("/updateMallTwoWheelerParkingSlot/:id", updateMallTwoWheelerParkingSlot)
router.put("/updateOfficeTwoWheelerParkingSlot/:id", updateOfficeTwoWheelerParkingSlot)
router.get("/officeRequestedSlots/:email", officeRequestedSlots)
router.get("/officeRequestedSlots/:email", officeRequestedSlots)
router.get("/mallTwoWheelerRequestedSlots/:email", mallTwoWheelerRequestedSlots)
router.get("/officeTwoWheelerRequestedSlots/:email", officeTwoWheelerRequestedSlots)
router.get("/mallRequestedSlots/:email", mallRequestedSlots)
router.put("/approveOfficeRequestedSlots", approveOfficeRequestedSlots)
router.put("/approveMallRequestedSlots", approveMallRequestedSlots)
router.put("/approveMallTwoWheelerRequestedSlots", approveMallTwoWheelerRequestedSlots)
router.put("/approveOfficeTwoWheelerRequestedSlots", approveOfficeTwoWheelerRequestedSlots)

module.exports = router