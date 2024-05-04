import { post } from 'aws-amplify/api';
import React, { useState } from 'react';
import { toJSON } from '../utilities';

interface Speech {
  speaker: string;
  speech: string;
}

export default function MyApp() {
  const [speakerA, setSpeakerA] = useState<string>('male');
  const [speakerB, setSpeakerB] = useState<string>('female');
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
          body: JSON.stringify(speeches) ,
        },
      }),
    );
    return console.log(response);
  };

  const handleButtonClick = () => {
    if (inputValue.trim() !== '') {
      const speaker = speeches.length % 2 === 0 ? speakerA : speakerB; // Alternate between speaker A and B
      setSpeeches(prevSpeeches => [
        ...prevSpeeches,
        { speaker, speech: inputValue },
      ]);
      setInputValue('');
    }
  };

  return (
    <div>
      <div>
        <span>Speaker A: </span>
        <select
          value={speakerA}
          onChange={event => setSpeakerA(event.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <span>Speaker B: </span>
        <select
          value={speakerB}
          onChange={event => setSpeakerB(event.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <span>{speeches.length % 2 === 0 ? 'A' : 'B'}: </span>
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
