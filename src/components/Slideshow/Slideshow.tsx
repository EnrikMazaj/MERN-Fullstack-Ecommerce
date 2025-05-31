import React, { useState, useEffect } from 'react';
import './Slideshow.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { translations } from '../../translations';

const Slideshow = () => {
  const { language } = useTheme();
  const t = translations[language].home.slideshow;

  const images = [
    {
      url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/cc/8d/2a/the-beautiful-mylopotamos.jpg?w=700&h=-1&s=1',
      title: t.mylopotamos.title,
      description: t.mylopotamos.description
    },
    {
      url: 'https://wowiwalkers.com/wp-content/uploads/2021/10/Thessaloniki-Photoshop.jpg',
      title: t.thessaloniki.title,
      description: t.thessaloniki.description
    },
    {
      url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: t.mykonos.title,
      description: t.mykonos.description
    },
    {
      url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: t.santorini.title,
      description: t.santorini.description
    }
  ];

  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setIndex((index) => (index + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((index) => (index - 1 + images.length) % images.length);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <div
      className="slideshow-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="slide">
        <img src={images[index].url} alt={images[index].title} />
        <div className="slide-content">
          <h3>{images[index].title}</h3>
          <p>{images[index].description}</p>
        </div>
      </div>
      <button className="prev" onClick={prevSlide}>
        <FaArrowLeft />
      </button>
      <button className="next" onClick={nextSlide}>
        <FaArrowRight />
      </button>
      <div className="slide-indicators">
        {images.map((_, i) => (
          <button
            key={i}
            className={`indicator ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
      <div className="index-number">
        <p>
          {index + 1} / {images.length}
        </p>
      </div>
    </div>
  );
};

export default Slideshow;
