import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ErrorPage,
  LandingPage,
  TrackPage,
  PageLayout,
  DetailsPage,
} from "@pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index:true,
        element: <LandingPage />,
      },
      {
        path: "track",
        element: <TrackPage />,
      },
      {
        path: "track/:recordId",
        element: <DetailsPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
