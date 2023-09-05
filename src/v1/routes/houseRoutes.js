const express = require("express");
const router = express.Router();
const houseController = require("../../controllers/houseController");
const getHouse = require("../../middleware/getHouse");
const verifyAuth = require('../../middleware/verifyAuth');
const verifyLandLordRole = require('../../middleware/verifyLandLordRole');
const { uploadImages } = require('../../middleware/imageUpload');

router.get("/",houseController.getAllHouses);
router.get("/landlord_houses", verifyAuth, verifyLandLordRole, houseController.getLandLordHouses);
router.get("/search/:gender&:region&:min_price&:max_price", houseController.searchForHouses);
router.get("/:houseSlug", getHouse, houseController.getHouse);
router.post("/", verifyAuth, verifyLandLordRole, uploadImages.array('images',10), houseController.createNewHouse);
router.patch("/:houseSlug", verifyAuth, verifyLandLordRole, getHouse, houseController.updateHouse);
router.patch("/update_images/:houseSlug", verifyAuth, verifyLandLordRole, getHouse, uploadImages.array('images',4), houseController.updateHouseImages);
router.delete("/:houseSlug", verifyAuth, verifyLandLordRole, getHouse, houseController.deleteHouse);

module.exports = router;