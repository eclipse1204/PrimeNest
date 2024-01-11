import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
const router=express.Router();

router.post('/create',verifyUser,createListing);
router.delete('/delete/:id',verifyUser,deleteListing);
router.post('/update/:id', verifyUser,updateListing);
router.get('/get/:id', getListing); //get details of a listing
router.get('/get', getListings); //search listings route

export default router;