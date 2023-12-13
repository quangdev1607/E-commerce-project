import icons from "./icons";
import path from "./path";

const { RiDashboardLine, FaUsers, RiProductHuntFill, RiBillLine } = icons;
export const memberSideBarItems = [
  {
    id: 1,
    type: "SINGLE",
    text: "PERSONAL",
    icon: <RiDashboardLine size={20} />,
    path: `/${path.MEMBER}/${path.PERSONAL}`,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "MY CART",
    icon: <FaUsers size={20} />,
    path: `/${path.MEMBER}/${path.MYCART}`,
  },

  {
    id: 3,
    type: "SINGLE",
    text: "WISH LIST",
    icon: <RiBillLine size={20} />,
    path: `/${path.MEMBER}/${path.WISHLIST}`,
  },
  {
    id: 4,
    type: "SINGLE",
    text: "HISTORY",
    icon: <RiProductHuntFill size={20} />,
    path: `/${path.MEMBER}/${path.HISTORY}`,
  },
];
