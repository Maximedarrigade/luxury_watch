import { Route, Routes } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop.jsx";
import RegisterPage from "./auth/RegisterPage.jsx";
import LoginPage from "./auth/LoginPage.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import AccueilPage from "./pages/AccueilPage.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import MarquesPage from "./pages/MarquesPage.jsx";
import MarquesDetailPage from "./pages/MarquesDetailPage.jsx";
import MontresPage from "./pages/MontresPage.jsx";
import MontresDetailPage from "./pages/MontresDetailPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import PanierPage from "./pages/PanierPage.jsx";
import AdminCommandesPage from "./pages/AdminCommandesPage.jsx";

function App() {
  return (
    <>
      <ScrollToTop />
        <Header />
          <Routes>
            {/* Route publique */}

              <Route path="/" element={<AccueilPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/marques" element={<MarquesPage />} />
              <Route path="/marques/:id" element={<MarquesDetailPage />} />
              <Route path="/montres" element={<MontresPage />} />
              <Route path="/montres/:id" element={<MontresDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/panier" element={<PanierPage />} />

            {/* Route admin */}

              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/commandes" element={<AdminCommandesPage />} />
              </Route>
            </Routes>

        <Footer />
    </>
  );
}

export default App;
