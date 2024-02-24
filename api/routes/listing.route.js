import express from "express";
import { createListing, deleteListing, getListing, getListings, updateListing } from "../controllers/listing.controller.js";
import verfiyToken from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verfiyToken, createListing);
router.delete("/delete/:id", verfiyToken, deleteListing);
router.post("/update/:id", verfiyToken, updateListing);
router.get("/get/:id", getListing);
router.get('/get',getListings)

export default router;