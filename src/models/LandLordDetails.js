const mongoose = require("mongoose");

const landLordDetailsSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentPayBillNumber: { type: String, required: true },
    accountName: { type: String, required: true },
    termsAndCondition: { type: String, required: true },
    subScriptionfee: { type: Number, required: true },
    paymentResult: Object,
    isSubscribed: { type: Boolean, default: false },
    subscribedAt: { type: Date },
    subScriptionDueDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('LandLordDetails', landLordDetailsSchema); 