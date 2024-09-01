const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.use(authenticateToken);

router.post('/tenants/:tenantId/payments', async (req, res) => {
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

router.get('/tenants/:tenantId/payments', async (req, res) => {
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

module.exports = router;
