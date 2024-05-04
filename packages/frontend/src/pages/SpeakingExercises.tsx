import React from 'react';
import { Link } from 'react-router-dom';

const SpeakingExercises: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {' '}
      {/* Changed background color */}
      <div className="flex w-full max-w-6xl mx-auto">
        <div className="w-1/2 p-12 bg-white text-[#3B828E] rounded-lg shadow-md mr-8">
          {' '}
          {/* Changed background color and added white background */}
          <h2 className="text-4xl font-bold text-center mb-8">
            Conversation
          </h2>{' '}
          {/* Increased text size */}
          <div className="mt-4 flex justify-center">
            <Link to="/speakingConversation">
              <button className="px-8 py-4 bg-[#3B828E] text-white rounded-lg hover:bg-[#2A5F69] transition duration-300">
                {' '}
                {/* Increased button size */}
                Begin
              </button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 p-12 bg-white text-[#3B828E] rounded-lg shadow-md">
          <h2 className="text-4xl font-bold text-center mb-8">Long Question</h2>{' '}
          {/* Increased text size */}
          <div className="mt-4 flex justify-center">
            <Link to="/SpeakingLongQuestion">
              <button className="px-8 py-4 bg-[#3B828E] text-white rounded-lg hover:bg-[#2A5F69] transition duration-300">
                {' '}
                {/* Increased button size */}
                Begin
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingExercises;
