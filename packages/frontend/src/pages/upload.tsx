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
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>
      {uploadUrl && (
        <div>
          <p>
            File uploaded successfully. URL: <a href={uploadUrl}>{uploadUrl}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadToS3;
