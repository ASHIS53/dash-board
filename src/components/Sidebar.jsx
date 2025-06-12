import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [isPatientsOpen, setIsPatientsOpen] = useState(false);
  const [isIpdOpdOpen, setIsIpdOpdOpen] = useState(false);
  const [isOpdOpen, setIsOpdOpen] = useState(false);
  const [isIpdOpen, setIsIpdOpen] = useState(false);

  const toggle = (setter) => setter((prev) => !prev);

  const navStyle = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-sm transition ${
      isActive
        ? "bg-gray-800 text-blue-400 font-semibold"
        : "text-white hover:bg-gray-700"
    }`;

  const subNavStyle = ({ isActive }) =>
    `block px-6 py-1 rounded-md text-sm transition ${
      isActive
        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold"
        : "text-gray-300 hover:text-white hover:bg-gray-700"
    }`;

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white shadow-xl">
      <ul className="py-6 space-y-2 text-sm font-medium">
        {/* Dashboard */}
        <li>
          <NavLink to="/dashboard" className={navStyle}>
            <HomeIcon className="inline-block w-4 h-4 mr-2" />
            Dashboard
          </NavLink>
        </li>

        {/* Patients */}
        <li>
          <button
            onClick={() => toggle(setIsPatientsOpen)}
            className="w-full text-left px-4 py-2 flex justify-between items-center text-white hover:bg-gray-700 transition rounded-md"
          >
            <span>
              <UserGroupIcon className="inline-block w-4 h-4 mr-2" />
              Patients
            </span>
            {isPatientsOpen ? (
              <ChevronUpIcon className="w-4 h-4" />
            ) : (
              <ChevronDownIcon className="w-4 h-4" />
            )}
          </button>
          {isPatientsOpen && (
            <ul className="ml-2 mt-1 space-y-1 border-l border-gray-600 pl-2">
              <li>
                <NavLink to="/patients/registered" className={subNavStyle}>
                  Registered Patients
                </NavLink>
              </li>
              <li>
                <NavLink to="/patients/addmitted" className={subNavStyle}>
                  Admitted Patients
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/patients/current-admitted"
                  className={subNavStyle}
                >
                  Current Admitted
                </NavLink>
              </li>
              <li>
                <NavLink to="/patients/discharged" className={subNavStyle}>
                  Discharged Patients
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* IPD/OPD Master Menu */}
        <li>
          <button
            onClick={() => toggle(setIsIpdOpdOpen)}
            className="w-full text-left px-4 py-2 flex justify-between items-center text-white hover:bg-gray-700 transition rounded-md"
          >
            <span>
              <ClipboardDocumentListIcon className="inline-block w-4 h-4 mr-2" />
              IPD / OPD
            </span>
            {isIpdOpdOpen ? (
              <ChevronUpIcon className="w-4 h-4" />
            ) : (
              <ChevronDownIcon className="w-4 h-4" />
            )}
          </button>

          {isIpdOpdOpen && (
            <ul className="ml-2 mt-1 space-y-2 border-l border-gray-600 pl-2">
              {/* OPD Submenu */}
              <li>
                <button
                  onClick={() => toggle(setIsOpdOpen)}
                  className="w-full text-left px-2 py-1 flex justify-between items-center text-gray-300 hover:text-white transition ml-2"
                >
                  <span>OPD</span>
                  {isOpdOpen ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                </button>
                {isOpdOpen && (
                  <ul className="ml-4 mt-1 space-y-1 border-l border-gray-600 pl-2">
                    <li>
                      <NavLink to="/opd/list" className={subNavStyle}>
                        OPD List & Due Payments
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/opd/discounts" className={subNavStyle}>
                        Discount & Refunds
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/opd/outstanding" className={subNavStyle}>
                        Outstanding Reports
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/opd/star-consultants"
                        className={subNavStyle}
                      >
                        Star Consultants
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/opd/revisit-conversion"
                        className={subNavStyle}
                      >
                        Revisit & Conversion
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* IPD Submenu */}
              <li>
                <button
                  onClick={() => toggle(setIsIpdOpen)}
                  className="w-full text-left px-2 py-1 flex justify-between items-center text-gray-300 hover:text-white transition ml-2"
                >
                  <span>IPD</span>
                  {isIpdOpen ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                </button>
                {isIpdOpen && (
                  <ul className="ml-4 mt-1 space-y-1 border-l border-gray-600 pl-2">
                    <li>
                      <NavLink to="/ipd/details" className={subNavStyle}>
                        IPD Details
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/ipd/discounts" className={subNavStyle}>
                        Discount & Refunds
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/ipd/outstanding" className={subNavStyle}>
                        Outstanding Reports
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/ipd/star-consultants"
                        className={subNavStyle}
                      >
                        Star Consultants
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}
