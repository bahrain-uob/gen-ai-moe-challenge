import React, { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';

export const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('Hasan');
  const [lastName, setLastName] = useState('Ali');
  const [email, setEmail] = useState('example@example.com');
  const [phoneNumber, setPhoneNumber] = useState('+973 33334444');
  const [institute, setInstitute] = useState('University of Bahrain');

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => setIsEditing(false);

  return (
    <div className="min-h-screen h-full flex flex-col items-center p-4">
      <main className="flex-grow w-full h-full">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:max-w-2xl mx-auto">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="rounded-full bg-gray-300 p-2">
              <BsPersonCircle size="80" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-semibold">Hello Hasan Ali,</h1>
              {isEditing ? (
                <button
                  className="mt-2 px-3 py-1 bg-[#418291] text-white font-bold rounded-lg hover:bg-teal-700"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              ) : (
                <button
                  className="mt-2 px-3 py-1 bg-[#418291] text-white font-bold rounded-lg hover:bg-teal-700"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                readOnly={!isEditing}
                className={`w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 ${
                  isEditing ? 'bg-white' : 'bg-gray-100'
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                readOnly={!isEditing}
                className={`w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 ${
                  isEditing ? 'bg-white' : 'bg-gray-100'
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                readOnly={!isEditing}
                className={`w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 ${
                  isEditing ? 'bg-white' : 'bg-gray-100'
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                readOnly={!isEditing}
                className={`w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 ${
                  isEditing ? 'bg-white' : 'bg-gray-100'
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700">Institute</label>
              <select
                value={institute}
                onChange={e => setInstitute(e.target.value)}
                disabled={!isEditing}
                className={`w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg ${
                  isEditing ? 'bg-white' : 'bg-gray-100'
                }`}
              >
                <option value="University of Bahrain">
                  University of Bahrain
                </option>
                <option value="Bahrain Polytechnic">Bahrain Polytechnic</option>
              </select>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
