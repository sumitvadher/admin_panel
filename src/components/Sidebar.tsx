"use client";
import { useState } from "react";
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
  FaTimes,
  FaChevronDown,
  FaChevronRight
} from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    offers: false,
    transactions: false,
    reports: false,
    affiliates: false,
    mapping: false,
    settings: false,
  });

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className={`h-screen bg-gray-900 text-white p-5 fixed transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-5 right-[-25px] bg-gray-700 p-2 rounded-full"
      >
        {isCollapsed ? <FaBars size={20} /> : <FaTimes size={20} />}
      </button>

      <h2 className={`text-2xl font-bold mb-6 transition-opacity ${isCollapsed ? "opacity-0" : "opacity-100"}`}>
        Admin Panel
      </h2>

      <nav>
        <ul>
          {/* Dashboard */}
          <li className="mb-3">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <FaTachometerAlt />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </li>

          {/* Offers */}
          <li className="mb-3">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleMenu("offers")}>
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

          {/* Transactions */}
          <li className="mb-3">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleMenu("transactions")}>
              <div className="flex items-center space-x-2">
                <FaExchangeAlt />
                {!isCollapsed && <span>Transactions</span>}
              </div>
              {!isCollapsed && (openMenus["transactions"] ? <FaChevronDown /> : <FaChevronRight />)}
            </div>
            {openMenus["transactions"] && !isCollapsed && (
              <ul className="ml-5 mt-2">
                <li><Link href="/transactions/list">View Transactions</Link></li>
                <li><Link href="/transactions/status">Transaction Status</Link></li>
              </ul>
            )}
          </li>

          {/* Reports */}
          <li className="mb-3">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleMenu("reports")}>
              <div className="flex items-center space-x-2">
                <FaChartBar />
                {!isCollapsed && <span>Reports</span>}
              </div>
              {!isCollapsed && (openMenus["reports"] ? <FaChevronDown /> : <FaChevronRight />)}
            </div>
            {openMenus["reports"] && !isCollapsed && (
              <ul className="ml-5 mt-2">
                <li><Link href="/reports/summary">Summary</Link></li>
                <li><Link href="/reports/detailed">Detailed Reports</Link></li>
                <li><Link href="/reports/custom">Custom Reports</Link></li>
                <li><Link href="/reports/attempts">Attempts</Link></li>  {/* ✅ NEW ATTEMPTS REPORT */}
              </ul>
            )}
          </li>

          {/* Affiliates */}
          <li className="mb-3">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleMenu("affiliates")}>
              <div className="flex items-center space-x-2">
                <FaUserTie />
                {!isCollapsed && <span>Affiliates</span>}
              </div>
              {!isCollapsed && (openMenus["affiliates"] ? <FaChevronDown /> : <FaChevronRight />)}
            </div>
            {openMenus["affiliates"] && !isCollapsed && (
              <ul className="ml-5 mt-2 space-y-2">
                <li>
                  <Link href="/affiliates" className="block px-2 py-1 hover:bg-gray-700 rounded">
                    Manage Affiliates
                  </Link>
                </li>
                <li>
                  <Link href="/affiliates/new" className="block px-2 py-1 hover:bg-gray-700 rounded">
                    Add Affiliate
                  </Link>
                </li>
              </ul>
            )}
          </li>


          {/* Mapping */}
          <li className="mb-3">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleMenu("mapping")}>
              <div className="flex items-center space-x-2">
                <FaClipboardList />
                {!isCollapsed && <span>Mapping</span>}
              </div>
              {!isCollapsed && (openMenus["mapping"] ? <FaChevronDown /> : <FaChevronRight />)}
            </div>
            {openMenus["mapping"] && !isCollapsed && (
              <ul className="ml-5 mt-2">
                <li><Link href="/mapping/smartoffer">SmartOffer Mapping</Link></li>
                <li><Link href="/mapping/offer">Offer Mapping</Link></li>
              </ul>
            )}
          </li>

          {/* Settings */}
          <li className="mb-3">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleMenu("settings")}>
              <div className="flex items-center space-x-2">
                <FaCogs />
                {!isCollapsed && <span>Settings</span>}
              </div>
              {!isCollapsed && (openMenus["settings"] ? <FaChevronDown /> : <FaChevronRight />)}
            </div>
            {openMenus["settings"] && !isCollapsed && (
              <ul className="ml-5 mt-2">
                <li><Link href="/settings/preferences">Preferences</Link></li>
                <li><Link href="/settings/api">API Settings</Link></li>
                <li><Link href="/settings/users">User Management</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

