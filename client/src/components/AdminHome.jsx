import React from "react";
import AdminNavbar from "./AdminNavbar";
import AdminRecommendations from './AdminRecommendations';

const AdminHome = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-8 pt-4 px-4">
        <AdminNavbar />
        <h1 className="font-semibold text-7xl">
          Welcome to <span className="font-thin text-[#82ca9f]">Libre</span>
          <span className="font-black text-[#82ca9f]">Reads</span>
        </h1>
        <h2 className="font-normal text-2xl">
          LibreReads is your free ebook library where you can download books
          that are available in our collections.
        </h2>
        <AdminRecommendations />
      </div>
    </div>
  );
};

export default AdminHome;
