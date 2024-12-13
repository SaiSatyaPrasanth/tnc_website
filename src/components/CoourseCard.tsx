import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "@/utils/api";

type CourseDetailsProps = {
  id: string;
};

type CourseData = {
  name: string;
  category: string;
  thumbnail: string;
  title: string;
  description: string;
  old_price: number;
  new_price: number;
  start_date: string;
};

const CourseDetails: React.FC<CourseDetailsProps> = ({ id }) => {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.120:8012/api/resource/Courses Page/${id}`
        );
        setCourseData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch course details.");
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="main-area fix">
      <section
        className="courses__details-area section-py-120"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <h2 className="title">{courseData?.title}</h2>
              <div className="courses__details-meta">
                <ul className="list-wrap">
                  <li className="date">
                    <i className="flaticon-calendar"></i>
                    Starts from {formatDate(courseData?.start_date)}
                  </li>
                  <li>
                    <i className="flaticon-mortarboard"></i>2,250 Students Enrolled
                  </li>
                </ul>
              </div>
              <div
                className="courses__details-thumb"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <img
                  src={`http://192.168.1.120:8012${courseData?.thumbnail}`}
                  alt="Course Thumbnail"
                  className="responsive-img"
                />
              </div>
              <div className="courses__details-content">
                <ul className="courses__item-meta list-wrap">
                  <li className="courses__item-tag">
                    <a href="course.html">{courseData?.category}</a>
                  </li>
                </ul>
                <ul
                  className="nav nav-tabs"
                  id="myTab"
                  role="tablist"
                  data-aos="fade-right"
                  data-aos-delay="500"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="overview-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#overview-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="overview-tab-pane"
                      aria-selected="true"
                    >
                      Overview
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="curriculum-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#curriculum-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="curriculum-tab-pane"
                      aria-selected="false"
                    >
                      Curriculum
                    </button>
                  </li>
                </ul>
                <div
                  className="tab-content"
                  id="myTabContent"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <div
                    className="tab-pane fade show active"
                    id="overview-tab-pane"
                    role="tabpanel"
                    aria-labelledby="overview-tab"
                    tabIndex={0}
                  >
                    <div className="courses__overview-wrap">
                      <h3 className="title">Course Description</h3>
                      <p>{courseData?.description}</p>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="curriculum-tab-pane"
                    role="tabpanel"
                    aria-labelledby="curriculum-tab"
                    tabIndex={0}
                  >
                    <div className="courses__curriculum-wrap">
                      <h3 className="title">Course Curriculum</h3>
                      <p>Details about the curriculum will go here.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CourseDetails;
