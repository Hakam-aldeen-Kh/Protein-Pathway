import { Route, Routes } from "react-router";

import Layout from "../layout/Layout";

import ProtectedRoute from "./ProtectedRoute";
import PathewayContext from "./PathewayContext";

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
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Edit-Profile/EditProfile";
import EmailInputPage from "../pages/Forgot-Passwrod/pages/EmailInputPage";
import ConfirmationPage from "../pages/Forgot-Passwrod/pages/ConfirmationPage";
import ResetPasswordPage from "../pages/Forgot-Passwrod/pages/ResetPasswordPage";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
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

      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />

      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
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

      <Route
        path="/reset-password"
        element={
          <Layout>
            <EmailInputPage />
          </Layout>
        }
      />

      <Route
        path="/reset-password/confirmation"
        element={
          <Layout>
            <ConfirmationPage />
          </Layout>
        }
      />

      <Route
        path="/reset-password/reset"
        element={
          <Layout>
            <ResetPasswordPage />
          </Layout>
        }
      />

      {/* Protected Routes */}
      <Route element={<PathewayContext />}>
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
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <Layout>
                <EditProfile />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
