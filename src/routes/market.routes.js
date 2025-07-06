import express from 'express';
import {
  addTool,
  getTools,
  updateTool,
  addSeedSapling,
  getSeedsSaplings,
  updateSeedSapling,
  addFarmerProduct,
  getFarmerProducts,
  updateFarmerProduct,
  getMyProducts
} from '../controllers/market.controller.js';

const router = express.Router();

// Tools
router.post('/tools', addTool);
router.get('/tools', getTools);
router.patch('/tools/:id', updateTool);

// Seeds & Saplings
router.post('/seeds-saplings', addSeedSapling);
router.get('/seeds-saplings', getSeedsSaplings);
router.patch('/seeds-saplings/:id', updateSeedSapling);

// Farmer Products
router.post('/farmer-products', addFarmerProduct);
router.get('/farmer-products', getFarmerProducts);
router.patch('/farmer-products/:id', updateFarmerProduct);
router.get('/my-products', getMyProducts);

export default router;
