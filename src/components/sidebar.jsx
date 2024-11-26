import React from "react";
import { Link } from "react-router-dom";

import {
  FaTachometerAlt,
  FaPaintBrush,
  FaDatabase,
  FaLink,
  FaClock,
  FaBell,
  FaUsers,
  FaLock,
  FaKey,
  FaMoneyCheckAlt,
  FaFileImport,
  FaFileExport,
  FaCog,
  FaBook,
  FaExternalLinkAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
  <>
    <div className="bg-white h-screen px-6 m-5 rounded-lg shadow ">
      <div className="mb-8 items-center justify-between">
        <h1 className="text-xl font-bold">Untitled UI</h1>
      </div>
      <div>
        <div className="mb-6">
          <h2 className="text-gray-500 text-xs uppercase font-semibold mb-3">
            General
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer">
              <FaTachometerAlt />
              Dashboard
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer">
              <FaPaintBrush />
              Appearance
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer">
              <FaDatabase />
              Database
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer">
              <FaLink />
              Connections
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer">
              <FaClock />
              Timezones
            </li>
            <li className="flex items-center justify-between text-gray-700 hover:text-blue-500 cursor-pointer">
              <div className="flex items-center gap-3">
                <FaBell />
                Notifications
              </div>
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-gray-500 text-xs uppercase font-semibold mb-3">
            Sisyphus Ventures
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer">
              <FaUsers />
              <Link to="/user-management">User Management</Link>
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer">
              <FaLock />
              Security & Access
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer">
              <FaKey />
              Authentication
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer">
              <FaMoneyCheckAlt />
              Payments
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer">
              <FaFileImport />
              Import Data
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer">
              <FaFileExport />
              Export Data
            </li>
          </ul>
        </div>
        <div>
          <ul className="space-y-2 mt-14">
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer">
              <FaCog />
              Settings
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer">
              <FaBook />
              Documentation
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-500 cursor-pointer">
              <FaExternalLinkAlt />
              Open in Browser
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
