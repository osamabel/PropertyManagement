const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.use(authenticateToken);

// Create a new tenant for a specific property
router.post('/:propertyId/tenants', async (req, res) => {
  const { propertyId } = req.params;
  const { name, email, phone, section } = req.body;
  try {
    const tenant = await prisma.tenant.create({
      data: { 
        name, 
        email,
        phone,
        section, 
        propertyId: parseInt(propertyId) 
      },
    });
    res.status(201).json(tenant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tenants for a specific property
router.get('/properties/:propertyId/tenants', async (req, res) => {
  const { propertyId } = req.params;
  try {
    const tenants = await prisma.tenant.findMany({
      where: { propertyId: parseInt(propertyId) },
    });
    res.json(tenants);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
