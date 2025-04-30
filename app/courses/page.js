"use client";

import { useState } from "react";
import Link from "next/link";
import { LinearProgress } from "@mui/material";

import GridViewIcon from "@mui/icons-material/GridView";
import ViewStreamIcon from "@mui/icons-material/ViewStream";

export default function CoursesPage() {
  const [view, setView] = useState("grid");
  const [activeTab, setActiveTab] = useState("All");

  const courses = [
    {
      id: 1,
      title: "Digital Marketing Fundamentals",
      instructor: "Heinrich Wulff",
      progress: 20,
      activities: { completed: 1, total: 5 },
      image: "/images/courses/digital-marketing.jpg",
      status: "in progress",
    },
    {
      id: 2,
      title: "Data Analysis with Spreadsheets",
      instructor: "Heinrich Wulff",
      progress: 40,
      activities: { completed: 2, total: 5 },
      image: "/images/courses/data-analysis.jpg",
      status: "in progress",
    },
    {
      id: 3,
      title: "Project Management Essentials",
      instructor: "Heinrich Wulff",
      progress: 20,
      activities: { completed: 1, total: 5 },
      image: "/images/courses/project-management.jpg",
      status: "in progress",
    },
    {
      id: 4,
      title: "Basic Programming with Python",
      instructor: "Heinrich Wulff",
      progress: 0,
      activities: { completed: 0, total: 0 },
      image: "/images/courses/python-programming.jpg",
      status: "unavailable",
    },
    {
      id: 5,
      title: "Customer Service Basics",
      instructor: "Heinrich Wulff",
      progress: 90,
      activities: { completed: 9, total: 10 },
      image: "/images/courses/customer-service.jpg",
      status: "in progress",
    },
    {
      id: 6,
      title: "Website Design UI/UX",
      instructor: "Heinrich Wulff",
      progress: 100,
      activities: { completed: 12, total: 12 },
      image: "/images/courses/web-design.jpg",
      status: "completed",
    },
    {
      id: 7,
      title: "Visual Graphic Designing",
      instructor: "Heinrich Wulff",
      progress: 0,
      activities: { completed: 0, total: 0 },
      image: "/images/courses/graphic-designing.jpg",
      status: "not started",
    },
  ];

  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "In Progress" },
    { id: 3, name: "Completed" },
    { id: 4, name: "Not Started" },
    { id: 5, name: "Unavailable" },
  ];

  const filteredCourses =
    activeTab === "All"
      ? courses
      : courses.filter((course) =>
          activeTab === "In Progress"
            ? course.status === "in progress"
            : activeTab === "Completed"
            ? course.status === "completed"
            : activeTab === "Not Started"
            ? course.status === "not started"
            : activeTab === "Unavailable"
            ? course.status === "unavailable"
            : true
        );

  return (
    <div className="courses-container">
      <h1 className="courses-header">My Courses</h1>
      <div className="courses-toolbar">
        <div className="categories-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.name)}
              className={`category-tab ${
                activeTab === category.name ? "active-tab" : "inactive-tab"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="view-toggle">
          <button
            onClick={() => setView("grid")}
            className={`view-button ${
              view === "grid" ? "active-view" : "inactive-view"
            }`}
            aria-label="Grid View"
          >
            <GridViewIcon />
          </button>
          <button
            onClick={() => setView("list")}
            className={`view-button ${
              view === "list" ? "active-view" : "inactive-view"
            }`}
            aria-label="List View"
          >
            <ViewStreamIcon />
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <CourseCardGrid key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="courses-list">
          {filteredCourses.map((course) => (
            <CourseCardHorizontal key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

function CourseCardGrid({ course }) {
  return (
    <div className="course-card-grid">
      <img
        src={course.image}
        alt={course.title}
        className="course-image-grid"
      />
      <div className="course-details-grid">
        <h3 className="course-title">{course.title}</h3>
        <div className="course-instructor">
          <img
            src="/images/professor-profile.jpg"
            alt={course.instructor}
            className="instructor-avatar"
          />
          <span className="instructor-name">{course.instructor}</span>
        </div>
        <p className="course-progress-text">
          {course.status === "unavailable"
            ? "Course no longer available"
            : `${course.activities.completed} out of ${course.activities.total} activities completed`}
        </p>
        {course.status !== "unavailable" && (
          <>
            <LinearProgress
              variant="determinate"
              value={course.progress}
              className="course-progress-bar"
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "#e5e7eb",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#22c55e",
                },
              }}
            />
            <p className="course-progress-percentage">
              {course.progress}% Course Completed
            </p>
          </>
        )}
      </div>
      <div className="course-actions">
        <Link href={`/course/${course.id}`} className="view-course-button">
          View Course
        </Link>
      </div>
    </div>
  );
}

function CourseCardHorizontal({ course }) {
  return (
    <div className="course-card-horizontal">
      <img
        src={course.image}
        alt={course.title}
        className="course-image-horizontal"
      />
      <div className="course-details-horizontal">
        <div className="course-info-horizontal">
          <h3 className="course-title">{course.title}</h3>
          <div className="course-instructor">
            <img
              src="/images/professor-profile.jpg"
              alt={course.instructor}
              className="instructor-avatar"
            />
            <span className="instructor-name">{course.instructor}</span>
          </div>
          <p className="course-progress-text">
            {course.status === "unavailable"
              ? "Course no longer available"
              : `${course.activities.completed} out of ${course.activities.total} activities completed`}
          </p>
          {course.status !== "unavailable" && (
            <div className="course-progress-container">
              <LinearProgress
                variant="determinate"
                value={course.progress}
                className="course-progress-bar"
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#e5e7eb",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#22c55e",
                  },
                }}
              />
              <p className="course-progress-percentage">
                {course.progress}% Course Completed
              </p>
          <Link href={`/course/${course.id}`} className="view-course-button-horizontal">
            View Course
          </Link>

            </div>
          )}
        </div>
        <div className="course-actions-horizontal">

        </div>
      </div>
    </div>
  );
}