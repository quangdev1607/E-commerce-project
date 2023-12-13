const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "auth",
  PRODUCTS: ":category",
  BLOGS: "blogs",
  FAQs: "faqs",
  CONTACT: "contact",
  SERVICES: "services",
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: ":category/:pid/:title",
  REGISTER_VERIFICATION: "register-verification/:status",
  RESET_PASSWORD: "reset-password/:token",

  // Admin
  ADMIN: "admin",
  DASHBOARD: "overview",
  MANAGE_USER: "manage-users",
  MANAGE_PRODUCTS: "manage-products",
  CREATE_PRODUCTS: "create-products",
  MANAGE_ORDER: "manage-order",

  // Member
  MEMBER: "member",
  PERSONAL: "personal",
  MYCART: "mycart",
  WISHLIST: "wishlist",
  HISTORY: "history",
};

export default path;
