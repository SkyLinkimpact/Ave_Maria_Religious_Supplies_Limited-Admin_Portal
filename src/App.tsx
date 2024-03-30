import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./layouts/app.layout";
import { CATEGORIES_ROUTE, LOGIN_ROUTE, PRODUCTS_ROUTE } from "./routes";
import { CategoryPage, LoginPage, ProductsPage } from "./pages";
import ProtectedLayout from "./layouts/protected.layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path={LOGIN_ROUTE} element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route path={CATEGORIES_ROUTE} element={<CategoryPage />} />
        <Route path={PRODUCTS_ROUTE} element={<ProductsPage />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
