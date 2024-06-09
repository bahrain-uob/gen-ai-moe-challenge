import React, { useState } from 'react';
import { post } from 'aws-amplify/api';
import { toJSON } from '../utilities';

const UploadToS3: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = async () => {
      const base64File = (reader.result as string).split(',')[1];

      try {
        const response = await toJSON(
          post({
            apiName: 'myAPI',
            path: '/upload',
            options: {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: {
                file_name: selectedFile.name,
                file_content: base64File,
                content_type: selectedFile.type,
              },
            },
          }),
        );

        if (response.url) {
          setUploadUrl(response.url);
          alert('File uploaded successfully!');
        } else {
          alert('File upload failed.');
        }
      } catch (error) {
        console.error('Error uploading file', error);
        alert('File upload failed.');
      }
    };
    reader.onerror = () => {
      alert('Failed to read file.');
    };
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fileInput"
          >
            Select File
          </label>
          <input
            type="file"
            id="fileInput"
            className="w-full py-2 px-3 text-gray-700 border rounded focus:outline-none focus:shadow-outline"
            onChange={handleFileChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={uploadFile}
        >
          Upload
        </button>
        {uploadUrl && (
          <div className="mt-4">
            <p className="text-green-500 font-bold">
              File uploaded successfully.
            </p>
            <a
              href={uploadUrl}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {uploadUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadToS3;
