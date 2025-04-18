import React, { useState } from 'react';
import './Slideshow.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Slideshow = () => {
  const images = [
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/cc/8d/2a/the-beautiful-mylopotamos.jpg?w=700&h=-1&s=1',
    'https://wowiwalkers.com/wp-content/uploads/2021/10/Thessaloniki-Photoshop.jpg',
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((index) => (index + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((index) => (index - 1 + images.length) % images.length);
  };

  return (
    <div className="slideshow-container">
      <div className="slide">
        <img src={images[index]} alt="Slide" />
      </div>
      <button className="prev" onClick={prevSlide}>
        <FaArrowLeft />
      </button>
      <button className="next" onClick={nextSlide}>
        <FaArrowRight />
      </button>
      <div className="index-number">
        <p>
          {index + 1} / {images.length}
        </p>
      </div>
    </div>
  );
};

export default Slideshow;
