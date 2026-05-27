import express from'express';import{getPackages,seedPackages}from'../controllers/packageController.js';const r=express.Router();r.get('/',getPackages);r.post('/seed',seedPackages);export default r;
