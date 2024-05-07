import React from 'react';
import { useLocation } from 'react-router-dom';

const MyComponent: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(true);
  const [audioUrl, setAudioUrl] = React.useState('');

  React.useEffect(() => {
    if (location.state?.ok) {
      const { s3_url } = location.state.ok;
      const url = JSON.parse(s3_url.body).url;
      setAudioUrl(url);
      setIsLoading(false);
    }
  }, [location.state]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Audio</h1>
      <audio controls>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MyComponent;