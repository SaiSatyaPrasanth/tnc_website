
import React, { useState, useMemo } from 'react';

const coursesData = [
  {
    id:1,
    thumbnail: "/img/courses/course_thumb01.jpg",
    category: "NORCET",
    title: "NORCET Preparation Course 2024",
    description:
      "The NORCET Preparation Course 2024 equips nursing students with essential knowledge and skills to excel in the Nursing Officer Recruitment Common Eligibility Test (NORCET).",
    old_price: "\u20b918,000",
    discount_price: "15,000",
    popularity: "Most Popular",
  },
  {
    id:2,
    thumbnail: "/img/courses/course_thumb02.jpg",
    category: "RRB Staff Nursing",
    title: "RRB Staff Nursing Exam 2024 Preparation",
    description:
      "The RRB Staff Nursing Exam 2024 Preparation course equips students with essential knowledge and skills to excel in the exam, focusing on nursing theory and practical applications.",
    old_price: "18,500",
    discount_price: "\u20b915,000",
    popularity: "Popular",
  },
  {
    id:3,
    thumbnail: "/img/courses/course_thumb03.jpg",
    category: "KGMU EXAM",
    title: "KGMU Nursing Exam Preparation 2024",
    description:
      "The KGMU Nursing Exam Preparation course equips students with essential knowledge and skills to excel in the KGMU nursing entrance exam, enhancing their chances of success.",
    old_price: null,
    discount_price: "\u20b915,000",
    popularity: "Latest",
  },
  {
    id:4,
    thumbnail: "/img/courses/course_thumb04.jpg",
    category: "Nursing Exams",
    title: "State Level Nursing Exam Preparation 2024",
    description:
      "The State Level Nursing Exam Preparation course for 2024 equips students with essential knowledge and skills to excel in state-specific nursing exams, including comprehensive study materials, practice tests, and expert guidance.",
    old_price: null,
    discount_price: "\u20b920,000",
    popularity: "Average Rating",
  },
  {
    id:5,
    thumbnail: "/img/courses/course_thumb01.jpg",
    category: "NORCET",
    title: "NORCET Preparation Course 2025",
    description:
      "The NORCET Preparation Course 2025 equips nursing students with essential knowledge and skills to excel in the Nursing Officer Recruitment Common Eligibility Test (NORCET).",
    old_price: "\u20b922,000",
    discount_price: "20,000",
    popularity: "Most Popular",
  },
  {
    id:6,
    thumbnail: "/img/courses/course_thumb02.jpg",
    category: "RRB Staff Nursing",
    title: "RRB Staff Nursing Exam 2024 Preparation",
    description:
      "The RRB Staff Nursing Exam 2024 Preparation course equips students with essential knowledge and skills to excel in the exam, focusing on nursing theory and practical applications.",
    old_price: "18,500",
    discount_price: "\u20b915,000",
    popularity: "Popular",
  }

];

const Courses = () => {
  const [sortOption, setSortOption] = useState("Most Popular");
  const [filterOption, setFilterOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4; // Set how many courses per page

  // Sorting order to be used for comparison in the sort method
  const order = ["Most Popular", "Popular", "Latest", "Average Rating"];

  // Function to handle the change in sort option
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Function to handle the change in filter option
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  // Filter the courses data based on selected popularity filter
  const filteredCourses = useMemo(() => {
    if (filterOption === "") {
      return [...coursesData]; // Return all courses if no filter is selected
    }
    return coursesData.filter(course => course.popularity === filterOption);
  }, [filterOption]);

  // Sorting the filtered courses based on selected popularity option
  const sortedCourses = useMemo(() => {
    return filteredCourses.sort((a, b) => {
      return order.indexOf(a.popularity) - order.indexOf(b.popularity);
    });
  }, [filteredCourses, sortOption]);

  // Calculate total pages
  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);

  // Get courses for the current page
  const currentCourses = useMemo(() => {
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    return sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  }, [sortedCourses, currentPage]);

  // Handle page click
  const handlePageClick = (pageNumber:any) => {
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
                    <div className="courses-top-right m-0 ms-md-auto">
                      <span className="sort-by">Sort By:</span>
                      <div className="courses-top-right-select">
                        <select
                          name="orderby"
                          className="orderby"
                          value={sortOption}
                          onChange={handleSortChange}
                        >
                          <option value="Most Popular">Most Popular</option>
                          <option value="Popular">Popular</option>
                          <option value="Latest">Latest</option>
                          <option value="Average Rating">Average Rating</option>
                        </select>
                      </div>
                    </div>
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
                    <div className="col" data-aos="fade-up" data-aos-delay={250 + index * 50} key={index}>
                      <div className="courses__item courses__item-three shine__animate-item">
                        <div className="courses__item-thumb">
                          <a className="shine__animate-link" href="course-details.html">
                            <img src={course.thumbnail} alt="img" />
                          </a>
                        </div>
                        <div className="courses__item-content">
                          <ul className="courses__item-meta list-wrap">
                            <li className="courses__item-tag">
                              <a href="course.html">{course.category}</a>
                            </li>
                            <li className="price">
                              {course.old_price && <del>{course.old_price}</del>}
                              {course.discount_price}
                            </li>
                          </ul>
                          <h5 className="title">
                            <a href="course-details.html">{course.title}</a>
                          </h5>
                          <p className="info">{course.description}</p>
                          <div className="courses__item-bottom">
                            <div className="button">
                              <a href={`/courses/${course.id}`}>
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
