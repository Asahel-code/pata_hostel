const express = require("express");
const router = express.Router();
const countController = require("../../controllers/countController");

router.get("/tenant_and_hostel_count", countController.getHostelAndTenantCount);

module.exports = router;