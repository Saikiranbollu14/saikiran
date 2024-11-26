import React, { useState, useEffect } from "react"; 
import { IoIosArrowForward } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { BsFilterSquare } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { IoMdArrowDown } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [filterKey, setFilterKey] = useState("hair.color");  // default filter key
  const [filterValue, setFilterValue] = useState("");  // default filter value

  const ITEMS_PER_PAGE = 8;

  // Function to fetch users with optional filters
  const fetchUsers = async (page = 1, filterKey = "", filterValue = "") => {
    setLoading(true);
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Construct the query string with optional filters
    let url = `https://dummyjson.com/users?limit=${ITEMS_PER_PAGE}&skip=${skip}`;
    
    if (filterKey && filterValue) {
      url = `https://dummyjson.com/users/filter?key=${filterKey}&value=${filterValue}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users when page or filter changes
  useEffect(() => {
    fetchUsers(currentPage, filterKey, filterValue);
  }, [currentPage, filterKey, filterValue]);

  // Handle search term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Show notification when adding user
  const handleUpdateNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="bg-white min-h-screen mt-4 rounded shadow">
      <header className="bg-white py-4 px-6 flex justify-between items-center"> 
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            className="w-8 h-8"
          />
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-600">
              Sisyphus Ventures
            </h2>
            <IoIosArrowForward className="text-gray-500" />
            <span className="text-black font-semibold">User Management</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-gray-800 font-medium">Florence Shaw</span>
        </div>
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">All Users</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search"
                className="border rounded px-10 py-2 w-full shadow-sm"
              />
              <CiSearch className="absolute top-2/4 left-3 transform -translate-y-1/2 text-gray-500" />
            </div>
            <div className="relative">
              <select
                value={filterKey}
                onChange={(e) => setFilterKey(e.target.value)}
                className="border rounded px-4 py-2"
              >
                <option value="hair.color">Hair Color</option>
                <option value="access">Access</option>
                <option value="status">Status</option>
                {/* Add more filter options here */}
              </select>
            </div>
            <div className="relative w-64">
              <input
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder="Filter value"
                className="border rounded px-4 py-2 w-full shadow-sm"
              />
            </div>
            <button
              onClick={() => fetchUsers(currentPage, filterKey, filterValue)}
              className="flex items-center gap-2 border px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
            >
              <BsFilterSquare className="text-gray-500" />
              Filter
            </button>
            <button
              onClick={handleUpdateNotification}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              <IoIosAdd />
              Add User
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          {loading ? (
            <p className="text-center py-4">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse">
                <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2">
                      <input type="checkbox" />
                    </th>
                    <th className="px-4 py-2 text-left">User Name</th>
                    <th className="px-4 py-2 text-left">Access</th>
                    <th className="px-4 py-2 text-left flex items-center gap-1">
                      Last Active
                      <IoMdArrowDown className="text-gray-500" />
                    </th>
                    <th className="px-4 py-2">Date Added</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="h-96 overflow-y-auto">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2 text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-2">
                            <img
                              src="https://via.placeholder.com/40"
                              alt={user.firstName}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-semibold">
                                {user.firstName} {user.lastName}
                              </p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                            Admin
                          </span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm ml-2">
                            Data Export
                          </span>
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm ml-2">
                            Data Import
                          </span>
                        </td>

                        <td className="px-4 py-2 text-gray-600">Mar 4, 2024</td>
                        <td className="px-4 py-2 text-gray-600">Mar 4, 2024</td>
                        <td className="px-4 py-2 text-gray-600">July 4, 2022</td>
                        <td className="px-4 py-2 text-center">
                          <HiDotsVertical className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-l"
          >
            Prev
          </button>
          {generatePageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-r"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
