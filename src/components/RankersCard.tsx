import React, { useState, useEffect } from "react";
import axios from "axios";

interface Course {
  thumbnail: string;
  rank: string;
  name1: string;
  registration_number: string;
  year: string;
  exam: string;
}

const Courses: React.FC = () => {
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          'http://192.168.1.120:8012/api/resource/Rankers?fields=["name1","registration_number","thumbnail","exam","year","rank"]'
        );
        setCoursesData(response.data.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
                          value="NORCET"
                          id="cat_1"
                          onChange={() => handleExamChange("NORCET")}
                        />
                        <label className="form-check-label" htmlFor="cat_1">
                          NORCET
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
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : filteredCourses.length > 0 ? (
                    filteredCourses.map((course, index) => (
                      <div className="col" key={index}>
                        <div className="courses__item shine__animate-item">
                          <div className="courses__item-thumb">
                            <a className="shine__animate-link" href="/courses">
                              <img src={`http://192.168.1.120:8012/${course.thumbnail}`} alt="img" />
                            </a>
                          </div>
                          <div className="courses__item-content">
                            <ul className="courses__item-meta list-wrap">
                              <li className="courses__item-tag">
                                <a href="course.html">{course.rank}</a>
                              </li>
                            </ul>
                            <h5 className="title">{course.name1}</h5>
                            <p>Reg No: {course.registration_number}</p>
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
