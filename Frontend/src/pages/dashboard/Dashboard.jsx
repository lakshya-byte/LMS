import React from "react";
import "./dashboard.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/courseCard/CourseCard";

const Dashboard = () => {
  const { mycourse } = CourseData();

  return (
    <div className="student-dashboard">
      <h2>All Enrolled Courses</h2>
      <div className="dashboard-content">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((e) => 
          
          
          <CourseCard course={e} key={e._id}/>)
        ) : (
          <p> No Courses Enrolled</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
