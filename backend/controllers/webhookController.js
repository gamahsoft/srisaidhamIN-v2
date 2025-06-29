import Stripe from "stripe";
import express from "express";
import env from "dotenv";
import bodyParser from "body-parser";
import asyncHandler from "../middleware/asyncHandler.js";

env.config();

const app = express();
// app.use("/webhook", bodyParser.raw({ type: "*/*" }));

// app.use(
//   bodyParser.json({
//     verify: function (req, res, buf) {
//       var url = req.originalUrl;
//       console.log("what is original url: ", url);
//       if (url.startsWith("/webhook")) {
//         console.log("I am i bodyparser", req.rawBody);
//         req.rawBody = buf.toString();
//       }
//     },
//   })
// );

const webhookPayment = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_KEY);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const sig = req.headers["stripe-signature"];

  let event = req.body;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    console.log("Webhook verified");
  } catch (err) {
    console.log("webhook error: ", `Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded": {
      const email = event["data"]["object"]["receipt_email"];
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    }
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
};

export { webhookPayment };
