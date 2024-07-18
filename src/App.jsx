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
          element: <BrandList category="soju" jsonFile="/db/brandsoju.json" title="소주" />,
        },
        {
          path: "/brand/beer",
          element: <BrandList category="beer" jsonFile="/db/brandbeer.json" title="맥주" />,
        },
        {
          path: "/brand/liquor",
          element: <BrandList category="liquor" jsonFile="/db/brandliquor.json" title="증류주" />,
        },
        {
          path: "/brand/makgeolli",
          element: <BrandList category="makgeolli" jsonFile="/db/brandmakgeolli.json" title="막걸리" />,
        },
        {
          path: "/brand/new",
          element: <BrandList category="new" jsonFile="/db/brandnew.json" title="신제품" />,
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

  ])

  return (
    <div style={{overflowX: "hidden"}}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

