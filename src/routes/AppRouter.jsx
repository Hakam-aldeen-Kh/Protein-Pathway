import { Route, Routes } from "react-router";
import Layout from "../common/Layout";
import Home from "../pages/Home/Home";
import PathwayData from "../pages/Pathway-Data/PathwayData";
import NewPathway from "../pages/New-Pathway/NewPathway";
import Login from "../pages/Login/Login";
import Preview from "../pages/Preview/Preview";

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
          <Layout>
            <PathwayData />
          </Layout>
        }
      />
      <Route
        path="/new-pathway"
        element={
          <Layout>
            <NewPathway />
          </Layout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/preview/:id"
        element={
          <Layout>
            <Preview />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRouter;
