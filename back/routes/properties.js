const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/auth');
const router = express.Router();



router.use(authenticateToken);

router.post('/', async (req, res) => {
  const { name, address, type, units, rentalCost } = req.body;

console.log(">>>>", req.body)

  try {
    const property = await prisma.property.create({
      data: { name, address, type, units: parseInt(units), rentalCost:parseInt(rentalCost) },
    });
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        tenants: {
          include: {
            payments: true,
          },
        },
      },
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching properties.' });
  }
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


router.post('/:propertyId/tenants', async (req, res) => {
  const { propertyId } = req.params
  const { name, email, phone, section } = req.body;

  const getCurrentMonthName = () => {
    const date = new Date();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[date.getMonth()];
  };
  console.log('getCurrentMonthName:', getCurrentMonthName());
  
  try {
    const tenant = await prisma.tenant.create({
      data: { 
        name, 
        email,
        phone,
        section : parseInt(section),
        propertyId: parseInt(propertyId),
        payments: {
          create: {
            monthName: getCurrentMonthName(),
            datePaid: null,
            settled: false,
          },
        },
      },
    });
    res.status(201).json(tenant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/:propertyId/tenants', async (req, res) => {
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

module.exports = router;
