import { post } from 'aws-amplify/api';
import React, { useState } from 'react';
import { toJSON } from '../utilities';

interface Speech {
  speaker: string;
  speech: string;
}

export default function MyApp() {
  const [speaker, setSpeaker] = useState<string>('male');
  const [inputValue, setInputValue] = useState<string>('');
  const [speeches, setSpeeches] = useState<Speech[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

const handleSubmit = async () => {
   
      const response = await toJSON(
        post({
          apiName: 'myAPI',
          path: '/Listening/Polly',
          options: {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ speeches }), // Send the array of speeches
          },
        })
      );
     return console.log(response);
  };

  const handleButtonClick = () => {
    if (inputValue.trim() !== '') {
      setSpeeches(prevSpeeches => [...prevSpeeches, { speaker, speech: inputValue }]);
      setSpeaker(prevSpeaker => (prevSpeaker === 'male' ? 'female' : 'male'));
      setInputValue('');
    }
  };

  return (
    <div>
      <h1>Welcome to my app</h1>
      <div>
        <span>Speaker: </span>
        <select onChange={(event) => setSpeaker(event.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <span>{speaker}: </span>
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </div>
      <button onClick={handleButtonClick}>Add speech</button>
      <button onClick={handleSubmit}>Submit</button>
      <div>
        {speeches.map((speech, index) => (
          <div key={index}>
            <span>{speech.speaker}: </span>
            <span>{speech.speech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}