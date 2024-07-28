import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: 'rzp_live_5PPrr1z0Y5RqDP',
  key_secret: 'e9ECp41GXpsAhkozANAvwUCS'
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { order_id, razorpay_payment_id, razorpay_signature } = req.body;

      const crypto = require('crypto');
      const shasum = crypto.createHmac('sha256', razorpay.key_secret);
      shasum.update(`${order_id}|${razorpay_payment_id}`);
      const digest = shasum.digest('hex');

      if (digest === razorpay_signature) {
        res.json({ message: 'Payment successful' });
      } else {
        res.status(400).json({ message: 'Invalid signature' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
