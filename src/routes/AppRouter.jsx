import { Route, Routes } from "react-router";
import Layout from "./Layout";

import ProtectedRoute from "./ProtectedRoute";
import PathewayData from "./PathewayData";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

import NotFound from "../pages/404/NotFound";
import NewPathway from "../pages/New-Pathway/NewPathway";
import GlycanData from "../pages/Glycan-Data/GlycanData";
import ProteinData from "../pages/Protein-Data/ProteinData";
import ReviewPathway from "../pages/Pathway-Details/ReviewPathway";
import PreviewPathway from "../pages/Pathway-Details/PreviewPathway";
import PathwayResultForPreview from "../pages/Pathway-Result/PathwayResultForPreview";
import PathwayResultAfterCreation from "../pages/Pathway-Result/PathwayResultAfterCreation";


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
        path="/*"
        element={
          <Layout>
            <NotFound />
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

      <Route element={<PathewayData />}>
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
          path="/review"
          element={
            <ProtectedRoute>
              <Layout>
                <ReviewPathway />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/pathway-result"
          element={
            <ProtectedRoute>
              <Layout>
                <PathwayResultAfterCreation />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/pathway-result/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <PathwayResultForPreview />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/preview/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <PreviewPathway />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/protein-pathway-data"
          element={
            <Layout>
              <ProteinData />
            </Layout>
          }
        />
      </Route>

      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRouter;
