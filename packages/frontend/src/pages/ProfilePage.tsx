import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';

export const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gray-300 p-2">
              <BsPersonCircle size="80" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">Hello Hasan Ali,</h1>
              <button className="mt-2 px-3 py-1 bg-[#418291] text-white font-bold rounded-lg hover:bg-teal-700">
                Edit Profile
              </button>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value="Hasan"
                readOnly
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value="Ali"
                readOnly
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value="example@example.com"
                readOnly
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                value="+973 33334444"
                readOnly
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700">Institute</label>
              <input
                type="text"
                value="University of Bahrain"
                readOnly
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
