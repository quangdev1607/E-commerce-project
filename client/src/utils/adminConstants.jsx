import icons from "./icons";
import path from "./path";

const { RiDashboardLine, FaUsers, RiProductHuntFill, RiBillLine } = icons;
export const adminSideBarItems = [
  {
    id: 1,
    type: "SINGLE",
    text: "DASHBOARD",
    icon: <RiDashboardLine size={20} />,
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "MANAGE USERS",
    icon: <FaUsers size={20} />,
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
  },
  {
    id: 3,
    type: "MULTIPLE",
    text: "MANAGE PRODUCTS",
    icon: <RiProductHuntFill size={20} />,
    subMenu: [
      {
        text: "Create product",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
      },
      {
        text: "Manage product",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
      },
    ],
  },
  {
    id: 4,
    type: "SINGLE",
    text: "MANAGE ORDERS",
    icon: <RiBillLine size={20} />,
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
  },
];
