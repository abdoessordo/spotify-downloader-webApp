import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Playlist from "./Pages/Playlist";

import { ThemeProvider } from "./components/theme-provider";

export interface Tokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  time_stamp: number;
}

function App() {
  const Layout = () => (
    <div className=" min-h-scree">
      <Outlet />
    </div>
  );

  const BrowserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/playlist",
          element: <Playlist />,
        },
        {
          path: "/callback",
          element: <h1>Callback</h1>,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={BrowserRouter} />
    </ThemeProvider>
  );
}

export default App;
