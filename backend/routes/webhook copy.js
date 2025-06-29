import Stripe from "stripe";
import express from "express";
import env from "dotenv";
import bodyParser from "body-parser";

import { webhookPayment } from "../controllers/webhookController.js";

env.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    let event = req.body;

    // consoles.log("webhook event: ", event);
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (webhookSecret) {
      // Get the signature sent by Stripe
      let sig = req.headers["stripe-signature"];
      console.log("signature: ", sig);
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        console.log("Webhook successfull");
        res.status(200).end();
      } catch (err) {
        console.log(`❌ Error message: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
      }
    }
    // Successfully constructed event
    //   console.log("✅ Success:", event.id);
    // Handle the event
    //   switch (event.type) {
    //     case "payment_intent.succeeded":
    //       const paymentIntentSucceeded = event.data.object;
    //       // Then define and call a function to handle the event payment_intent.succeeded
    //       console.log(`💰 PaymentIntent status: ${paymentIntentSucceeded}`);
    //       break;
    //     // ... handle other event types
    //     case "charge.succeeded":
    //       const charge = event.data.object;
    //       console.log(`💵 Charge id: ${charge.id}`);
    //     default:
    //       console.log(`Unhandled event type ${event.type}`);
    //   }
    //   // Return a 200 response to acknowledge receipt of the event
    //   res.send();
    // });
  }
);

export default router;
