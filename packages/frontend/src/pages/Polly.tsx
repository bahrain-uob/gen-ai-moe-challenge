import { post } from 'aws-amplify/api';
import React, { useState } from 'react';
import { toJSON } from '../utilities';
import { Link } from 'react-router-dom';

interface Speech {
  speaker: string;
  speech: string;
}

function BEN() {
  const [Audio, setAudio] = useState<string | null>(null);

  return (
    Audio ? <MyComponent Audio={Audio}/> : <MyApp setAudio={setAudio}/>
  );
}

export default BEN;
  
function MyApp(props) {
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
          body: JSON.stringify(speeches),
        },
      }),
    );
    props.setAudio(response.body.url)
    console.log(response.body.url); // Log the response URL
    return console.log(response);
  };

  const handleButtonClick = () => {
    if (inputValue.trim() !== '') {
      const speaker = speeches.length % 2 === 0 ? 'A' : 'B';
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
        <span>{speeches.length % 2 === 0 ? 'A' : 'B'}:</span>
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </div>
      <button onClick={handleButtonClick}>Add speech</button>
      <button onClick={handleSubmit}>
        Submit
      </button>
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

function MyComponent(props) {
  const audioUrl = props.audioUrl;

  return (
    <div>
      <h1>Play Audio</h1>
      <audio controls>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
