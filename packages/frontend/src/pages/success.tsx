import React from 'react';

const MyComponent: React.FC = () => {
  const audioUrl =" response.body.url"
  return (
    <div>
      <h1>Play Audio</h1>
      <audio controls>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MyComponent;
