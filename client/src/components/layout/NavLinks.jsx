import {
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaHome,
  FaMoneyBillWave,
  FaThLarge,
  FaChartLine,
  FaBullhorn,
} from "react-icons/fa";
import { scrollToSection } from "../common/ScrollToSection";

const links = [
  {
    title: "Home",
    section: "hero",
    icon: FaHome,
  },
  {
    title: "Categories",
    section: "categories",
    icon: FaThLarge,
  },
  {
    title: "Price Trends",
    path: "/price-trends",
    icon: FaChartLine,
  },
  {
    title: "Announcements",
    path: "/announcements",
    icon: FaBullhorn,
  },
];

function NavLinks({ mobile = false, onClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={
        mobile
          ? "flex flex-col gap-4"
          : "hidden items-center gap-4 lg:flex"
      }
    >
      {links.map(({ title, path, section, icon: Icon }) =>
        section ? (
          <button
            key={title}
            type="button"
            onClick={() => {
              // scrollToSection(section);
              onClick?.();
              setTimeout(() => {
                if (location.pathname === "/") {
                  scrollToSection(section);
                } else {
                  navigate("/", {
                    state: {
                      section,
                    },
                  });
                }
              }, 1);
            }}
            className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition hover:bg-green-50 hover:text-green-600 active:scale-95"
          >
            <Icon />
            <span>{title}</span>
          </button>
        ) : (
          <NavLink
            key={title}
            to={path}
            onClick={onClick}
            className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-green-50 hover:text-green-600"  
          >
            <Icon />
            <span>{title}</span>
          </NavLink>
        )
      )}
    </div>
  );
}

export default NavLinks;