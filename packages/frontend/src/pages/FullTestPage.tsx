import { useParams } from 'react-router-dom';
import { Layout } from '../Layout';
import { ConfirmFullTestStart } from '../components/ConfirmFullTestStart';

export const FullTestPage = () => {
  const { testId } = useParams();

  if (!testId) {
    return (
      <Layout>
        <ConfirmFullTestStart />
      </Layout>
    );
  }
};
