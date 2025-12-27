import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/Cyclone/1.jpg',
  '/Cyclone/2.jpg',
  '/Cyclone/3.jpg',
  '/Cyclone/4.jpg',
  '/Cyclone/5.jpg',
  '/Cyclone/6.jpg',
  '/Cyclone/8.jpg'
];

export default function CycloneGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  const scrollSpeed = 5;
  const intervalDuration = 20;

  const startScrolling = useCallback((direction: 'left' | 'right') => {
    if (scrollInterval.current) clearInterval(scrollInterval.current);
    scrollInterval.current = setInterval(() => {
      if (galleryRef.current) {
        galleryRef.current.scrollLeft += direction === 'right' ? scrollSpeed : -scrollSpeed;
      }
    }, intervalDuration);
  }, []);

  const stopScrolling = useCallback(() => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  }, []);

  const closeModal = () => setSelectedImage(null);

  return (
    <section className="py-20 bg-[#eaf6ff] dark:bg-[#0a1c17] relative" id="cyclone-gallery">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-[#0b132b] dark:text-[#d2ffee]">Gallery</h2>
        <div className="relative">
          <div
            className="absolute top-0 left-0 w-12 h-full z-10 cursor-pointer"
            onMouseEnter={() => startScrolling('left')}
            onMouseLeave={stopScrolling}
          />
          <div
            className="absolute top-0 right-0 w-12 h-full z-10 cursor-pointer"
            onMouseEnter={() => startScrolling('right')}
            onMouseLeave={stopScrolling}
          />
          <div
            ref={galleryRef}
            className="overflow-x-auto hide-scrollbar whitespace-nowrap space-x-4 pb-4"
          >
            {images.map((src, index) => (
              <motion.img
                key={index}
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="inline-block w-80 h-60 object-cover rounded-lg cursor-pointer shadow-lg border border-[#00b8ff]/30 dark:border-[#16f2b4]/35"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(src)}
              />
            ))}
          </div>
        </div>
      </div>

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
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
