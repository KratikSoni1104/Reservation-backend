import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/users.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyTokens.js";

const router = express.Router();

router.get("/checkauthentication" , verifyToken , (req , res , next) => {
    res.send("user is authenticated");
})

router.get("/checkuser/:id" , verifyUser , (req , res , next) => {
  res.send("user is authenticated and can delete the account");
})

router.get("/checkadmin/:id" , verifyAdmin , (req , res , next) => {
  res.send("user is admin and can delete all accounts");
})

//UPDATE
router.put("/:id",verifyUser,  updateUser);

//DELETE
router.delete("/:id",verifyUser, deleteUser);

//GET
router.get("/:id",verifyUser, getUser);

//GET ALL
router.get("/",verifyAdmin,  getUsers);

export default router;