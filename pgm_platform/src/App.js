
import './App.css';

import { 
  Route, 
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Home, Search, Blog, Programme, Portfolio, Services, Team, NotFound, Disclaimer } from "./pages";

import Root from './layouts/Root';

import { ROUTES } from './routes/routes';
import BlogPost from './pages/BlogPost';
import { MyMUITheme } from './context/ThemeContext';
import { LightSwitch } from './components';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<NotFound />}>
      <Route path={ROUTES.home.path} element={<Home />} />
      <Route path={ROUTES.search.path} element={<Search />} />
      <Route path={ROUTES.blog.path} element={<Blog />} />
      <Route path={ROUTES.blogPost.path} element={<BlogPost />} />
      <Route path={ROUTES.programme.path} element={<Programme />} />
      <Route path={ROUTES.portfolio.path} element={<Portfolio />} />
      <Route path={ROUTES.services.path} element={<Services />} />
      <Route path={ROUTES.team.path} element={<Team />} />
      <Route path={ROUTES.disclaimer.path} element={<Disclaimer />} />
    </Route>
  )
);

function App() {
  return (
    <MyMUITheme>
      <RouterProvider router={router} />
    </MyMUITheme>
  )
}

export default App;
