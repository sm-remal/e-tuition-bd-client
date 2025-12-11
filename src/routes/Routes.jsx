import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Tuitions from "../pages/Tuitions/Tuitions";
import Tutors from "../pages/Tutors/Tutors";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import MyTuitions from "../pages/Dashboard/MyTuitions/MyTuitions";
import PostTuition from "../pages/Dashboard/PostTuition/PostTuition";
import AppliedTutors from "../pages/Dashboard/AppliedTutors/AppliedTutors";
import PrivateRoutes from "./PrivateRoute";
import TuitionManagement from "../pages/Dashboard/Admin/TuitionManagement/TuitionManagement";
import UserManagement from "../pages/Dashboard/Admin/UserManagement/UserManagement";
import TuitionDetails from "../pages/TuitionDetails/TuitionDetails";
import MyApplications from "../pages/Dashboard/Tutors/MyApplications/MyApplications";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess/PaymentSuccess";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ProfileSettings from "../pages/Dashboard/ProfileSettings/ProfileSettings";
import OngoingTuitions from "../pages/Dashboard/Tutors/OngoingTuitions/OngoingTuitions";
import RevenueHistory from "../pages/Dashboard/Tutors/RevenueHistory/RevenueHistory";
import ReportsAnalytics from "../pages/Dashboard/Admin/ReportsAnalytics/ReportsAnalytics";

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
        path: "tuition-details/:id",
        Component: TuitionDetails,
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
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
    children: [
      {
        path: "my-tuitions",
        Component: MyTuitions,
      },
      {
        path: "post-tuition",
        Component: PostTuition,
      },
      {
        path: "apply-tutors",
        Component: AppliedTutors,
      },
      {
        path: 'profile-settings',
        element: <ProfileSettings />
      },

      // ---------- Payment Only Route ---------- //
      {
        path: 'payment-success',
        element: <PaymentSuccess />
      },
      {
        path: 'payment-history',
        element: <PaymentHistory />
      },

      // ---------- Tutors Only Route ---------- //
      {
        path: "my-applications",
        element: <MyApplications />
      },
      {
        path: "ongoing-tuitions",
        element: <OngoingTuitions />
      },
      {
        path: "revenue-history",
        element: <RevenueHistory />
      },

      //---------- Admin Only Route ---------- //
      {
        path: "users-management",
        element: <UserManagement></UserManagement>
      },
      {
        path: "tuition-management",
        element: <TuitionManagement></TuitionManagement>
      },
      {
        path: "reports-analytics",
        element: <ReportsAnalytics></ReportsAnalytics>
      }
    ]
  }
]);