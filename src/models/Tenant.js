const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema(
  {
    roomNo: { type: String, required: true },
    house: {
      hostel: { type: mongoose.Schema.Types.ObjectId, ref: 'House', required: true },
      landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userDetails: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      school: String,
      regNo: String,
      idNo: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    months: Number,
    paymentResult: Object,
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    paymentDueDate: { type: Date },
    isPaymentApproved: { type: Boolean, default: false },
    paymentApprovedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Tenant', tenantSchema); 