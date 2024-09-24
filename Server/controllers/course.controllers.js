import { instance } from "../index.js";
import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/courses.models.js";
import { Lecture } from '../models/Lecture.models.js'
import { User } from '../models/user.models.js'
import crypto from 'crypto'
import { Payment } from '../models/Payment.models.js'

export const getAllcourses = TryCatch(async (req, res) => {
  const courses = await Courses.find()

  res.json({
    courses,

  })
})

export const getSingleCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id)

  res.json({
    course,
  })
})

export const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lectures });
  }

  if (!user.subscription.includes(req.params.id))
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });

  res.json({ lectures });
});

export const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.subscription.includes(req.params.id))
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });

  res.json({ lecture });
});

export const getMycourse = TryCatch(async (req, res) => {
  const courses = await Courses.find({ _id: req.user.subscription })
  res.json({
    courses,
  })
})

export const checkout = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id)

  const course = await Courses.findById(req.params.id)

  if (user.subscription.includes(course._id))
    return res.status(400).json({
      message: "You already have this course"
    })

  const options = {
    amount: Number(course.price * 100),
    currency: "INR"
  }

  const order = await instance.orders.create(options)

  res.status(201).json({
    order,
    course
  })

})

export const paymentVerification = TryCatch(async (req, res) => {
  const { razorpay_order_id, razorpay_Payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_Payment_id

  const expectedSingnature = crypto.createHmac("sha256", process.env.key_secret).update(body).digest("hex")

  const isAuthentic = expectedSingnature === razorpay_signature

  if (isAuthentic) {

    await Payment.create({
      razorpay_order_id,
      razorpay_Payment_id,
      razorpay_signature

    })

    const user = await User.findById(req.user._id)

    const course = await Courses.findById(req.params.id)

    user.subscription.push(course._id)

    await user.save()

    res.status(200).json({
      message:"Course Purchase Successfull"

    })


  } else {
    return res.status(400).json({
      message: "payment failed"
    })
  }

})  