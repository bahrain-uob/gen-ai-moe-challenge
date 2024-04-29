import React from "react";
import { FaHome, FaUser } from "react-icons/fa";
import './App.css';
interface Props {
  navigateTo: (destination: string) => void;
  showSection: (section: string) => void;
}

const Header: React.FC<Props> = ({ navigateTo, showSection }) => {
  const handleSectionChange = (section: string) => {
    showSection(section);
  };

  return (
    <div className="header">
      <div className="home-icon" onClick={() => navigateTo("home")}>
        <FaHome />
      </div>
      <div className="nav-links">
        <div className="nav-link" onClick={() => navigateTo("full-exam")}>
          Full Exam
        </div>
        <div className="nav-link dropdown">
          Section Exams
          <div className="dropdown-content">
            <div onClick={() => handleSectionChange("listening")}>
              Listening
            </div>
            <div onClick={() => handleSectionChange("reading")}>Reading</div>
            <div onClick={() => handleSectionChange("writing")}>Writing</div>
            <div onClick={() => handleSectionChange("speaking")}>Speaking</div>
          </div>
        </div>
      </div>
      <div className="profile-icon" onClick={() => navigateTo("profile")}>
        <FaUser />
      </div>
    </div>
  );
};

export default Header;
