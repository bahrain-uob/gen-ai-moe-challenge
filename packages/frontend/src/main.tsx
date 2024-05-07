import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TestPage from './pages/TestPage.tsx';
import ReadingQuestions from './pages/ReadingQuestionsPage.tsx';
import Speaking from './pages/speaking.tsx';
import Home from './pages/home.tsx';
import Sections from './pages/sections.tsx';
import SignUp from './pages/signUp.tsx';
import SignIn from './pages/signIn.tsx';
import Exercises from './pages/Exercises.tsx';
import { SpeakingExercisesPage } from './pages/SpeakingExercisesPage.tsx';
import { SpeakingLongQuestionPage } from './pages/SpeakingLongQuestionPage.tsx';
import { SpeakingConversationPage } from './pages/SpeakingConversationPage.tsx';
import FullExam from './pages/fullExam.tsx';
import { fetchAuthSession } from 'aws-amplify/auth';
import Polly from './pages/Polly.tsx';
import success from './pages/success.tsx';
import FeedbackPage from './pages/FeedbackPage.tsx';

import PlacementTest from './pages/PlacementTest.tsx';

Amplify.configure(
  {
    Auth: {
      Cognito: {
        userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
        userPoolClientId: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
      },
    },
    API: {
      REST: {
        myAPI: {
          endpoint: import.meta.env.VITE_API_URL,
          region: import.meta.env.VITE_APP_REGION,
        },
      },
    },
  },
  {
    API: {
      REST: {
        // Include authentication token in headers
        headers: async () => {
          const authToken = (
            await fetchAuthSession()
          ).tokens?.idToken?.toString();
          return { Authorization: authToken ? authToken : '' };
        },
      },
    },
  },
);

// Place pages here
const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: '/test',
    Component: TestPage,
  },
  {
    path: '/Listening/Polly',
    Component: Polly,
  },
  {
    path: '/Listening/Polly/success',
    Component: success,
  },

  {
    path: '/:section/:sk', // Updated route with path parameters
    Component: ReadingQuestions,
  },
  {
    path: '/scores/:section/:sk', //TODO: we will remove this link because it will be added in another page
    Component: FeedbackPage,
  },
  {
    path: '/speaking',
    Component: Speaking,
  },
  {
    path: '/Exercises',
    Component: Exercises,
  },
  {
    path: '/home',
    Component: Home,
  },
  {
    path: '/sections',
    Component: Sections,
  },
  {
    path: '/SpeakingExercises',
    Component: SpeakingExercisesPage,
  },
  {
    path: '/SpeakingLongQuestion',
    Component: SpeakingLongQuestionPage,
  },
  {
    path: '/SpeakingConversation',
    Component: SpeakingConversationPage,
  },
  {
    path: '/sign-up',
    Component: SignUp,
  },
  {
    path: '/sign-in',
    Component: SignIn,
  },
  {
    path: '/full-exam',
    Component: FullExam,
  },
  {
    path: '/PlacementTest',
    Component: PlacementTest,
  },
]);
// TODO: handle not found pages

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
