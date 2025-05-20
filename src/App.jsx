import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoutes from "./pages/ProtectedRoutes.jsx";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter fallback={<SpinnerFullPage />}>
          <Suspense>
            <Routes>
              <Route index path="/" element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountriesList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;

// Before Optimisations bundle split lazy loading

// dist/index.html                   0.46 kB │ gzip:   0.31 kB
// dist/assets/index-1570a6ae.css   30.21 kB │ gzip:   5.04 kB
// dist/assets/index-4f26ab4e.js   566.33 kB │ gzip: 166.22 kB

// After
// dist/index.html                           0.46 kB │ gzip:   0.31 kB
// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/PageNav-4503fc2e.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/Homepage-380f4eeb.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/AppLayout-1537fb45.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-b6c993dd.css           26.54 kB │ gzip:   4.37 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// 27 kB
// dist/assets/Pricing-d0d94970.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Homepage-b47f638f.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-1746922f.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-34ccc774.js             1.02 kB │ gzip:   0.54 kB
// dist/assets/AppLayout-fe3e7e15.js       156.78 kB │ gzip:  46.14 kB
// dist/assets/index-f086032d.js           407.09 kB │ gzip: 118.98 kB
