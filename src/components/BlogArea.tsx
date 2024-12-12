import React, { useState, useEffect } from 'react';

type BlogPost = {
  category: string;
  thumbnail: string;
  title: string;
  date: string;
  user: string;
};

const BlogPostArea: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  // Fetch blog posts from the API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.120:8012/api/resource/Website blogs?fields=["name","category","thumbnail","title","published_date","user"]`
        );
        const data = await response.json();
        if (data.data) {
          const posts = data.data.map((post: any) => ({
            category: post.category, // Adjust category if needed
            thumbnail: post.thumbnail,
            title: post.title,
            date: formatDate(post.published_date), // Format the date
            user: 'Admin', // Default user, adjust as needed
          }));
          setBlogPosts(posts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  // Function to format the date in desired format
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section
      className="blog__post-area-eight section-pt-100 section-pb-110"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="section__title text-center mb-50">
              <span className="sub-title">News & Blogs</span>
              <h2 className="title bold">Our Latest News Feed</h2>
              <p>Stay up-to-date with the latest news and announcements.</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {blogPosts.map((post, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="blog__post-item-six shine__animate-item">
                <div className="blog__post-thumb-six">
                  <a className="shine__animate-link" href="/blogs">
                    <img src={`http://192.168.1.120:8012/${post.thumbnail}`} alt="img" />
                  </a>
                  <a href="blog.html" className="post-tag-four">
                    {post.category}
                  </a>
                </div>
                <div className="blog__post-content-six">
                  <div className="blog__post-meta">
                    <ul className="list-wrap">
                      <li>
                        <i className="flaticon-calendar"></i>
                        {post.date}
                      </li>
                      <li>
                        <i className="flaticon-user-1"></i>
                        by <a href="blog-details.html">{post.user}</a>
                      </li>
                    </ul>
                  </div>
                  <h2 className="title">
                    <a href="/blogs">{post.title}</a>
                  </h2>
                  <a className="btn arrow-btn" href="/blogs">
                    Read More
                    <img
                      src="/img/icons/right_arrow.svg"
                      alt=""
                      className="injectable"
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPostArea;
