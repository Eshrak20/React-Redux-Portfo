import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "@/Pages/Home/Home";
import ProjectDetail from "@/Pages/ProjectDetail/ProjectDetail";
import About from "@/Pages/About/About";
import Testimonial from "@/Pages/Testimonial/Testimonial";
import Contact from "@/Pages/Contact/Contact";
import Projects from "@/Pages/Projects/Projects";
import DetailProject from "@/Pages/Projects/DetailProject/DetailProject";
import Blogs from "@/Pages/Blogs/Blogs";
import MainBlog from "@/Pages/Blogs/DetBlogs/MainBlog";

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
        path: "/projects/:id",
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
