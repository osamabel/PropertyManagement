const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.use(authenticateToken);

router.post('/:tenantId/payments', async (req, res) => {
  const { tenantId } = req.params;
  const { datePaid, amount, settled } = req.body;

  try {
    const payment = await prisma.payment.create({
      data: { datePaid: new Date(datePaid), amount, settled, tenantId: parseInt(tenantId) },
    });
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:tenantId/payments', async (req, res) => {
  const { tenantId } = req.params;
  const payments = await prisma.payment.findMany({
    where: { tenantId: parseInt(tenantId) },
  });
  res.json(payments);
});

router.get('/payments', async (req, res) => {
  const payments = await prisma.payment.findMany();
  res.json(payments);
});


router.put('/:paymentId/payments', async (req, res) => {
  const { paymentId } = req.params;
  console.log(">>>>>>", paymentId)
  try {
    const updatedPayment = await prisma.payment.update({
      where: { id: parseInt(paymentId) },
      data: {
        settled: true, // Mark as settled
        datePaid: new Date(), // Set current date and time
      },
    });
    res.status(200).json(updatedPayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;
