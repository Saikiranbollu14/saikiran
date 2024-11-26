import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../src/components/sidebar";
import UserManagement from "../src/components/UserManagement";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-grow bg-gray-100">
          <Routes>
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/" element={<div className="p-6">Dashboard</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
