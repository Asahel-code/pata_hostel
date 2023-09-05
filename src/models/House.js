const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const houseSchema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        region: { type: mongoose.Schema.Types.ObjectId, ref: 'Region', required: true },
        gender: { type: String, required: true },
        images: { type: Array, required: true },
        description: { type: String, required: true },
        numberOfRooms: { type: Number, required: true },
        numberPerRoom: { type: Number, required: true },
        houseNamingPattern: { type: String, required: true },
        rentalFee: { type: Number, required: true },
        landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('House', houseSchema); 