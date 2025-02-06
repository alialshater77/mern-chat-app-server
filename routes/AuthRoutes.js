import { Router } from "express"
import { getUserInfo, login, Logout, removeProfileImage, signup, updateProfile, uploadImage } from "../controllers/AuthController.js"
import { verifyToken } from "../middlewares/AuthMiddleware.js"
import multer from "multer"


const authRoutes = Router()
const upload = multer({dest: "uploads/profiles/"})

authRoutes.post("/signup" , signup)
authRoutes.post("/login" , login)
authRoutes.post("/logout" , verifyToken, Logout)

authRoutes.get("/user-info" , verifyToken, getUserInfo)
authRoutes.put("/update-profile" , verifyToken, updateProfile)
authRoutes.post("/upload-image" , verifyToken , upload.single("profile-image"), uploadImage)
authRoutes.delete("/remove-image" , verifyToken , removeProfileImage)

export default authRoutes