import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const Courses = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [filterOption, setFilterOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4; // Set how many courses per page

  // Fetch courses data from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.120:8012/api/resource/Courses Page?fields=[\"name\",\"category\",\"thumbnail\",\"title\",\"description\",\"old_price\",\"new_price\",\"popularity\"]"
        );
        setCoursesData(response.data.data);
      } catch (error) {
        console.error("Error fetching courses data:", error);
      }
    };
    fetchCourses();
  }, []);

  // Function to handle the change in filter option
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  // Filter the courses data based on selected popularity filter
  const filteredCourses = useMemo(() => {
    if (filterOption === "") {
      return [...coursesData]; // Return all courses if no filter is selected
    }
    return coursesData.filter((course) => course.popularity === filterOption);
  }, [coursesData, filterOption]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Get courses for the current page
  const currentCourses = useMemo(() => {
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    return filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  }, [filteredCourses, currentPage]);

  // Handle page click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="all-courses-area section-py-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="courses-top-wrap">
              <div className="row align-items-center">
                <div className="col-md-5">
                  <div className="courses-top-left"></div>
                </div>
                <div className="col-md-7">
                  <div className="d-flex justify-content-center justify-content-md-end align-items-center flex-wrap">
                    <div className="courses-top-right m-0 ms-md-auto ms-3">
                      <span className="sort-by">Filter By:</span>
                      <div className="courses-top-right-select">
                        <select
                          name="filterby"
                          className="orderby"
                          value={filterOption}
                          onChange={handleFilterChange}
                        >
                          <option value="">All</option>
                          <option value="Most Popular">Most Popular</option>
                          <option value="Popular">Popular</option>
                          <option value="Latest">Latest</option>
                          <option value="Average Rating">Average Rating</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-content" id="myTabContent" data-aos="fade-up" data-aos-delay="200">
              <div className="tab-pane fade show active" id="list" role="tabpanel" aria-labelledby="list-tab">
                <div className="row courses__list-wrap row-cols-1">
                  {currentCourses.map((course, index) => (
                    <div className="col" data-aos="fade-up" data-aos-delay={250 + index * 50} key={course.name}>
                      <div className="courses__item courses__item-three shine__animate-item">
                        <div className="courses__item-thumb">
                          <a className="shine__animate-link" href="course-details.html">
                            <img src={`http://192.168.1.120:8012/${course.thumbnail}`}alt="img" />
                          </a>
                        </div>
                        <div className="courses__item-content">
                          <ul className="courses__item-meta list-wrap">
                            <li className="courses__item-tag">
                              <a href="course.html">{course.category}</a>
                            </li>
                            <li className="price">
                              {course.old_price && <del>{course.old_price}</del>}
                              {course.new_price}
                            </li>
                          </ul>
                          <h5 className="title">
                            <a href="course-details.html">{course.title}</a>
                          </h5>
                          <p className="info">{course.description}</p>
                          <div className="courses__item-bottom">
                            <div className="button">
                              <a href={`/courses/${course.name}`}>
                                <span className="text">Enroll Now</span>
                                <i className="flaticon-arrow-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <nav className="pagination__wrap mt-30">
                  <ul className="list-wrap">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li key={index} className={currentPage === index + 1 ? "active" : ""}>
                        <a href="#" onClick={() => handlePageClick(index + 1)}>
                          {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
