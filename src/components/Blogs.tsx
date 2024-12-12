import React, { useState, useEffect } from "react";
import axios from "axios";

interface BlogPost {
  name: string;
  category: string;
  thumbnail: string;
  title: string;
  published_date: string;
  user: string;
  tags: string[] | null;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const BlogArea: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.120:8012/api/resource/Website blogs?fields=[\"name\",\"category\",\"thumbnail\",\"title\",\"published_date\",\"user\",\"tags\"]"
        );
        const data = response.data.data.map((post: BlogPost) => ({
          ...post,
          tags: post.tags ? JSON.parse(post.tags) : [], // Parse stringified tags or set to an empty array
        }));
        setBlogPosts(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchData();
  }, []);

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
      selectedTags.every((tag) => post.tags?.includes(tag));
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
                  <div className="col-xl-4 col-md-6" key={post.name}>
                    <div className="blog__post-item shine__animate-item">
                      <div className="blog__post-thumb">
                        <a
                          className="shine__animate-link"
                          href={`/blogs/${post.name}`}
                        >
                          <img src={`http://192.168.1.120:8012/${post.thumbnail}`} alt={post.title} />
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
                              {formatDate(post.published_date)}
                            </li>
                            <li>
                              <i className="flaticon-user-1"></i>by{" "}
                              <a href={`/blogs/${post.name}`}>{post.user}</a>
                            </li>
                          </ul>
                        </div>
                        <h4 className="title">
                          <a href={`/blogs/${post.name}`}>{post.title}</a>
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
                    {[...new Set(blogPosts.flatMap((post) => post.tags || []))].map(
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
