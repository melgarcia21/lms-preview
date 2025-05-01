"use client";

import { useState } from "react";
import Image from "next/image";
import StatsCard from "../components/dashboard/StatsCard";
import Calendar from "../components/dashboard/Calendar";
import TodoList from "../components/dashboard/TodoList";

export default function Dashboard() {
  const userName = "Mel Garcia";
  const stats = [
    { id: 1, title: "Course Enrolled", value: 5, icon: "📚" },
    { id: 2, title: "Course Completed", value: 1, icon: "✅" },
    { id: 3, title: "Activities Completed", value: 25, icon: "✅" },
    { id: 4, title: "Activities Due", value: 4, icon: "⏰" },
  ];

  const recommendedCourses = [
    {
      id: 1,
      title: "Digital Marketing Fundamentals",
      instructor: "Heinrich Wulff",
      instructorProfile: "/images/professor-profile.jpg",
      level: "Intermediate",
      rating: 4.2,
      ratingCount: 6,
      enrolled: 14,
      image: "/images/courses/digital-marketing.jpg",
    },
    {
      id: 2,
      title: "Website Design UI/UX",
      instructor: "Heinrich Wulff",
      instructorProfile: "/images/professor-profile.jpg",
      level: "Intermediate",
      rating: 5,
      ratingCount: 9,
      enrolled: 25,
      image: "/images/courses/web-design.jpg",
    },
    {
      id: 3,
      title: "Visual Graphic Designing",
      instructor: "Heinrich Wulff",
      instructorProfile: "/images/professor-profile.jpg",
      level: "Intermediate",
      rating: 4.8,
      ratingCount: 46,
      enrolled: 76,
      image: "/images/courses/graphic-designing.jpg",
    },
    {
      id: 4,
      title: "Programming & Development with Python",
      instructor: "Heinrich Wulff",
      instructorProfile: "/images/professor-profile.jpg",
      level: "Advanced",
      rating: 5,
      ratingCount: 3,
      enrolled: 4,
      image: "/images/courses/python-programming.jpg",
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-header">Welcome, {userName}!</h1>

        <div className="stats-container">
          
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatsCard key={stat.id} {...stat} />
          ))}
        </div>

        </div>

        <h2 className="recommended-header">Recommended Courses</h2>
        <div className="courses-grid">
          {recommendedCourses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-image-container">
                {course.image && (
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="course-image"
                    priority
                  />
                )}
                {course.level && (
                  <span className="course-level">{course.level}</span>
                )}
              </div>
              <div className="course-details">
                <h3 className="course-title">{course.title}</h3>
                <div className="course-instructor">
                  <div className="instructor-avatar">
                    <Image src={course.instructorProfile} alt={course.instructor} width={50} height={50} className="rounded-4xl" />
                    </div>
                  <span className="instructor-name">{course.instructor}</span>
                </div>
                <div className="course-meta">
                  <div className="course-rating">★</div>
                  <span className="rating-text">
                    {course.rating} ({course.ratingCount})
                  </span>
                  <div className="divider">|</div>
                  <div className="course-enrollment">
                    <svg
                      className="enrollment-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span>{course.enrolled} Enrolled</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <Calendar />

        {/* To-Do List */}
        <TodoList />
      </div>
    </div>
  );
}