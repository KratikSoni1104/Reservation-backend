import express from "express";
import Hotel from "../models/Hotels.js"
import { createError } from "../utils/errors.js";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, getRooms, updateHotel } from "../controllers/hotels.js";
import { verifyAdmin } from "../utils/verifyTokens.js";

const router = express.Router();

//CREATE
router.post("/" ,verifyAdmin, createHotel);

// UPDATE

router.put("/:id" ,verifyAdmin,  updateHotel)

// DELETE

router.delete("/:id" ,verifyAdmin,  deleteHotel)

// GET

router.get("/find/:id" , getHotel)

// GETALL

router.get("/" , getHotels);
router.get("/countByCity" , countByCity);
router.get("/countByType" , countByType);
router.get("/room/:id" , getRooms);

export default router;