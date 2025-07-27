import Companies from "./LandingPage/Companies";
import Header from "../Componemts/Header/Header";
import WelcomePage from "./LandingPage/WelcomePage";
import JobCategory from "./LandingPage/JobCategory";
import Footer from "../Componemts/Footer/Footer";

const HomePage = () => {
  return (
    <div className="min-h-[100vh] theme-bg-primary theme-text-primary font-['Poppins']">
      <WelcomePage />
      {/* <Companies /> */}
      {/* <JobCategory /> */}
    </div>
  );
};
export default HomePage;
