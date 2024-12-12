import React, { useState, useEffect } from 'react';
import { formatDate } from '@/utils/api';

interface Blog {
  name: string;
  category: string;
  thumbnail: string;
  title: string;
  published_date: string;
  user: string;
  tags: string | null; // Tags are initially received as a string
  description: string | null;
}

interface BlogPostProps {
  id: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ id }) => {
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.120:8012/api/resource/Website%20blogs?fields=["name","category","thumbnail","title","published_date","user","tags","description"]&filters=[["name","=","${id}"]]`
        );
        const data = await response.json();
        if (data?.data?.length > 0) {
          setBlog(data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const {
    title = 'Untitled',
    published_date = 'Unknown Date',
    thumbnail = '/placeholder-image.jpg',
    user = 'Unknown Author',
    tags = '[]', // Default to an empty array string
    description = 'No description available.',
    category = 'Uncategorized',
  } = blog;

  // Parse tags into an array
  let safeTags: string[];
  try {
    safeTags = JSON.parse(tags);
    if (!Array.isArray(safeTags)) {
      safeTags = [];
    }
  } catch {
    safeTags = [];
  }

  return (
    <main className="main-area fix">
      <section className="blog-details-area section-py-120" data-aos="fade-up" data-aos-delay="200">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-8">
              <h3 className="title" style={{ paddingBottom: '20px', fontSize: '36px' }} data-aos="fade-right" data-aos-delay="300">
                {title}
              </h3>
              <div className="blog__post-meta">
                <ul className="list-wrap">
                  <li>
                    <i className="flaticon-calendar"></i>
                    {formatDate(published_date)}
                  </li>
                  <li>
                    <i className="flaticon-user-1"></i> by <a href="#">{user}</a>
                  </li>
                  <li>
                    <i className="flaticon-clock"></i> 5 Min Read
                  </li>
                  <li>
                    <i className="far fa-comment-alt"></i> 05 Comments
                  </li>
                </ul>
              </div>
              <div className="blog__details-wrapper">
                <div className="blog__details-thumb">
                  <img src={`http://192.168.1.120:8012/${thumbnail}`} alt="Blog Thumbnail" />
                </div>
                <div className="blog__details-content">
                  <p>{description}</p>
                  {/* {safeTags.length > 0 ? (
                    <div className="blog__details-content-inner">
                      <h4 className="inner-title">Related Tags</h4>
                      <ul className="about__info-list list-wrap">
                        {safeTags.map((tag, index) => (
                          <li key={index} className="about__info-list-item">
                            <i className="flaticon-angle-right" />
                            <p className="content">{tag}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>No tags available.</p>
                  )} */}
                </div>
              </div>
              <div className="blog__details-bottom" data-aos="fade-up" data-aos-delay="500">
                <div className="row align-items-center">
                  <div className="col-xl-6 col-md-7">
                    <div className="tg-post-tag">
                      <h5 className="tag-title">Tags :</h5>
                      <ul className="list-wrap p-0 mb-0">
                        {safeTags.length > 0
                          ? safeTags.map((tag, index) => (
                              <li key={index}>
                                <a href="#">{tag}</a>
                              </li>
                            ))
                          : 'No tags available'}
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-5">
                    <div className="tg-post-social justify-content-start justify-content-md-end">
                      <h5 className="social-title">Share :</h5>
                      <ul className="list-wrap p-0 mb-0">
                        <li>
                          <a href="#">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-pinterest-p"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4" data-aos="fade-left" data-aos-delay="400">
                        <aside className="blog-sidebar">
                            <div className="blog-widget widget_search">
                                <div className="sidebar-search-form">
                                    <form action="#">
                                        <input type="text" placeholder="Search here"/>
                                        <button><i className="flaticon-search"></i></button>
                                    </form>
                                </div>
                            </div>
                            <div className="blog-widget">
                                <h4 className="widget-title">Latest Post</h4>
                                <div className="rc-post-item">
                                    <div className="rc-post-thumb">
                                        <a href='blog-details.html'>
                                            <img src="/img/blog/blog_post05.jpg" alt="img"/>
                                        </a>
                                    </div>
                                    <div className="rc-post-content">
                                        <span className="date"><i className="flaticon-calendar"></i>28 Sep, 2024</span>
                                        <h4 className="title"><a href='blog-details.html'>Study Techniques for RRB Staff Nurse</a></h4>
                                    </div>
                                </div>
                                <div className="rc-post-item">
                                    <div className="rc-post-thumb">
                                        <a href='blog-details.html'>
                                            <img src="/img/blog/blog_post03.jpg" alt="img"/>
                                        </a>
                                    </div>
                                    <div className="rc-post-content">
                                        <span className="date"><i className="flaticon-calendar"></i> 30 Sep, 2024</span>
                                        <h4 className="title"><a href='blog-details.html'>Key Subjects to Focus on for NORCET</a></h4>
                                    </div>
                                </div>
                                <div className="rc-post-item">
                                    <div className="rc-post-thumb">
                                        <a href='blog-details.html'>
                                            <img src="/img/blog/blog_post06.jpg" alt="img"/>
                                        </a>
                                    </div>
                                    <div className="rc-post-content">
                                        <span className="date"><i className="flaticon-calendar"></i>27 Sep, 2024</span>
                                        <h4 className="title"><a href='blog-details.html'>Must-Have Resources for Nursing Exam Success</a></h4>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-widget">
                                <h4 className="widget-title">Tags</h4>
                                <div className="tagcloud">
                                    <a href="#">NORCET Preparation</a>
                                    <a href="#">NORCET</a>
                                    <a href="#">MockTests</a>
                                    <a href="#">NursingExams</a>
                                </div>
                            </div>
                        </aside>
                    </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPost;
