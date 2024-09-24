import React from 'react'
import './courses.css'
import { CourseData } from '../../context/courseContext'
import CourseCard from '../../components/courseCard/CourseCard'

const Courses = () => {
  const {courses} = CourseData()
  console.log(courses);
  
  return (
    <div className="courses">
      <h2>Available Courses</h2>
      <div className="course-container">
        {
          courses && courses.length>0? courses.map((e) =>(
            <CourseCard key={e._id} course={e}/>
          )) :<p>No Courses Yet</p>
        }
      </div>
    </div>
  )
}

export default Courses
