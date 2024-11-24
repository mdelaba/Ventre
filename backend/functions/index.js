/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

admin.initializeApp();

// Write data to the database
exports.addUser = onRequest({ cors: true }, async (req, res) => {
  try {
    const db = admin.database();
    const ref = db.ref("printer-locations"); // Reference to the node

    const { name, address } = req.body;

    // Get all printers in the same city
    const printersInCity = await getPrintersInCity(address); // Added await
    console.log(printersInCity);

    // Write the new printer to the database
    const newPrinterRef = ref.push();
    await newPrinterRef
      .set({
        name,
        address,
      })
      .catch((error) => {
        res.status(500).send("Error writing to database: " + error.message);
      });

    // Send the result as a JSON response
    res.status(200).json({ nearbyPrinters: printersInCity });
  } catch (err) {
    logger.error("Error in writing data to the database:", err.message);
    res.status(500).json({ error: err.message });
  }
});

//Get users in the database from a certain city
async function getPrintersInCity(city) {
  // Added async
  try {
    const db = admin.database();
    const ref = db.ref("printer-locations"); // Reference to the node

    const printersInCity = [];

    await ref.once("value").then((snapshot) => {
      // Added await
      const printers = snapshot.val();

      // Loop through customers and filter by city
      for (const printerId in printers) {
        const printer = printers[printerId];
        if (printer.address === city) {
          printersInCity.push(printer);
        }
      }
    });

    return printersInCity;
  } catch (err) {
    logger.error("Error in reading data from the database:", err.message);
    res.status(500).json({ error: err.message });
  }
}

// Custom function to handle the payment process
exports.createPaymentIntent = onRequest(
  {
    secrets: [
      "STRIPE_SECRET_KEY",
      "FEE",
      "ESCROW_ACCOUNT_ID",
      "REVENUE_ACCOUNT_ID",
    ],
    cors: true,
  },
  async (req, res) => {
    try {
      // Extract secrets from firebase
      const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
      const fee = parseFloat(process.env.FEE);
      const escrowAccountID = process.env.ESCROW_ACCOUNT_ID;
      const revenueAccountID = process.env.REVENUE_ACCOUNT_ID;

      // Extract payment details from the request body
      const { paymentMethodId, amount } = req.body;

      // Ensure required data is present
      if (!paymentMethodId || !amount) {
        return res.status(400).json({ error: "Missing required parameters." });
      }

      // Calculate the amounts to transfer
      const escrowAmount = Math.round(amount * (1 - fee));
      const revenueAmount = Math.round(amount * fee);

      // Create a PaymentIntent with the specified amount
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "cad",
        payment_method_types: ["card"],
        payment_method: paymentMethodId || undefined,
        confirm: true, // Confirm immediately after creating the PaymentIntent
        transfer_data: {
          destination: revenueAccountID,
        },
        application_fee_amount: revenueAmount,
      });

      //   // Transfer to escrow account
      //   await stripe.transfers.create({
      //     amount: escrowAmount,
      //     destination: escrowAccountID,
      //     currency: "cad",
      //   });

      //   // Transfer to revenue account
      //   await stripe.transfers.create({
      //     amount: revenueAmount,
      //     destination: revenueAccountID,
      //     currency: "cad",
      //   });

      // Respond with the client secret for the payment
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      logger.error(
        "Error in creating payment intent and transfers:",
        err.message
      );
      res.status(500).json({ error: err.message });
    }
  }
);
