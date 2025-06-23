import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/gallery01.jpg',
  '/gallery02.jpg',
  '/gallery1.jpg',
  '/gallery3.jpg',
  '/gallery2.jpg',
  '/gallery4.jpg',
  '/gallery5.jpg',
  '/gallery6.jpg',
  '/gallery7.jpg',
  'gallery09.jpg',
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  // Scroll speed in pixels per interval
  const scrollSpeed = 5;
  // Interval duration in milliseconds
  const intervalDuration = 20;

  const startScrolling = useCallback((direction: 'left' | 'right') => {
    // Clear any previous interval
    if (scrollInterval.current) clearInterval(scrollInterval.current);
    scrollInterval.current = setInterval(() => {
      if (galleryRef.current) {
        // Adjust scrollLeft based on direction
        galleryRef.current.scrollLeft += direction === 'right' ? scrollSpeed : -scrollSpeed;
      }
    }, intervalDuration);
  }, [scrollSpeed, intervalDuration]);

  const stopScrolling = useCallback(() => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  }, []);

  // Handler to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 relative" id="gallery">
      {/* Inline styles to hide scrollbar for Webkit browsers */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center dark:text-white">Gallery</h2>
        <div className="relative">
          {/* Left hover area */}
          <div
            className="absolute top-0 left-0 w-12 h-full z-10 cursor-pointer"
            onMouseEnter={() => startScrolling('left')}
            onMouseLeave={stopScrolling}
          />
          {/* Right hover area */}
          <div
            className="absolute top-0 right-0 w-12 h-full z-10 cursor-pointer"
            onMouseEnter={() => startScrolling('right')}
            onMouseLeave={stopScrolling}
          />
          {/* Scrollable image container */}
          <div
            ref={galleryRef}
            className="overflow-x-auto hide-scrollbar whitespace-nowrap space-x-4 pb-4"
          >
            {images.map((src, index) => (
              <motion.img
                key={index}
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="inline-block w-80 h-60 object-cover rounded-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(src)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal for enlarged image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selectedImage}
              alt="Enlarged gallery"
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}  // Prevent closing modal when clicking on the image itself
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
