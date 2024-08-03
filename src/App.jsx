import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Section from "./Section/Section";
import Layout from "./Layout/Layout";
import Story from "./Story/Story";
import SojuStory from "./Story/SojuStory";
import BeerStory from "./Story/BeerStory";
import MakgeolliStory from "./Story/MakgeolliStory";
import Company from "./Company,Shop/Company";
import Shop from "./Company,Shop/Shop";
import SojuGuide from "./Guide/SojuGuide";
import BeerGuide from "./Guide/BeerGuide";
import MakgeolliGuide from "./Guide/MakgeolliGuide";
import DrinksDetail from "./Brand/details/DrinksDetail";
import SBMGuide from "./Guide/SBMGuide";
import BrandList from "./Brand/BrandList";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Profile from "./auth/Profile";
import ServiceMail from "./Section/mail/ServiceMail";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children:[
        {
          path: '',
          element: <Section />
        },
        {
          path: '/story',
          element: <Story />
        },
        {
          path: '/story/soju',
          element: <SojuStory />
        },
        {
          path: '/story/beer',
          element: <BeerStory />
        },
        {
          path: '/story/makgeolli',
          element: <MakgeolliStory />
        },
        {
          path: "/brand/soju",
          element: <BrandList category="soju" />,
        },
        {
          path: "/brand/beer",
          element: <BrandList category="beer" />,
        },
        {
          path: "/brand/liquor",
          element: <BrandList category="liquor"  />,
        },
        {
          path: "/brand/makgeolli",
          element: <BrandList category="makgeolli" />,
        },
        {
          path: "/brand/new",
          element: <BrandList category="new" />,
        },
        {
          path: '/brand/detail/:category/:id',
          element: <DrinksDetail />
        },
        {
          path: '/company',
          element: <Company />
        },
        {
          path: '/shop',
          element: <Shop />
        },
        {
          path: '/guide',
          element: <SBMGuide />
        },
        {
          path: '/guide/soju',
          element: <SojuGuide />
        },
        {
          path: '/guide/beer',
          element: <BeerGuide />
        },
        {
          path: '/guid/makgeolli',
          element: <MakgeolliGuide />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/profile',
      element: <Profile />
    },
    {
      path: '/mail',
      element: <ServiceMail />
    }
  ])

  return (
    <div style={{overflowX: "hidden"}}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

