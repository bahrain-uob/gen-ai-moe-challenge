import { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const images = ['assets/Learning-pana.svg', 'assets/Webinar-pana.svg'];
const texts = [
  'Experience a full mock exam and prepare for succes',
  'Practice with exercises tailored to your English level',

];
const labels = ['Take Exam', 'Practice'];
const buttonPage = ['/full-exam', '/home'];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

   // Auto-scroll functionality
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 7000); 
      return () => clearInterval(interval);
    }, [currentIndex]);

  return (
    <div className="bg-[#EEE9E0] w-full h-full flex flex-col gap-8 group py-10 px-5  relative overflow-hidden">
        <div className="flex w-full h-5/6 items-center justify-center">
          <BsChevronCompactLeft
            onClick={prevSlide}
            size={30}
            className="rounded-full text-gray-400 cursor-pointer absolute left-5 z-10 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-8 lg:h-8"
          />
      
          <div className="flex w-full h-full overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
          {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full flex justify-center items-center"
              >
                <div className="w-1/2 h-full flex justify-center items-center">
                  {/* Image */}
                  <img
                    src={image}
                    className="w-[600px] h-[300px] max-md:w-[400px] max-md:h-[180px] max-md:mb-6 select-none"
                  />
                </div>
                <div className="w-3/4 h-full flex flex-col justify-center items-start gap-y-10 md:pl-5">
                  {/* Text and Button */}
                  <p className="text-center text-4xl   max-md:text-xl">
                    {texts[index]}
                  </p>
                  <div className="cursor-pointer w-full flex justify-center items-center">
                    <Link to={buttonPage[index]}>
                    
                    <button className="text-blue-4 text-sm font-bold border border-blue-4 px-4 py-2 rounded-full shadow-md focus:outline-none hover:bg-blue-4 hover:text-white sm:text-lg sm:px-5 sm:py-2">
                      {labels[index]}
                      </button>

                      
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right Chevron */}
        <BsChevronCompactRight
          onClick={nextSlide}
          size={30}
          className="rounded-full text-gray-400 cursor-pointer absolute right-5 z-10 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-8 lg:h-8"
        />
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-5 h-1  ${
              index === currentIndex ? 'bg-gray-400' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );

};

export default Carousel;
