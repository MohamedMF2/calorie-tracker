import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage, TrackPage } from "./pages";
import { PageLayout } from "./pages/PageLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/track",
        element: <TrackPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
