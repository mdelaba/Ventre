const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const fee = parseFloat(process.env.FEE);
const escrowAccountID = process.env.ESCROW_ACCOUNT_ID;
const revenueAccountID = process.env.REVENUE_ACCOUNT_ID;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { paymentMethodId, amount } = req.body;

      // Create a PaymentIntent with the specified amount.
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "cad",
        payment_method_types: ["card"],
        payment_method: paymentMethodId || undefined,
      });

      // Calculate amounts to transfer
      const totalAmount = paymentIntent.amount;
      const escrowAmount = totalAmount * (1 - fee);
      const revenueAmount = totalAmount * fee;

      // Transfer to escrow account
      await stripe.transfers.create({
        amount: escrowAmount,
        destination: escrowAccountID,
        currency: "cad",
      });

      // Transfer to other account
      await stripe.transfers.create({
        amount: revenueAmount,
        destination: revenueAccountID,
        currency: "cad",
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
