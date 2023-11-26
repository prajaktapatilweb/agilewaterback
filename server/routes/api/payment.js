const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const CoursesList = require("../../models/CoursesList");
const { default: mongoose } = require("mongoose");
const PayOrder = require("../../models/PayOrder");
require("dotenv").config();

router.post("/orders", async (req, res) => {
  console.log("Receided", req.body);
  try {
    const RecData = req.body;
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    let FilteredData = await CoursesList.aggregate([
      { $match: { CourseID: RecData.CourseID } },
      {
        $project: {
          PaymentType: {
            $filter: {
              input: "$PaymentTypes",
              as: "item",
              cond: {
                $or: [
                  { $eq: ["$$item._id", new mongoose.Types.ObjectId(RecData?.PayTypeID?.[0]?.PayID)] },
                  { $eq: ["$$item._id", new mongoose.Types.ObjectId(RecData?.PayTypeID?.[1]?.PayID)] },
                ],
              },
              // cond: { $eq: ["$$item._id", new mongoose.Types.ObjectId(RecData.PayTypeID)] },
            },
          },
        },
      },
      // PaymentTypes: { $elemMatch: { _id: new mongoose.Types.ObjectId("655618ae9a506c1bd6b763ab") } } } },
    ]);
    let wrongentry = false;
    RecData.PayTypeID.map((item) => {
      if (item.Amount !== FilteredData[0].PaymentType.filter((item1) => item1.ConcessionType === item.PayType)[0].Amount) {
        wrongentry = true;
      }
    });
    console.log("ssss", wrongentry, FilteredData[0].PaymentType);
    // const DisPercentage0 = FilteredData[0].PaymentType[0].DiscountCoupon.filter((item) => {
    //   return item.Title === RecData.DiscountCoupon;
    // })[0].Percentage;

    // console.log(FilteredData[0].PaymentType[0], DisPercentage);
    if (wrongentry) {
          return res.status(404).json({error:'Error'});
    } else {
      let totalNumber = await PayOrder.countDocuments();
      totalNumber = totalNumber >= 1 ? totalNumber + 1001 : 1001;
      Receipt_ID = `receipt_order_${totalNumber}`;
      let FAmount = 0;
      RecData.PayTypeID.map((item) => (FAmount += item.Amount * item.RegisteredNumber));
      const options = {
        amount: FAmount * 118,
        // amount: FilteredData[0].PaymentType[0].Amount * 100 * (1 - DisPercentage / 100), // amount in smallest currency unit
        currency: "INR",
        receipt: Receipt_ID,
        notes: {
          CourseID: RecData.CourseID,
          RegisterdPersonTotal: RecData.PayTypeID[0].RegisteredNumber + (RecData?.PayTypeID[1]?.RegisteredNumber || 0),
          DiscountCoupon: RecData.DiscountCoupon,
          PartcipantFirstName: RecData.PartcipantDetails[0].Name,
        },
      };

      const order = await instance.orders.create(options);
      console.log("Order Created ", order);
      if (!order) return res.status(500).send("Some error occured");
      order.CourseID = RecData.CourseID;
      order.PayTypeID = RecData.PayTypeID;
      order.PartcipantDetails = RecData.PartcipantDetails;
      order.GSTDetail = RecData.GSTDetail;
      console.log("Order Updated ", order);

      FinalData = new PayOrder(order);

      await FinalData.save()
        .then(() => {
          return res.json(order);
        })
        .catch((err) => {
          console.log("Errot", err);
          return res.status(500).json({ error: `Problem in Storing to MongoDB: ${err}` });
        });
    }
  } catch (error) {
    console.log("Rrrr", error);
    res.status(500).send(error);
  }
});

router.post("/success", async (req, res) => {
  try {
    // getting the details back from our font-end
    console.log("Success Testing", new Date());
    const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
    console.log("1111", orderCreationId, razorpayPaymentId, razorpayOrderId);

    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, process.env.RAZORPAY_SECRET);
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");
    console.log("CCC", digest, razorpaySignature, digest === razorpaySignature);
    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature) return res.status(400).json({ msg: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
    // async function asyncPutCall() {
    await PayOrder.updateOne(
      { id: orderCreationId },
      {
        $set: {
          status: "Paid",
          updated_at: new Date(),
          razorpayPaymentId: razorpayPaymentId,
          razorpaySignature: razorpaySignature,
        },
      }
    )
      .then(async () => {
        return res.json({ msg: "success", orderId: razorpayOrderId, paymentId: razorpayPaymentId });
      })
      .catch((err) => {
        console.log("errr", err);
        return res.status(500).json({ error: "Server Error" });
      });
    // }
  } catch (error) {
    console.log("Errr", error);
    res.status(500).send(error);
  }
});

module.exports = router;
