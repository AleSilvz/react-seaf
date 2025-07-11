import { createBrowserRouter, createHashRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/login";
import SingUp from "../pages/sing up/singUp";
import Account from "../pages/account/Account";
import Buy from "../pages/buy/buy";
import Snack from "../pages/snack/snack";

const NavRouter = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/singup",
    element: <SingUp />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/buy",
    element: <Buy />,
  },
  {
    path: "/snack",
    element: <Snack />,
  },
  {
    basename: "/react-seaf",
  },
]);

export default NavRouter;
