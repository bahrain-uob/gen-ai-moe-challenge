import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import TestPage from './pages/TestPage.tsx';
// import ReadingQuestions from './pages/ReadingQuestionsPage.tsx';
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
import LRFeedbackPage from './pages/LRFeedbackPage.tsx';
import PlacementTest from './pages/PLTestPage.tsx';
import { Layout } from './Layout.tsx';
import { AddListeningQPage } from './pages/AddListeningQPage.tsx';
import { SuccessAddListeningQPage } from './pages/SuccessAddListeningQPage.tsx';
import { SignOutPage } from './pages/signOut.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
// import { WritingPage } from './pages/WritingPage.tsx';
//import { writingSection } from './utilities.ts';
import RAnswersPage from './pages/RAnswersPage.tsx';
import LAnswersPage from './pages/LAnswersPage.tsx';
import { SpeakingAudioPage } from './pages/SpeakingAudioPage.tsx';
import { SpeakingCardPage } from './pages/SpeakingCardPage.tsx';
// import { ListeningQuestionsPage } from './pages/ListeningQuestionsPage.tsx';
import { FullTestPage } from './pages/FullTestPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { AllFeedbacks } from './components/AllFeedbacks.tsx';

// These routes will have the landing nav bar
const landingRoutes: RouteObject[] = [
  {
    path: '/',
    Component: App,
  },
  {
    path: '/sign-up',
    Component: SignUp,
  },
  {
    path: '/sign-in',
    Component: SignIn,
  },
];

const notLandingRoutes: RouteObject[] = [
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
    path: '/test',
    Component: TestPage,
  },
 
  {
    path: '/sign-out',
    Component: SignOutPage,
  },
  
  {
    path: '/profilePage',
    Component: ProfilePage,
  },
  {
    path: '/PlacementTest',
    Component: PlacementTest,
  },
  {
    path: '/feedback/:sk',
    Component: AllFeedbacks,
  },
];

const noLayoutRoutes: RouteObject[] = [
  // {
  //   path: '/writing',
  //   element: <WritingPage />,
  // },
  {
    path: '/full-test/:testId',
    Component: FullTestPage,
  },
  {
    path: '/full-test',
    Component: FullTestPage,
  },
  // These pages don't use `Layout` yet
  // {
  //   path: '/reading/:sk',
  //   Component: ReadingQuestions,
  // },
  // {
  //   path: '/listening/:sk',
  //   Component: ListeningQuestionsPage,
  // },
  {
    path: '/scores/:section/:sk',
    Component: LRFeedbackPage,
  },
  {
    path: '/answers/reading/:sk',
    Component: RAnswersPage,
  },
  {
    path: '/answers/listening/:sk',
    Component: LAnswersPage,
  },
  {
    path: '/test-speaking-card-ui',
    Component: SpeakingCardPage,
  },
  {
    path: '/test-speaking-audio-ui',
    Component: SpeakingAudioPage,
  },{
    path: '/sign-in',
    Component: SignIn,
  },
  {
    path: '/sign-up',
    Component: SignUp,
  }
 
];

// Place pages here
export const routes = createBrowserRouter([
  {
    element: <Layout isLanding={true} />,
    errorElement: <ErrorPage />,
    children: landingRoutes,
  },
  /* Include all the routes that may affect authentication info here */
  {
    element: <Layout />,
    children: notLandingRoutes,
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
  ...noLayoutRoutes,
]);
