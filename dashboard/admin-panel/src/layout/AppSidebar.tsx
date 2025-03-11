"use client";

import { useSidebar } from "@/context/SidebarContext";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaChartBar,
  FaCogs,
  FaUserTie,
  FaLayerGroup,
  FaExchangeAlt,
  FaClipboardList,
  FaBars,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

const AppSidebar = () => {
  const { isCollapsed, toggleSidebar, openMenus, toggleMenu } = useSidebar();

  return (
    <aside
      className={`bg-gray-900 text-white h-screen fixed top-0 left-0 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } flex flex-col`}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-5 right-[-25px] bg-gray-700 p-2 rounded-full"
      >
        {isCollapsed ? <FaBars size={20} /> : <FaChevronRight size={20} />}
      </button>

      {/* Sidebar Content */}
      <div className="p-4">
        <h2
          className={`text-2xl font-bold mb-6 transition-opacity ${
            isCollapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          Admin Panel
        </h2>

        <nav>
          <ul>
            <li className="mb-3">
              <Link href="/dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                <FaTachometerAlt />
                {!isCollapsed && <span>Dashboard</span>}
              </Link>
            </li>

            <li className="mb-3">
              <div className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-700 rounded" onClick={() => toggleMenu("offers")}>
                <div className="flex items-center space-x-2">
                  <FaLayerGroup />
                  {!isCollapsed && <span>Offers</span>}
                </div>
                {!isCollapsed && (openMenus["offers"] ? <FaChevronDown /> : <FaChevronRight />)}
              </div>
              {openMenus["offers"] && !isCollapsed && (
                <ul className="ml-5 mt-2">
                  <li><Link href="/offers/list">List Offers</Link></li>
                  <li><Link href="/offers/add">Add Offer</Link></li>
                  <li><Link href="/offers/edit">Edit Offer</Link></li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;

