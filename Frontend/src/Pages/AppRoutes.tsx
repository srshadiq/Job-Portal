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

const AppRoutes = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <BrowserRouter>
      <div className="relative">
        <Header />
        <Routes>
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/find-talent" element={<FindTalent />} />
          <Route path="/jobs/:id" element={<JobDescriptionPage />} />
          <Route path="/apply-job/:id" element={<ApplyJobPage />} />
          <Route path="/company/:name" element={<CompanyPage />} />
          <Route path="/post-job/:id" element={<PostJobPage />} />
          <Route path="/talent-profile/:id" element={<TalentProfilePage />} />
          <Route path="/posted-job/:id" element={<PostedJobPage />} />
          <Route path="/job-history" element={<JobHistoryPage />} />
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
