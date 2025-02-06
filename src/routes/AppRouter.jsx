import { Route, Routes } from "react-router";
import Layout from "../common/Layout";
import Home from "../pages/Home/Home";
import PathwayData from "../pages/Pathway-Data/PathwayData";
import NewPathway from "../pages/New-Pathway/NewPathway";
import Login from "../pages/Login/Login";
import Preview from "../pages/Preview/Preview";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/pathway-data"
        element={
          <ProtectedRoute>
            <Layout>
              <PathwayData />
            </Layout>
          </ProtectedRoute>

        }
      />
      <Route
        path="/new-pathway"
        element={
          <ProtectedRoute>
            <Layout>
              <NewPathway />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/preview"
        element={
          <ProtectedRoute>
            <Layout>
              <Preview />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
