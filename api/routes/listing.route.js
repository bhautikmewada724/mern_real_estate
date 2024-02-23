import express from "express";
import { createListing, deleteListing, getListing, updateListing } from "../controllers/listing.controller.js";
import verfiyToken from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verfiyToken, createListing);
router.delete("/delete/:id", verfiyToken, deleteListing);
router.post("/update/:id", verfiyToken, updateListing);
router.get("/get/:id", getListing);

export default router;