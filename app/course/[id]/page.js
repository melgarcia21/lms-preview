"use client";

import React from "react";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CourseDetailPage({ params }) {
  const { id: courseId } = React.use(params);

  const courseData = {
    id: courseId,
    title: "Digital Marketing Fundamentals",
    description: "Learn the fundamentals of digital marketing including social media, SEO, email marketing, and analytics.",
    instructor: "Heinrich Wulff",
    progress: 20,
    activities: { completed: 1, total: 5 },
    image: "/images/professor-profile.jpg",
    status: "in progress",
    modules: [
      {
        id: 1,
        title: "Introduction to Digital Marketing",
        lessons: [
          { id: 101, title: "What is Digital Marketing?", duration: "15 min", completed: true },
          { id: 102, title: "The Digital Marketing Landscape", duration: "20 min", completed: false },
          { id: 103, title: "Setting Digital Marketing Goals", duration: "25 min", completed: false }
        ]
      },
      {
        id: 2,
        title: "Search Engine Optimization (SEO)",
        lessons: [
          { id: 201, title: "SEO Fundamentals", duration: "30 min", completed: false },
          { id: 202, title: "Keyword Research", duration: "25 min", completed: false },
          { id: 203, title: "On-Page SEO", duration: "20 min", completed: false }
        ]
      },
      {
        id: 3,
        title: "Social Media Marketing",
        lessons: [
          { id: 301, title: "Social Media Strategy", duration: "20 min", completed: false },
          { id: 302, title: "Content Creation for Social Media", duration: "25 min", completed: false },
          { id: 303, title: "Social Media Analytics", duration: "15 min", completed: false }
        ]
      },
      {
        id: 4,
        title: "Email Marketing",
        lessons: [
          { id: 401, title: "Email Marketing Basics", duration: "15 min", completed: false },
          { id: 402, title: "Building Email Lists", duration: "20 min", completed: false },
          { id: 403, title: "Creating Effective Email Campaigns", duration: "25 min", completed: false }
        ]
      },
      {
        id: 5,
        title: "Digital Marketing Analytics",
        lessons: [
          { id: 501, title: "Introduction to Analytics", duration: "20 min", completed: false },
          { id: 502, title: "Setting Up Google Analytics", duration: "30 min", completed: false },
          { id: 503, title: "Interpreting Analytics Data", duration: "25 min", completed: false }
        ]
      }
    ]
  };

  const [activeModule, setActiveModule] = useState(courseData.modules[0].id);


  const totalLessons = courseData.modules.reduce(
    (total, module) => total + module.lessons.length, 0
  );

  const completedLessons = courseData.modules.reduce(
    (total, module) => total + module.lessons.filter(lesson => lesson.completed).length, 0
  );

  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="course-detail-container">
      <div className="back-link-container">
        <Link href="/courses">
          <div className="back-link">
            <svg className="back-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Courses
          </div>
        </Link>
      </div>
      
      <div className="course-header-card">
        <div className="course-title-banner">
          <h1 className="course-title">{courseData.title}</h1>
        </div>
        
        <div className="course-info-container">
          <div className="instructor-profile">
            <div className="instructor-avatar">

            </div>
            <div className="instructor-info">
              <div className="instructor-name">{courseData.instructor}</div>
              <div className="instructor-role">Course Instructor</div>
            </div>
          </div>
          
          <p className="course-description">{courseData.description}</p>
          
          <div className="progress-section">
            <div className="progress-header">
              <span className="progress-label">Course Progress</span>
              <span className="progress-percentage">{progress}%</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-stats">
              {completedLessons} of {totalLessons} lessons completed
            </div>
          </div>
        </div>
      </div>
      
      <div className="course-content-container">
        <h2 className="content-header">Course Content</h2>
        
        <div className="modules-list">
          {courseData.modules.map((module) => (
            <div key={module.id} className="module-card">
              <button
                className={`module-button ${activeModule === module.id ? 'module-button-active' : ''}`}
                onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
              >
                <span>{module.title}</span>
                <svg
                  className={`chevron-icon ${activeModule === module.id ? 'chevron-rotate' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeModule === module.id && (
                <div className="lessons-list">
                  {module.lessons.map((lesson) => (
                    <div key={lesson.id} className="lesson-item">
                      <div className="lesson-content">
                        <div className={`completion-indicator ${lesson.completed ? 'completed' : ''}`}>
                          {lesson.completed && (
                            <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`lesson-title ${lesson.completed ? 'completed-text' : ''}`}>
                          {lesson.title}
                        </span>
                      </div>
                      <div className="lesson-duration">{lesson.duration}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}