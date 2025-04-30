"use client";

import React from "react";
import { useState } from 'react';
import Link from 'next/link';

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
    <div className="bg-gray-100 min-h-screen p-6 mx-100">
      <div className="mb-6">
        <Link href="/courses">
          <div className="flex items-center text-blue-600 hover:text-blue-800">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to My Courses
          </div>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="bg-blue-100 h-48 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-blue-900">{courseData.title}</h1>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
            <div>
              <div className="font-semibold">{courseData.instructor}</div>
              <div className="text-sm text-gray-600">Course Instructor</div>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">{courseData.description}</p>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Course Progress</span>
              <span className="text-sm font-medium text-gray-700">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              {completedLessons} of {totalLessons} lessons completed
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Course Content</h2>
        
        <div className="space-y-4">
          {courseData.modules.map((module) => (
            <div key={module.id} className="border rounded-lg overflow-hidden">
              <button
                className={`w-full flex justify-between items-center p-4 text-left font-medium ${
                  activeModule === module.id ? 'bg-blue-50 text-blue-700' : 'bg-gray-50'
                }`}
                onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
              >
                <span>{module.title}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    activeModule === module.id ? 'transform rotate-180' : '' 
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeModule === module.id && (
                <div className="divide-y">
                  {module.lessons.map((lesson) => (
                    <div key={lesson.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          lesson.completed ? 'bg-green-500' : 'border border-gray-300'
                        }`}>
                          {lesson.completed && (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={lesson.completed ? 'text-gray-500' : ''}>{lesson.title}</span>
                      </div>
                      <div className="text-sm text-gray-500">{lesson.duration}</div>
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