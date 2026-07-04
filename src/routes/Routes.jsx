import About from "@/Pages/About/About";
import Blogs from "@/Pages/Blogs/Blogs";
import MainBlog from "@/Pages/Blogs/DetBlogs/MainBlog";
import Contact from "@/Pages/Contact/Contact";
import Home from "@/Pages/Home/Home";
import DetailProject from "@/Pages/Projects/DetailProject/DetailProject";
import Projects from "@/Pages/Projects/Projects";
import Testimonial from "@/Pages/Testimonial/Testimonial";
import PrivacyTerms from "@/shared/Footer/PrivacyTerms/PrivacyTerms";
import { createBrowserRouter } from "react-router";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    // errorElement: <ErrorPage/>,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/projects/:slug",
        element: <DetailProject />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/testimonial",
        element: <Testimonial />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyTerms />,
      },
      {
        path: "/terms-conditions",
        element: <PrivacyTerms />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:slug",
        element: <MainBlog />,
      },
    ],
  },
]);
