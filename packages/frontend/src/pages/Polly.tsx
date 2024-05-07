import { post } from 'aws-amplify/api';
import React, { useState } from 'react';
import { toJSON } from '../utilities';
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory hook
interface Speech {
  speaker: string;
  speech: string;
  gender: string;
}

export default function MyApp() {
  const [speakerA, setSpeakerA] = useState<string>('Gregory');
  const [speakerB, setSpeakerB] = useState<string>('Joanna');
  const [inputValue, setInputValue] = useState<string>('');
  const [speeches, setSpeeches] = useState<Speech[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (speeches.length === 0) {
      console.log('No speeches to submit');
      return;
    }

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
    const ok = response;
    navigate('/Listening/Polly/success', { replace: true, state: { ok } });
    console.log(response); // Log the response URL
  };

  const handleButtonClick = () => {
    if (inputValue.trim() !== '') {
      const speaker = speeches.length % 2 === 0 ? 'A' : 'B';
      const gender = speaker === 'A' ? speakerA : speakerB;
      setSpeeches(prevSpeeches => [
        ...prevSpeeches,
        { speaker, speech: inputValue, gender },
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
          <option value="Gregory">Gregory</option>
          <option value="Joey">Joey</option>
          <option value="Matthew">Matthew</option>
          <option value="Stephen">Stephen</option>
          <option value="Joanna">Joanna</option>
          <option value="Salli">Salli</option>
          <option value="Kimberly">Kimberly</option>
          <option value="Kendra">Kendra</option>
          <option value="Ruth">Ruth</option>
          <option value="Danielle">Danielle</option>
        </select>
      </div>
      <div>
        <span>Speaker B: </span>
        <select
          value={speakerB}
          onChange={event => setSpeakerB(event.target.value)}
        >
          <option value="Gregory">Gregory</option>
          <option value="Joey">Joey</option>
          <option value="Matthew">Matthew</option>
          <option value="Stephen">Stephen</option>
          <option value="Joanna">Joanna</option>
          <option value="Salli">Salli</option>
          <option value="Kimberly">Kimberly</option>
          <option value="Kendra">Kendra</option>
          <option value="Ruth">Ruth</option>
          <option value="Danielle">Danielle</option>
        </select>
      </div>
      <div>
        <span>{speeches.length % 2 === 0 ? 'A' : 'B'}:</span>
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </div>
      <button onClick={handleButtonClick}>Add speech</button>
      <Link to="/Listening/Polly/success">
        <button onClick={handleSubmit}>Submit</button>
      </Link>
      <div>
        {speeches.map((speech, index) => (
          <div key={index}>
            <span>{speech.speaker}: </span>
            <span>{speech.speech}</span>
            <span>({speech.gender})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
