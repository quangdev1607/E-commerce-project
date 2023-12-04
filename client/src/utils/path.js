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
};

export default path;
