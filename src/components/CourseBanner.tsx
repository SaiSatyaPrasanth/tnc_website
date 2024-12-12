import React, { useState, useEffect } from 'react';
import "../styles/slider.css";

type LandingPageBanner = {
  name1: string; // The name of the banner
  image: string; // The image URL
};

const BannerComponent = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slides, setSlides] = useState<string[]>([]); // Holds image URLs fetched from the API

  // Function to move the slide based on direction (1 for next, -1 for prev)
  const moveSlide = (direction: number) => {
    const totalSlides = slides.length;
    setCurrentIndex((prevIndex) => (prevIndex + direction + totalSlides) % totalSlides);
  };

  // Function to go to a specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Fetch images from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.120:8012/api/method/course_management.course_management.doctype.website_banner_setting.website_banner_setting.get_home_page_banners"
        );
        const data = await response.json();

        // Extract image URLs from the landing_page array
        const banners: LandingPageBanner[] = data.message.courses_page || [];
        const imageUrls = banners.map((banner) => banner.image);
        setSlides(imageUrls);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);


  // Effect to handle auto sliding every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      moveSlide(1); // Auto slide to the next slide every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides]);

  return (
    <div className="slider">
      <div
        className="slides"
        style={{ transform: `translateX(${-currentIndex * 100}%)` }}
      >
        {slides.map((src, index) => (
          <img key={index} src={`http://192.168.1.120:8012/${src}`} alt={`Image ${index + 1}`} />
        ))}
      </div>
      <div className="pagination">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerComponent;