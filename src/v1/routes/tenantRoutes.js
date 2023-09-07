const express = require("express");
const router = express.Router();
const bookingController = require("../../controllers/bookingController");
const verifyAuth = require('../../middleware/verifyAuth');
const verifyLandLordRole = require('../../middleware/verifyLandLordRole')
const getTenant = require("../../middleware/getTenant");

router.get("/", verifyAuth, verifyLandLordRole, bookingController.fetchAllLandLordTenants);
router.post("/", verifyAuth, bookingController.bookHouse);
router.get("/mine", verifyAuth, bookingController.getTenantBookings);
router.get("/check/check_space_availability/:roomNo&:numberPerRoom", bookingController.checkRoomAvailability);
router.get("/check/check_if_tenant_has_booked_before", verifyAuth, bookingController.checkIfTenantHasBooked);
router.get("/:tenantId", verifyAuth, getTenant, bookingController.getSingleBooking);
router.patch("/:tenantId/pay", verifyAuth, getTenant, bookingController.rentPayment);
router.patch("/:tenantId/approve/pay", verifyAuth, verifyLandLordRole, getTenant, bookingController.approvePayment);
router.delete("/:tenantId", verifyAuth, getTenant, bookingController.deleteBooking);

module.exports = router;