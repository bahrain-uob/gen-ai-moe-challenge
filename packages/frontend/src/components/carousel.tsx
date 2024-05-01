import { useState } from 'react';
import Button from '../components/TButton';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const images = ['assets/ExamIcon.png', 'assets/Personalized.png'];
const texts = [
  'Take mock exam and get the full experience of a real exam',
  'Practice on set of Exersices that fits you English level',
];
const labels = ['Take Exam', 'Practice'];
const buttonPage = ['/fexam', '/exersice'];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="bg-[#EEE9E0] w-full h-full flex flex-col gap-8 group">
      <div className="flex w-full h-5/6">
        <div className="w-1/12 rounded-2xl flex justify-center items-center">
          <BsChevronCompactLeft
            onClick={prevSlide}
            size={30}
            className="hidden group-hover:block bg-[#958F88] rounded-full text-[#EAE7E0] cursor-pointer"
          />
        </div>
        <div className="flex max-md:flex-col justify-center items-center h-full w-11/12">
          <div className=" w-1/2 h-full  rounded-2xl flex justify-center items-center">
            {/* Image */}
            <img
              src={images[currentIndex]}
              className="w-[350px] h-[350px] max-md:w-[200px] max-md:h-[180px]"
            />
          </div>

          <div className=" w-3/4 h-full  rounded-2xl flex flex-col justify-center items-start gap-y-10 pl-5">
            {/* Text / Button */}
            <p className="text-center font-bold text-4xl max-md:text-2xl">
              {texts[currentIndex]}
            </p>
            {/* <Link to "{buttonPage[currentIndex]}"> */}
            <div className="cursor-pointer w-full flex justify-center items-center">
              <Button label={labels[currentIndex]} />
            </div>
          </div>
        </div>
        <div className=" w-1/12 rounded-2xl flex justify-center items-center">
          <BsChevronCompactRight
            onClick={nextSlide}
            size={30}
            className="hidden group-hover:block bg-[#958F88] rounded-full text-[#EAE7E0] cursor-pointer"
          />
        </div>
      </div>
      <div className="w-full h-1/6 flex justify-center items-center">
        {images.map((images, Index) => (
          <div
            key={Index}
            onClick={() => goToSlide(Index)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;