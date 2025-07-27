import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "../Componemts/Header/Header";
import FindJobs from "./FindJobs";
import FindTalent from "./FindTalent";
import JobDescriptionPage from "./JobDescriptionPage";
import ApplyJobPage from "./ApplyJobPage";
import CompanyPage from "./CompanyPage";
import PostJobPage from "./PostJobPage";
import TalentProfilePage from "./TalentProfilePage";
import PostedJobPage from "./PostedJobPage";
import JobHistoryPage from "./JobHistoryPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import Footer from "../Componemts/Footer/Footer";
import { useSelector } from "react-redux";
import RoleProtectedRoute from "../Componemts/Common/RoleProtectedRoute";
import { useTheme } from "../Context/ThemeContext";

const AppRoutes = () => {
  const user = useSelector((state: any) => state.user);
  const { isDarkMode } = useTheme();

  return (
    <BrowserRouter>
      <div className="relative min-h-screen theme-bg-primary theme-text-primary">
        <Header />
        <Routes>
          <Route
            path="/find-jobs"
            element={
              <RoleProtectedRoute allowedRoles={["APPLICANT"]}>
                <FindJobs />
              </RoleProtectedRoute>
            }
          />
          <Route path="/find-talent" element={<FindTalent />} />
          <Route path="/jobs/:id" element={<JobDescriptionPage />} />
          <Route
            path="/apply-job/:id"
            element={
              <RoleProtectedRoute allowedRoles={["APPLICANT"]}>
                <ApplyJobPage />
              </RoleProtectedRoute>
            }
          />
          <Route path="/company/:name" element={<CompanyPage />} />
          <Route
            path="/post-job/:id"
            element={
              <RoleProtectedRoute allowedRoles={["EMPLOYER"]}>
                <PostJobPage />
              </RoleProtectedRoute>
            }
          />
          <Route path="/talent-profile/:id" element={<TalentProfilePage />} />
          <Route
            path="/posted-job/:id"
            element={
              <RoleProtectedRoute allowedRoles={["EMPLOYER"]}>
                <PostedJobPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/job-history"
            element={
              <RoleProtectedRoute allowedRoles={["APPLICANT"]}>
                <JobHistoryPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
