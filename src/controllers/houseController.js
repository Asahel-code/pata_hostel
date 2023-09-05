const House = require("../models/House");
const { uploadToCloudinary } = require('../middleware/imageUpload');
const crypto = require('crypto');

const getAllHouses = async (req, res) => {
  try {
    const allHouses = await House.find().populate('region', 'name');
    return res.status(200).json(allHouses);
  }
  catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || error });
  }
};

const getLandLordHouses = async (req, res) => {
  try {
    const landHouses = await House.find({ landlord: req.userId }).populate('region', 'name');
    return res.status(200).json(landHouses);
  }
  catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || error });
  }
};

const getHouse = async (req, res) => {
  try {
    return res.status(200).json(res.house);
  }
  catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || error });
  }
};

const searchForHouses = async (req, res) => {
  try {
    let query = {
      $and: [
        { $and: [{ gender: req.params.gender }, { region: req.params.region }] }
      ]
    };

    if (req.params.max_price || req.params.min_price) {
      query.$and.push({
        rentalFee: {}
      });

      if (req.params.max_price) {
        query.$and[1].rentalFee.$lte = req.params.max_price;
      }
      
      if (req.params.min_price) {
        query.$and[1].rentalFee.$gte = req.params.min_price;
      }
    }

    const houses = await House.find(query);

    return res.status(200).json(houses);
  } catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || error });
  }
};


const createNewHouse = async (req, res) => {

  const { body } = req;

  let imagesArray = []

  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      try {
        const res = await uploadToCloudinary(req.files[i].path);
        imagesArray.push(res.url);
      } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
      }
    }
  }

  let slug = '';
  const existingProduct = await House.findOne({ slug: body.slug }).exec();
  if (existingProduct) slug = body.slug + crypto.randomBytes(3).toString('hex');
  else slug = body.slug;

  const newHouse = new House({
    name: body?.name,
    slug: slug,
    region: body?.region,
    images: imagesArray,
    gender: body?.gender,
    description: body?.description,
    numberOfRooms: body?.numberOfRooms,
    numberPerRoom: body?.numberPerRoom,
    houseNamingPattern: body?.houseNamingPattern,
    rentalFee: body?.rentalFee,
    landlord: req.userId,

  });

  try {
    await newHouse.save();

    return res.status(201).json({ message: `${body?.name} details have been added successfully` })
  }
  catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || error });
  }
};

const updateHouse = async (req, res) => {
  const { body } = req;

  let slug = '';
  const existingProduct = await Product.findOne({ slug: body.slug }).exec();
  if (existingProduct) slug = body.slug.toLowercase() + crypto.randomBytes(3).toString('hex');
  else slug = body.slug;

  res.house.name = body?.name;
  res.house.slug = slug;
  res.house.gender = body?.gender;
  res.house.description = body?.description;
  res.house.numberOfRooms = body?.numberOfRooms;
  res.house.numberPerRoom = body?.numberPerRoom;
  res.house.houseNamingPattern = body?.houseNamingPattern;
  res.house.rentalFee = body?.rentalFee;

  try {
    await res.house.save();

    return res.status(200).json({ message: `${body?.name} details have been updated successfully` })
  }
  catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || error });
  }
};

const updateHouseImages = async (req, res) => {
  let imagesArray = []

  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      try {
        const res = await uploadToCloudinary(req.files[i].path);
        imagesArray.push(res.url);
      } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
      }
    }
  }

  res.house.images = imagesArray;

  try {
    await res.house.save();
    return res.status(200).json({ message: `${res.res.house.name} image has been updated successfully` })
  } catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || error });
  }
}

const deleteHouse = async (req, res) => {
  try {
    await res.house.remove();
    return res.status(204).json({ message: "House deleted" });
  }
  catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || error });
  }
};


module.exports = {
  getAllHouses,
  getLandLordHouses,
  getHouse,
  searchForHouses,
  createNewHouse,
  updateHouse,
  updateHouseImages,
  deleteHouse,
}