// import React, { useState, useEffect, useRef } from 'react';

// const Carousel: React.FC = () => {
//   const carouselContainer = useRef<HTMLDivElement | null>(null);
//   const [customCurrentIndex, setCustomCurrentIndex] = useState<number>(1); // Start from the first real image
//   const [totalImages, setTotalImages] = useState<NodeListOf<HTMLImageElement>>(
//     [] as NodeListOf<HTMLImageElement>
//   );
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [modalImageSrc, setModalImageSrc] = useState<string>('');

//   // Hardcoded array of images inside the component
//   const images: string[] = [
//     '/img/testimonial-1.png',
//     '/img/testimonial-2.png',
//     '/img/testimonial-3.png',
//     '/img/testimonial-4.png',
//   ];

//   // Create an array of images with duplicates for looping
//   const loopedImages = [...images, images[0]]; // Duplicate the first image and add it at the end

//   useEffect(() => {
//     const imagesElements = document.querySelectorAll('.custom-carousel-image');
//     setTotalImages(imagesElements);

//     const firstImage = imagesElements[0].cloneNode(true) as HTMLImageElement;
//     const lastImage = imagesElements[imagesElements.length - 1].cloneNode(true) as HTMLImageElement;

//     if (carouselContainer.current) {
//       carouselContainer.current.appendChild(firstImage); // Append the first image to the end
//       carouselContainer.current.insertBefore(lastImage, imagesElements[0]); // Insert the last image at the beginning
//     }

//     // Re-query totalImages after duplicates have been added
//     setTotalImages(document.querySelectorAll('.custom-carousel-image'));
//   }, []);

//   const initializeCarousel = () => {
//     if (totalImages.length > 0) {
//       const width = totalImages[0].clientWidth + 40; // Include margin
//       if (carouselContainer.current) {
//         carouselContainer.current.style.transition = 'none'; // Disable transition for initial positioning
//         carouselContainer.current.style.transform = `translateX(${-customCurrentIndex * width}px)`;
//       }
//     }
//   };

//   const showCustomSlide = (index: number) => {
//     if (totalImages.length > 0) {
//       const width = totalImages[0].clientWidth + 40; // Include margin
//       if (carouselContainer.current) {
//         carouselContainer.current.style.transition = 'transform 0.5s ease-in-out';
//         carouselContainer.current.style.transform = `translateX(${-index * width}px)`;
//       }
//     }
//   };

//   const customNextSlide = () => {
//     const nextIndex = customCurrentIndex + 1;
//     const totalImagesCount = totalImages.length;

//     // When we reach the last image (which is a duplicate), reset the index to 1 (skipping the duplicate)
//     if (nextIndex === totalImagesCount) {
//       setCustomCurrentIndex(1);
//       if (carouselContainer.current) {
//         const width = totalImages[0].clientWidth + 40; // Include margin
//         carouselContainer.current.style.transition = 'none'; // Disable transition
//         carouselContainer.current.style.transform = `translateX(0px)`; // Jump to the first image
//         setTimeout(() => {
//           carouselContainer.current!.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
//           showCustomSlide(1); // Show the first image properly
//         }, 50);
//       }
//     } else {
//       setCustomCurrentIndex(nextIndex);
//     }
//   };

//   const customPrevSlide = () => {
//     const prevIndex = customCurrentIndex - 1;

//     // When we reach the first image (which is a duplicate), reset the index to the last real image
//     if (prevIndex === 0) {
//       setCustomCurrentIndex(totalImages.length - 2);
//       if (carouselContainer.current) {
//         const width = totalImages[0].clientWidth + 40; // Include margin
//         carouselContainer.current.style.transition = 'none'; // Disable transition
//         carouselContainer.current.style.transform = `translateX(${
//           -(totalImages.length - 2) * width
//         }px)`; // Jump to the last real image
//         setTimeout(() => {
//           carouselContainer.current!.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
//           showCustomSlide(prevIndex); // Show the previous image properly
//         }, 50);
//       }
//     } else {
//       setCustomCurrentIndex(prevIndex);
//     }
//   };

//   const openCustomImage = (imageSrc: string) => {
//     setModalImageSrc(imageSrc);
//     setIsModalOpen(true);
//   };

//   const closeCustomImage = () => {
//     setIsModalOpen(false);
//   };

//   // Autoplay functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       customNextSlide();
//     }, 3000); // Adjust interval time as needed
//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [customCurrentIndex]);

//   useEffect(() => {
//     initializeCarousel();
//   }, [customCurrentIndex, totalImages]);

//   return (
//     <div className="custom-carousel-container">
//       <div id="custom-carousel" className="custom-carousel" ref={carouselContainer}>
//         {loopedImages.map((imageSrc, index) => (
//           <img
//             key={index}
//             src={imageSrc}
//             alt={`Image ${index + 1}`}
//             className="custom-carousel-image"
//             onClick={() => openCustomImage(imageSrc)} // Pass imageSrc instead of DOM element
//           />
//         ))}
//       </div>
//       <button
//         id="custom-prev-btn"
//         className="custom-carousel-btn custom-prev"
//         onClick={customPrevSlide}
//       >
//         ❮
//       </button>
//       <button
//         id="custom-next-btn"
//         className="custom-carousel-btn custom-next"
//         onClick={customNextSlide}
//       >
//         ❯
//       </button>

//       {/* Fullscreen modal */}
//       {isModalOpen && (
//         <div id="custom-image-modal" className="custom-image-modal">
//           <span className="custom-close" onClick={closeCustomImage}>
//             ×
//           </span>
//           <img
//             id="custom-modal-image"
//             className="custom-modal-content"
//             src={modalImageSrc}
//             alt="Modal Content"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Carousel;  

// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// type Carousel = {
//   images: string[]; // Array of image URLs
// };

// const ResponsiveCarousel: React.FC<CarouselProps> = ({ images }) => {
//   // Slider settings
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 768, // Mobile breakpoint
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//     arrows: true, // Slider buttons
//   };

//   return (
//     <div style={{ margin: "0 auto", maxWidth: "800px" }}>
//       <Slider {...settings}>
//         {images.map((image, index) => (
//           <div key={index}>
//             <img
//               src={image}
//               alt={`Slide ${index + 1}`}
//               style={{ width: "100%", height: "auto", borderRadius: "8px" }}
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default ResponsiveCarousel;

// Example usage:
// const images = [
//   "https://via.placeholder.com/300",
//   "https://via.placeholder.com/301",
//   "https://via.placeholder.com/302",
// ];
// <ResponsiveCarousel images={images} />
