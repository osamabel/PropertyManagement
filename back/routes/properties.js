const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.use(authenticateToken);

router.post('/', async (req, res) => {
  const { name, address, type, units, rentalCost } = req.body;

  try {
    const property = await prisma.property.create({
      data: { name, address, type, units, rentalCost },
    });
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (res) => {
  console.log(">>>>>")
  const properties = await prisma.property.findMany();
  res.json(properties);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const property = await prisma.property.findUnique({ where: { id: parseInt(id) } });
  if (property) {
    res.json(property);
  } else {
    res.status(404).json({ error: 'Property not found' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, type, units, rentalCost } = req.body;

  try {
    const property = await prisma.property.update({
      where: { id: parseInt(id) },
      data: { name, address, type, units, rentalCost },
    });
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.property.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
