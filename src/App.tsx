import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./layouts/app.layout";
import {
  CATEGORIES_ROUTE,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
} from "./routes";
import {
  CategoryPage,
  DashboardPage,
  LoginPage,
  OrdersPage,
  ProductsPage,
} from "./pages";
import ProtectedLayout from "./layouts/protected.layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path={LOGIN_ROUTE} element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route path={CATEGORIES_ROUTE} element={<CategoryPage />} />
        <Route path={PRODUCTS_ROUTE} element={<ProductsPage />} />
        <Route path={ORDERS_ROUTE} element={<OrdersPage />} />
        <Route path={DASHBOARD_ROUTE} element={<DashboardPage />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
