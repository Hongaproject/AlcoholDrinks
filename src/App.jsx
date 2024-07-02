import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Section from "./Section/Section";
import Layout from "./Layout/Layout";
import Story from "./Story/Story";
import SojuStory from "./Story/SojuStory";
import BeerStory from "./Story/BeerStory";
import MakgeolliStory from "./Story/MakgeolliStory";

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
