
import './App.css';

import { 
  Route, 
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Home, Search, Blog, BlogPost, Programme, Portfolio, Services, Team, NotFound, Disclaimer, Opleiding, Opleidingen } from "./pages";

import Root from './layouts/Root';

import { ROUTES } from './routes/routes';
import { MyMUITheme } from './context/ThemeContext';

import { BlogProvider } from './context/BlogContext';

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
      <Route path={ROUTES.opleiding.path} element={<Opleiding />} />
      <Route path={ROUTES.opleidingen.path} element={<Opleidingen />} />
      
    </Route>
  )
);

function App() {
  return (
    <MyMUITheme>
      <BlogProvider>
        <RouterProvider router={router} />
      </BlogProvider>
    </MyMUITheme>
  )
}

export default App;
