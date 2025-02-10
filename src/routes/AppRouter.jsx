import { Route, Routes } from "react-router";
import Layout from "../common/Layout";
import Home from "../pages/Home/Home";
import PathwayData from "../pages/Pathway-Data/PathwayData";
import NewPathway from "../pages/New-Pathway/NewPathway";
import Login from "../pages/Login/Login";
import Preview from "../pages/Preview/Preview";
import ProtectedRoute from "../components/ProtectedRoute";
import PathwayResult from "../pages/Pathway-Result/PathwayResult";
import GlycanData from "../pages/Glycan-Data/GlycanData";

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
        path="/protein-pathway-data"
        element={
          <Layout>
            <PathwayData />
          </Layout>

        }
      />
      <Route
        path="/glycan-pathway-data"
        element={
          <Layout>
            <GlycanData />
          </Layout>

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
        path="/preview/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <Preview />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/pathway-result"
        element={
          <ProtectedRoute>
            <Layout>
              <PathwayResult />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
