import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import ProtectorRoute from "./components/protecter-route";
import CreateAccount from "./routes/create-account";
import Home from "./routes/home";
import Login from "./routes/login";
import Profile from "./routes/profile";
import reset from "styled-reset";
import Layout from "./components/layout";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import LoadingScreen from "./components/loading-screen";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectorRoute>
        <Layout />
      </ProtectorRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/create-account",
    element: <CreateAccount />
  },
  {
    path: "/profile",
    element: <Profile />
  }
]);

const GlobalStyles = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  body {
    background-color: white;
    color: black;
    font-family: serif;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await auth.authStateReady();
      setLoading(false)
    };
    init()
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
