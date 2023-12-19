import { AiFillHome } from "react-icons/ai";
import icons from "./icons";
import path from "./path";

const { FaUser, FaHistory, FaHeart } = icons;
export const memberSideBarItems = [
  {
    id: 1,
    type: "SINGLE",
    text: "PERSONAL",
    icon: <FaUser size={20} />,
    path: `/${path.MEMBER}/${path.PERSONAL}`,
  },

  {
    id: 2,
    type: "SINGLE",
    text: "WISH LIST",
    icon: <FaHeart size={20} />,
    path: `/${path.MEMBER}/${path.WISHLIST}`,
  },
  {
    id: 3,
    type: "SINGLE",
    text: "HISTORY",
    icon: <FaHistory size={20} />,
    path: `/${path.MEMBER}/${path.HISTORY}`,
  },
  {
    id: 4,
    type: "SINGLE",
    text: "HOME",
    icon: <AiFillHome size={20} />,
    path: `/`,
  },
];
