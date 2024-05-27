import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
export const App = () => {
  return (
    <StorageManager
      acceptedFileTypes={['*']}
      path="public/"
      maxFileCount={1}
      isResumable
    />
  );
};
export default App;