import express from 'express';
import { updateUser, deleteUser, getUserListings, getUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
const router=express.Router();

router.post('/update/:id',verifyUser,updateUser);
router.delete('/delete/:id',verifyUser,deleteUser);
router.get('/listings/:id',verifyUser,getUserListings); // listings of an user
router.get('/:id', verifyUser, getUser); // details of an user (email for contact)

export default router;