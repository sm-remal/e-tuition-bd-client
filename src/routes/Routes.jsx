import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Tuitions from "../pages/Tuitions/Tuitions";
import Tutors from "../pages/Tutors/Tutors";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "tuitions",
        Component: Tuitions,
      },
      {
        path: "tutors",
        Component: Tutors,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      }
    ]
  },
]);