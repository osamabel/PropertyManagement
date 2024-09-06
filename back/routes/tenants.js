const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.use(authenticateToken);

router.get('/', async (req, res) => {
  try {
    const tenant = await prisma.tenant.findMany({
      include: {
        payments: true,
      },
    });
    console.log('Fetched tenants:', tenant);
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tenant.' });
  }
});


// Update a tenant's details
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, section } = req.body;

  try {
    const tenant = await prisma.tenant.update({
      where: { id: parseInt(id) },
      data: { name, email, phone, section },
    });
    res.json(tenant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a tenant
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tenant.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
