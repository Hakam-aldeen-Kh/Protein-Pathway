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
import Review from "../pages/Review/Review";
import PathewayData from "../components/PathewayData";
import PathwayResultOnce from "../pages/Pathway-Result/PathwayResultOnce";

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
                <Review />
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

        <Route
          path="/pathway-result/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <PathwayResultOnce />
              </Layout>
            </ProtectedRoute>
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
          path="/protein-pathway-data"
          element={
            <Layout>
              <PathwayData />
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
