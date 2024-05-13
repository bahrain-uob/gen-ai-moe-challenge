import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TestPage from './pages/TestPage.tsx';
import WritingTask1Page from './pages/writingTask1.tsx';
import WritingTask2Page from './pages/writingTask2.tsx';
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
import FeedbackPage from './pages/FeedbackPage.tsx';
import { WritingTask2Page_ } from './pages/WritingTask2_.tsx';
import { WritingTask1Page_ } from './pages/WritingTask1_.tsx';
import PlacementTest from './pages/PlacementTest.tsx';
import { Layout } from './Layout.tsx';
import { AddListeningQPage } from './pages/AddListeningQPage.tsx';
import { SuccessAddListeningQPage } from './pages/SuccessAddListeningQPage.tsx';
import VocabularyPracticePage from './pages/VocabularyPracticePage';
import addVocabQuestionsPage from './pages/AddVocabQuestionsPage.tsx';

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
  // Note that home page doesn't need a padding, because of the slider
  {
    element: <Layout noPadding />,
    children: [
      {
        path: '/home',
        Component: Home,
      },
    ],
  },
  // All routes inside `children` use the default layout
  {
    Component: Layout,
    children: [
      {
        path: '/speaking',
        Component: Speaking,
      },
      {
        path: '/Exercises',
        Component: Exercises,
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
        path: '/VocabularyPracticePage',
        Component: VocabularyPracticePage,
      },
      {
        path: '/addVocabQuestionsPage',
        Component: addVocabQuestionsPage,
      },
      {
        path: '/writing-task2',
        Component: WritingTask2Page,
      },
      {
        path: '/_writing-task1',
        Component: WritingTask1Page_,
      },
      {
        path: '/_writing-task2',
        Component: WritingTask2Page_,
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
        path: '/Listening/addQuestion',
        Component: AddListeningQPage,
      },
      {
        path: '/Listening/addQuestion/success',
        Component: SuccessAddListeningQPage,
      },

      {
        path: '/full-exam',
        Component: FullExam,
      },
      {
        path: '/writing-task1',
        Component: WritingTask1Page,
      },
      {
        path: '/test',
        Component: TestPage,
      },
    ],
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
