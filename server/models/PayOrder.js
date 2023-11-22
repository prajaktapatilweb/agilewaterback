const mongoose = require("mongoose");

const PayOrderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  entity: { type: String },
  amount: { type: Number },
  amount_paid: { type: Number },
  amount_due: { type: Number },
  currency: { type: String },
  receipt: { type: String },
  offer_id: { type: String },
  status: { type: String },
  attempts: { type: Number },
  razorpayPaymentId:{type: String },
  razorpaySignature:{type: String },
  notes: {
    CourseID: { type: String },
    PaymentType: { type: String },
    DiscountCoupon: { type: String },
  },
  created_at: { type: Number },
  updated_at: { type: Date },
});

module.exports = mongoose.model("payorder", PayOrderSchema);
