import React, { useState } from "react";

// Define the types for the course data
interface Course {
  thumbnail: string;
  rank: string;
  name: string;
  regNo: string;
  year:string;
  exam:string
}

// Sample data for the courses
const coursesData: Course[] = [
  {
    thumbnail: "/img/result.jpg",
    rank: "AIR 1 (NORCET 6.0)",
    name: "Anand Verma",
    regNo: "123456789",
    year:"2024",
    exam:"NORCET 6.0"
  },
  {
    thumbnail: "/img/result.jpg",
    rank: "AIR 2 (RRB Exams)",
    name: "Priya Sharma",
    regNo: "987654321",
    year:"2023",
    exam:"RRB Exams"

  },
  {
    thumbnail: "/img/result.jpg",
    rank: "AIR 1 (Statewise Nursing Exams)",
    name: "Vikash Kumar",
    regNo: "112233445",
    year:"2021",
    exam:"Statewise Nursing Exams"

  },
  {
    thumbnail: "/img/result.jpg",
    rank: "AIR 5 (Statewise Nursing Exams)",
    name: "Vikash Kumar",
    regNo: "112233445",
    year:"2022",
    exam:"Statewise Nursing Exams"

  },
  {
    thumbnail: "/img/result.jpg",
    rank: "AIR 2 (Statewise Nursing Exams)",
    name: "Vikash Kumar",
    regNo: "112233445",
    year:"2021",
    exam:"Statewise Nursing Exams"

  },
  // Add more course objects as needed
];


const Courses: React.FC = () => {
  // State for selected exams and years
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  // Handle checkbox change for exams
  const handleExamChange = (exam: string) => {
    setSelectedExams((prevSelected) =>
      prevSelected.includes(exam)
        ? prevSelected.filter((e) => e !== exam)
        : [...prevSelected, exam]
    );
  };

  // Handle checkbox change for years
  const handleYearChange = (year: string) => {
    setSelectedYears((prevSelected) =>
      prevSelected.includes(year)
        ? prevSelected.filter((y) => y !== year)
        : [...prevSelected, year]
    );
  };

  // Filter courses based on selected exams and years
  const filteredCourses = coursesData.filter(
    (course) =>
      (selectedExams.length === 0 || selectedExams.includes(course.exam)) &&
      (selectedYears.length === 0 || selectedYears.includes(course.year))
  );

  return (
    <section className="all-courses-area section-py-120">
      <div className="container">
        <div className="row">
          {/* Sidebar Section */}
          <div
            className="col-xl-3 col-lg-4 order-2 order-lg-0"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <aside className="courses__sidebar">
              {/* Exams Filter */}
              <div className="courses-widget">
                <h4 className="widget-title">Exams</h4>
                <div className="courses-cat-list">
                  <ul className="list-wrap">
                    <li>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="NORCET 6.0"
                          id="cat_1"
                          onChange={() => handleExamChange("NORCET 6.0")}
                        />
                        <label className="form-check-label" htmlFor="cat_1">
                          NORCET 6.0
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="KGMU Exams"
                          id="cat_2"
                          onChange={() => handleExamChange("KGMU Exams")}
                        />
                        <label className="form-check-label" htmlFor="cat_2">
                          KGMU Exams
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="RRB Exams"
                          id="cat_3"
                          onChange={() => handleExamChange("RRB Exams")}
                        />
                        <label className="form-check-label" htmlFor="cat_3">
                          RRB Exams
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Statewise Nursing Exams"
                          id="cat_4"
                          onChange={() =>
                            handleExamChange("Statewise Nursing Exams")
                          }
                        />
                        <label className="form-check-label" htmlFor="cat_4">
                          Statewise Nursing Exams
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Year Filter */}
              <div className="courses-widget">
                <h4 className="widget-title">Year</h4>
                <div className="courses-cat-list">
                  <ul className="list-wrap">
                    <li>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="2024"
                          id="lang_1"
                          onChange={() => handleYearChange("2024")}
                        />
                        <label className="form-check-label" htmlFor="lang_1">
                          2024
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="2023"
                          id="lang_2"
                          onChange={() => handleYearChange("2023")}
                        />
                        <label className="form-check-label" htmlFor="lang_2">
                          2023
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="2022"
                          id="lang_3"
                          onChange={() => handleYearChange("2022")}
                        />
                        <label className="form-check-label" htmlFor="lang_3">
                          2022
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="2021"
                          id="lang_4"
                          onChange={() => handleYearChange("2021")}
                        />
                        <label className="form-check-label" htmlFor="lang_4">
                          2021
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>

          {/* Courses Grid Section */}
          <div
            className="col-xl-9 col-lg-8"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="grid"
                role="tabpanel"
                aria-labelledby="grid-tab"
              >
                <div className="row courses__grid-wrap row-cols-1 row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-1">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course, index) => (
                      <div className="col" key={index}>
                        <div className="courses__item shine__animate-item">
                          <div className="courses__item-thumb">
                            <a className="shine__animate-link" href="course-details.html">
                              <img src={course.thumbnail} alt="img" />
                            </a>
                          </div>
                          <div className="courses__item-content">
                            <ul className="courses__item-meta list-wrap">
                              <li className="courses__item-tag">
                                <a href="course.html">{course.rank}</a>
                              </li>
                            </ul>
                            <h5 className="title">{course.name}</h5>
                            <p>Reg No: {course.regNo}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No courses match the selected filters.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;


