// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/slider.css";

// type Props = {};

// const Banner = (props: Props) => {
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const [slides, setSlides] = useState<string[]>([]); // To store image URLs fetched from API

//   // Function to move the slide based on direction (1 for next, -1 for prev)
//   const moveSlide = (direction: number) => {
//     const totalSlides = slides.length;
//     setCurrentIndex(
//       (prevIndex) => (prevIndex + direction + totalSlides) % totalSlides
//     );
//   };

//   // Function to go to a specific slide
//   const goToSlide = (index: number) => {
//     setCurrentIndex(index);
//   };

//   // Fetching data from the API to populate the images
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get(
//           'https://demoerp.360ithub.com/api/resource/Test%20Testimonial?fields=["attachment"]'
//         );
//         const data = response.data.data; // Assuming the data is in this format
//         const imageUrls = data.map(
//           (item: { attachment: string }) => item.attachment
//         );
//         setSlides(imageUrls); // Set the fetched image URLs to the state
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     };

//     fetchImages(); // Call the function to fetch images
//   }, []);

//   // Effect to handle auto sliding every 5 seconds
//   useEffect(() => {
//     if (slides.length === 0) return; // Wait until images are loaded
//     const interval = setInterval(() => {
//       moveSlide(1); // Auto slide to the next slide every 5 seconds
//     }, 5000);

//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, [slides]); // Re-run effect when slides are updated

//   return (
//     <div className="slider">
//       <div
//         className="slides"
//         style={{
//           transform: `translateX(${-currentIndex * 100}%)`,
//           transition: "transform 0.5s ease-in-out", // Smooth transition for sliding
//         }}
//       >
//         {slides.map((src, index) => (
//           <div className="slide" key={index}>
//             <img
//               src={`https://demoerp.360ithub.com${src}`}
//               alt={`Image ${index + 1}`}
//             />
//           </div>
//         ))}
//       </div>
//       <div className="pagination">
//         {slides.map((_, index) => (
//           <span
//             key={index}
//             className={`dot ${index === currentIndex ? "active" : ""}`}
//             onClick={() => goToSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Banner;


////////////////////// Without API Call ///////////////////////

// import React, { useState, useEffect } from 'react';
// import "../styles/slider.css";

// type Props = {};

// const Banner = (props: Props) => {
//   const [currentIndex, setCurrentIndex] = useState<number>(0);

//   // List of image sources for the slider
//   const slides = [
//     "/img/Course-slider.jpg",
//     "/img/Course-slider-1.jpg",
//     "/img/TNC.jpg"
//   ];

//   // Function to move the slide based on direction (1 for next, -1 for prev)
//   const moveSlide = (direction: number) => {
//     const totalSlides = slides.length;
//     setCurrentIndex((prevIndex) => (prevIndex + direction + totalSlides) % totalSlides);
//   };

//   // Function to go to a specific slide
//   const goToSlide = (index: number) => {
//     setCurrentIndex(index);
//   };

//   // Effect to handle auto sliding every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       moveSlide(1); // Auto slide to the next slide every 5 seconds
//     }, 5000);

//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, []);

//   return (
//     <div className="slider">
//       <div
//         className="slides"
//         style={{ transform: `translateX(${-currentIndex * 100}%)` }}
//       >
//         {slides.map((src, index) => (
//           <img key={index} src={src} alt={`Image ${index + 1}`} />
//         ))}
//       </div>
//       <div className="pagination">
//         {slides.map((_, index) => (
//           <span
//             key={index}
//             className={`dot ${index === currentIndex ? 'active' : ''}`}
//             onClick={() => goToSlide(index)}
//           />
//         ))}
//       </div>

//     </div>
//   );
// };

// export default Banner;

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
        const banners: LandingPageBanner[] = data.message.landing_page || [];
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
