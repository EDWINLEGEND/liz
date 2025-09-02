import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slideshow.css';

interface Memory {
  id: number;
  image: string;
  caption: string;
}

interface SlideshowProps {
  memories: Memory[];
}

const Slideshow: React.FC<SlideshowProps> = ({ memories }) => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const openModal = (memory: Memory) => {
    setSelectedMemory(memory);
    // Animate modal opening
    gsap.to('.memory-modal', {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out'
    });
  };

  const closeModal = () => {
    // Animate modal closing
    gsap.to('.memory-modal', {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => setSelectedMemory(null)
    });
  };

  return (
    <div className="slideshow-section">
      <h2 className="slideshow-title">Magical Memories</h2>
      
      <div className="slideshow-container">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="mySwiper"
        >
          {memories.map((memory) => (
            <SwiperSlide key={memory.id}>
              <div 
                className="memory-card"
                onClick={() => openModal(memory)}
              >
                <div className="memory-image-container">
                  <img 
                    src={memory.image} 
                    alt={memory.caption} 
                    className="memory-image" 
                  />
                </div>
                <div className="memory-caption">{memory.caption}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {selectedMemory && (
        <div className="memory-modal-overlay" onClick={closeModal}>
          <div className="memory-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              &times;
            </button>
            <img 
              src={selectedMemory.image} 
              alt={selectedMemory.caption} 
              className="modal-image" 
            />
            <div className="modal-caption">{selectedMemory.caption}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slideshow;