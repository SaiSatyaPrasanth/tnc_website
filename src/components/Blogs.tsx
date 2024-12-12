import React, { useState } from "react";

interface BlogPost {
  id: number;
  thumbnail: string;
  category: string;
  uploaded_date: string; // Adjusted to string to match the provided structure
  uploaded_by: string;
  title: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    thumbnail: "/img/blog/blog_post01.jpg",
    category: "Exam Preparation",
    uploaded_date: "01-10-2024",
    uploaded_by: "Admin",
    title: "Proven Study Tips to Master NORCET Exam Preparation",
    tags: ["NORCET", "ExamPrep", "Success", "Motivation"],
  },
  {
    id: 2,
    thumbnail: "/img/blog/blog_post02.jpg",
    category: "Exam Strategies",
    uploaded_date: "28-09-2024",
    uploaded_by: "Admin",
    title: "Top Strategies to Ace State-Level Nursing Exams",
    tags: ["Strategies", "Nursing", "State-Level", "Exams"],
  },
  {
    id: 3,
    thumbnail: "/img/blog/blog_post03.jpg",
    category: "Nursing",
    uploaded_date: "30-09-2024",
    uploaded_by: "Admin",
    title: "Key Subjects to Focus on for NORCET Success",
    tags: ["NORCET", "Subjects", "Focus", "Nursing"],
  },
  {
    id: 4,
    thumbnail: "/img/blog/blog_post04.jpg",
    category: "Study Techniques",
    uploaded_date: "03-10-2024",
    uploaded_by: "Admin",
    title: "Balancing Online & Offline Nursing Exam Studies",
    tags: ["Study", "Online", "Offline", "Balance"],
  },
  {
    id: 5,
    thumbnail: "/img/blog/blog_post05.jpg",
    category: "RRB Nurse Prep",
    uploaded_date: "30-09-2024",
    uploaded_by: "Admin",
    title: "Effective Study Techniques for RRB Staff Nurse",
    tags: ["RRB", "Staff", "Nurse", "StudyTechniques"],
  },
  {
    id: 6,
    thumbnail: "/img/blog/blog_post06.jpg",
    category: "Study Resources",
    uploaded_date: "27-09-2024",
    uploaded_by: "Admin",
    title: "Must-Have Resources for Nursing Exam Success",
    tags: ["Resources", "Nursing", "Exam", "Success"],
  },
  {
    id: 7,
    thumbnail: "/img/blog/blog_post07.jpg",
    category: "KGMU Exam",
    uploaded_date: "02-10-2024",
    uploaded_by: "Admin",
    title: "Your Ultimate Guide to KGMU Exam Preparation",
    tags: ["KGMU", "Exam", "Guide", "Preparation"],
  },
  {
    id: 8,
    thumbnail: "/img/blog/blog_post08.jpg",
    category: "Success Stories",
    uploaded_date: "26-09-2024",
    uploaded_by: "Admin",
    title: "TNC Nursing’s High Success Rates in Exams",
    tags: ["Success", "TNC", "Nursing", "Exams"],
  },
  {
    id: 9,
    thumbnail: "/img/blog/blog_post09.jpg",
    category: "Exam Success",
    uploaded_date: "03-10-2024",
    uploaded_by: "Admin",
    title: "Common Mistakes to Avoid in Nursing Exams",
    tags: ["Mistakes", "Nursing", "Exams", "Avoid"],
  },
];

const formatDate = (dateString: string): string => {
  const [day, month, year] = dateString.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const BlogArea: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory
      ? post.category === selectedCategory
      : true;
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => post.tags.includes(tag));
    return matchesCategory && matchesTags;
  });

  return (
    <main className="main-area fix">
      <section
        className="blog-area section-py-120"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-8">
              <div className="row gutter-20">
                {filteredPosts.map((post) => (
                  <div className="col-xl-4 col-md-6" key={post.id}>
                    <div className="blog__post-item shine__animate-item">
                      <div className="blog__post-thumb">
                        <a
                          className="shine__animate-link"
                          href={`/blogs/${post.id}`}
                        >
                          <img src={post.thumbnail} alt="img" />
                        </a>

                        <a href="blog.html" className="post-tag">
                          {post.category}
                        </a>
                      </div>
                      <div className="blog__post-content">
                        <div className="blog__post-meta">
                          <ul className="list-wrap">
                            <li>
                              <i className="flaticon-calendar"></i>
                              {formatDate(post.uploaded_date)}
                            </li>
                            <li>
                              <i className="flaticon-user-1"></i>by{" "}
                              <a href="blog-details.html">{post.uploaded_by}</a>
                            </li>
                          </ul>
                        </div>
                        <h4 className="title">
                          <a href="blog-details.html">{post.title}</a>
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filteredPosts.length === 0 && (
                <p>No posts match the selected filters.</p>
              )}
            </div>
            <div
              className="col-xl-3 col-lg-4"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <aside className="blog-sidebar">
                <div className="blog-widget">
                  <h4 className="widget-title">Categories</h4>
                  <div className="shop-cat-list">
                    <ul className="list-wrap">
                      {/* <i className="flaticon-angle-right"></i> */}
                      {[...new Set(blogPosts.map((post) => post.category))].map(
                        (category) => (
                          <li key={category}>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick(category);
                              }}
                              style={{
                                color:
                                  selectedCategory === category
                                    ? "white"
                                    : "red",
                                backgroundColor:
                                  selectedCategory === category
                                    ? "red"
                                    : "white",
                                padding: "10px",
                                borderRadius: "5px",
                                textDecoration: "none",
                                display: "inline-block",
                              }}
                            >
                              {category}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
                <div className="blog-widget">
                  <h4 className="widget-title">Tags</h4>
                  <div className="tagcloud">
                    {[...new Set(blogPosts.flatMap((post) => post.tags))].map(
                      (tag) => (
                        <a
                          href="#"
                          key={tag}
                          onClick={(e) => {
                            e.preventDefault();
                            handleTagClick(tag);
                          }}
                          style={{
                            display: "inline-block",
                            padding: "10px",
                            borderRadius: "5px",
                            backgroundColor: selectedTags.includes(tag)
                              ? "red"
                              : "white",
                            color: selectedTags.includes(tag) ? "white" : "red",
                            cursor: "pointer",
                            textDecoration: "none",
                            margin: "5px",
                          }}
                        >
                          {tag}
                        </a>
                      )
                    )}
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

export default BlogArea;
