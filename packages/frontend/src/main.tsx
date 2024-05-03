import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TestPage from './pages/TestPage.tsx';
import WritingTask1Page from './pages/writingTask1.tsx';
import WritingTask2Page from './pages/writingTask2.tsx';
import ReadingQuestions from './ReadingQuestions.tsx';
import Speaking from './pages/speaking.tsx';
import Home from './pages/home.tsx';
import Sections from './pages/sections.tsx';
import SignUp from './pages/signUp.tsx';
import SignIn from './pages/signIn.tsx';
import Exercises from './pages/Exercises.tsx';
import SpeakingExercises from './pages/SpeakingExercises.tsx';
import SpeakingLongQuestion from './pages/SpeakingLongQuestion.tsx';
import SpeakingConversation from './pages/SpeakingConversation.tsx';

import { fetchAuthSession } from 'aws-amplify/auth';

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
    path: '/writing-task1',
    Component: WritingTask1Page,
  },
  {
    path: '/:section/:sk', // Updated route with path parameters
    Component: ReadingQuestions,
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
    Component: SpeakingExercises,
  },
  {
    path: '/SpeakingLongQuestion',
    Component: SpeakingLongQuestion,
  },
  {
    path: '/SpeakingConversation',
    Component: SpeakingConversation,
  },

  {
    path: '/writing-task2',
    Component: WritingTask2Page,
  },
  {
    path: '/sign-up',
    Component: SignUp,
  },
  {
    path: '/sign-in',
    Component: SignIn,
  },
]);
// TODO: handle not found pages

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
