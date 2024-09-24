import express from "express";
import {
    getAllcourses,
    getSingleCourse,
    fetchLectures,
    fetchLecture,
    getMycourse,
    checkout,
    paymentVerification
} from "../controllers/course.controllers.js";

import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router()

router.get("/course/all", getAllcourses)
router.get("/course/:id", getSingleCourse)
router.get("/lectures/:id", isAuth, fetchLectures)
router.get("/lecture/:id", isAuth, fetchLecture)
router.get("/mycourse/", isAuth, getMycourse)
router.post("/course/checkout/:id", isAuth, checkout)
router.post("/verification/:id", isAuth, paymentVerification)

export default router 
