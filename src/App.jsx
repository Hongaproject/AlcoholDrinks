import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Section from "./Section/Section";
import Layout from "./Layout/Layout";
import Story from "./Story/Story";
import SojuStory from "./Story/SojuStory";
import BeerStory from "./Story/BeerStory";
import MakgeolliStory from "./Story/MakgeolliStory";
import Soju from "./Brand/Soju";
import Beer from "./Brand/Beer";
import Liquor from "./Brand/Liquor";
import Makgeolli from "./Brand/Makgeolli";
import SojuDetail from "./Brand/details/SojuDetail";
import Company from "./Company,Shop/Company";
import Shop from "./Company,Shop/Shop";
import SBGuide from "./Guide/SBGuide";
import New from "./Brand/New";
import SojuGuide from "./Guide/SojuGuide";
import BeerGuide from "./Guide/BeerGuide";

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
          path: '/brand/soju',
          element: <Soju />
        },
        {
          path: '/brand/beer',
          element: <Beer />
        },
        {
          path: '/brand/liquor',
          element: <Liquor />
        },
        {
          path: '/brand/makgeolli',
          element: <Makgeolli />
        },
        {
          path: '/brand/new',
          element: <New />
        },
        {
          path: '/brand/detail/:category/:id',
          element: <SojuDetail />
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
          element: <SBGuide />
        },
        {
          path: '/guide/soju',
          element: <SojuGuide />
        },
        {
          path: '/guide/beer',
          element: <BeerGuide />
        }
      ]
    },

  ])

  return (
    <div style={{overflowX: "hidden"}}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
