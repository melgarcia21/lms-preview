import Link from 'next/link';

export default function CourseCardHorizontal({ course }) {
  const imagePlaceholders = {
    "/placeholder-digital-marketing.jpg": "bg-blue-100",
    "/placeholder-web-design.jpg": "bg-purple-100",
    "/placeholder-graphic-design.jpg": "bg-gray-100",
    "/placeholder-python.jpg": "bg-green-100",
  };
  const backgroundClass = imagePlaceholders[course.image] || "bg-gray-200";
  
  return (
    <div className="course-card-horizontal">
      <div className={`course-card-horizontal-image ${backgroundClass}`}>
        {course.level && (
          <span className="course-card-horizontal-level">{course.level}</span>
        )}
      </div>
      <div className="course-card-horizontal-content">
        <div className="course-card-horizontal-main">
          <h3 className="course-card-horizontal-title">{course.title}</h3>
          <p className="course-card-horizontal-description">
            {course.description || "Learn the fundamentals and advanced techniques in this comprehensive course."}
          </p>
        </div>
        <div className="course-card-horizontal-footer">
          <div className="course-card-horizontal-instructor">
            <div className="course-card-horizontal-avatar"></div>
            <span>{course.instructor}</span>
          </div>
          <div className="course-card-horizontal-details">
            <div className="course-card-horizontal-rating">
              <span className="course-card-horizontal-star">★</span>
              <span>{course.rating} ({course.ratingCount})</span>
            </div>
            <div className="course-card-horizontal-divider">|</div>
            <div className="course-card-horizontal-enrolled">
              <svg className="course-card-horizontal-enrolled-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>{course.enrolled} Enrolled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}