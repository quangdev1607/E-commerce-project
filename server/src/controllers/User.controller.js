const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const { BadRequestError, UnAuthenticatedError, NotFoundError } = require("../errors");
const { createAccessToken, createRefreshToken } = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const sender = require("../utils/sendMail");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto");

class UserController {
  // async register(req, res) {
  //   /*
  //       Đoạn code ở dưới sẽ bắt lỗi trước khi chọc vào db, giúp giảm tải cho db
  //       */
  //   // Validation Error:
  //   const { firstname, lastname, email, password } = req.body;
  //   if (!firstname || !lastname || !email || !password) throw new BadRequestError("Missing inputs");

  //   // Duplicate Error:
  //   const existedUser = await User.findOne({ email });
  //   if (existedUser) throw new BadRequestError("user has existed!");

  //   const user = await User.create({ ...req.body });
  //   res.status(StatusCodes.CREATED).json({
  //     success: user ? true : false,
  //     msg: user ? "Register successfully, please login" : "Something wrong, please try again",
  //   });
  // }

  async register(req, res) {
    const { firstname, lastname, email, password, mobile } = req.body;
    if (!firstname || !lastname || !email || !password || !mobile)
      throw new BadRequestError("Missing inputs");

    // Duplicate Error:
    const existedUser = await User.findOne({ email });
    if (existedUser) throw new BadRequestError("user has existed!");

    const token = crypto.randomUUID();
    res.cookie("registerData", { ...req.body, token }, { httpOnly: true, maxAge: 15 * 60 * 1000 });
    const html = `Please click the following link to verify your account. This link will be expired in 15 minutes from now. <a href=${process.env.SERVER_URL}/api/user/register-verification/${token}>Click here to verify</a>`;
    const data = {
      email,
      html,
      subject: "Verify account",
    };
    await sendMail(data);
    return res.status(StatusCodes.OK).json({
      success: true,
      msg: "Check your inbox to verify your account",
    });
  }

  async handleRegister(req, res) {
    const cookie = req.cookies;
    const { verifiedToken } = req.params;

    if (!cookie || cookie?.registerData?.token !== verifiedToken) {
      res.clearCookie("registerData");
      return res.redirect(`${process.env.CLIENT_URL}/register-verification/fail`);
    }
    // throw new NotFoundError("Register failed");

    const { token, ...userData } = cookie.registerData;
    const user = await User.create({ ...userData });

    res.clearCookie("registerData");
    if (user) return res.redirect(`${process.env.CLIENT_URL}/register-verification/success`);
    else return res.redirect(`${process.env.CLIENT_URL}/register-verification/fail`);
  }

  async logIn(req, res) {
    const { email, password } = req.body;

    // Bỏ trống email hoặc password
    if (!email || !password) throw new BadRequestError("Missing inputs");

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      // Tách password,role và rftoken ra khỏi user object
      const { password, role, refreshToken, ...userData } = user._doc;

      //Tạo accessToken
      const accessToken = createAccessToken(user._id, role);

      // Tạo refreshToken
      const newRefreshToken = createRefreshToken(user._id);

      // Lưu refreshToken vào db
      await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken }, { new: true }); // new:true => trả data sau khi update

      // Lưu refreshToken vào cookie
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(StatusCodes.OK).json({
        success: user ? true : false,
        accessToken,
        userData,
        msg: user ? "Login successfully" : "Something wrong, please try again",
      });
    } else {
      throw new UnAuthenticatedError("Invalid Credentials");
    }
  }

  async allUser(req, res) {
    const users = await User.find()
      .populate("cart.product", "title price brand totalRatings")
      .select("-refreshToken -password -role");
    res.status(StatusCodes.OK).json({
      success: users ? true : false,
      users,
    });
  }

  async getOneUser(req, res) {
    const { userId } = req.user;
    const user = await User.findById({ _id: userId })
      .populate("cart.product", "title price brand totalRatings")
      .select("-refreshToken -password -role");
    return res.status(StatusCodes.OK).json({
      success: user ? true : false,
      result: user ? user : "User not found",
    });
  }

  async deleteUser(req, res) {
    const { _id } = req.query;
    if (!_id) throw new BadRequestError("missing inputs");
    const deletedUser = await User.findByIdAndDelete(_id);
    if (!deletedUser) throw new NotFoundError("User not found");
    res.status(StatusCodes.OK).json({
      success: deletedUser ? true : false,
      deletedUser: deletedUser
        ? `User with email ${deletedUser.email} has been deleted`
        : "Something wrong",
    });
  }

  async updateUser(req, res) {
    const { userId } = req.user;
    if (!userId || Object.keys(req.body).length === 0) throw new BadRequestError("missing inputs");
    const user = await User.findByIdAndUpdate({ _id: userId }, req.body, { new: true }).select(
      "-password -role -refreshToken"
    );
    res.status(StatusCodes.OK).json({
      success: user ? true : false,
      updatedUser: user ? user : "Something wrong",
    });
  }

  async updateUserByAdmin(req, res) {
    const { userId } = req.params;
    if (Object.keys(req.body).length === 0) throw new BadRequestError("missing inputs");
    const user = await User.findByIdAndUpdate({ _id: userId }, req.body, { new: true }).select(
      "-password -role -refreshToken"
    );
    if (!user) throw new NotFoundError("User not found");
    res.status(StatusCodes.OK).json({
      success: user ? true : false,
      updatedUser: user ? user : "Somethign wrong",
    });
  }

  async refreshToken(req, res) {
    // Lấy refresh token từ Cookie
    const cookie = req.cookies;

    // Kiểm tra có cookie hay token trong cookie  hay không
    if (!cookie) throw new NotFoundError("No cookie found");
    if (!cookie.refreshToken) throw new NotFoundError("No refresh token in cookies");

    const payload = jwt.verify(cookie.refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN);
    const user = await User.findOne({ _id: payload.userId, refreshToken: cookie.refreshToken });
    const newAccessToken = createAccessToken(user._id, user.role);
    res.status(StatusCodes.OK).json({
      success: user ? true : false,
      newAccessToken: user ? newAccessToken : "Cannot found refresh token",
    });
  }

  async logOut(req, res) {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) throw new NotFoundError("Cannot found refresh token");

    // Reset refresh token thành chuỗi rỗng trong db
    const user = await User.findOneAndUpdate(
      { refreshToken: cookie.refreshToken },
      { refreshToken: "" },
      { new: true }
    );

    // Xóa refresh token ở cookie trình duyệt
    res.clearCookie("refreshToken", {
      httpOnly: true,
    });

    res.status(StatusCodes.OK).json({
      success: user ? true : false,
      msg: user ? "Logout successfully" : "Cannot logout, please try again",
    });
  }

  /*
    Client cung cấp email để thay đổi password
    Server check email có hợp không: Gửi mail kèm theo link (password change token)
    Client sẽ click vào cái link đó để lấy token
    Client dùng api thay đổi password và kèm theo token gửi về server
    Server sẽ check token đó có giống với token lúc gửi đi hay không
    Nếu giống thì cho phép đổi password, không giống thì báo lỗi về client
    */

  // Check mail + send mail
  async forgotPassword(req, res) {
    const { email } = req.body;
    if (!email) throw new BadRequestError("Email is required");
    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError("User not found");
    const resetToken = await user.createPasswordChangedToken();
    await user.save();

    const html = `Please click the following link to change your password. This link will be expired in 15 minutes from now. <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here to change password</a>`;

    const data = {
      email,
      html,
      subject: "Forgot password",
    };
    await sendMail(data);
    return res.status(StatusCodes.OK).json({
      success: true,
      msg: "Check your inbox to reset your password",
    });
  }

  // So sánh token
  async resetPassword(req, res) {
    const { password, token } = req.body;

    if (!password) throw new BadRequestError("New password is required");
    if (!token) throw new BadRequestError("Token is required");

    const passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken,
      passwordResetExpire: { $gt: Date.now() },
    });

    if (!user) throw new NotFoundError("User not found");

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    user.passwordChangedAt = Date.now();
    await user.save();

    return res.status(StatusCodes.OK).json({
      success: user ? true : false,
      msg: user ? "Update password successfully" : "Something went wrong",
    });
  }

  async updateUserAddress(req, res) {
    const { userId } = req.user;
    if (!req.body.address) throw new BadRequestError("address is required");

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User not found");
    const duplicatedAddress = user?.address?.find((el) => el.toString() === req.body.address);
    if (duplicatedAddress) {
      await User.findByIdAndUpdate(userId, { $pull: { address: req.body.address } }, { new: true });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { address: req.body.address } },
      { new: true }
    );
    res.status(StatusCodes.OK).json({
      success: user ? true : false,
      updatedUser,
    });
  }

  async addUserCart(req, res) {
    const { userId } = req.user;
    const { pid, quantity, color } = req.body;
    if (!pid || !quantity || !color) throw new BadRequestError("missing inputs");
    if (pid.length !== 24) throw new BadRequestError("Invalid Product ID");

    const userCart = await User.findById(userId);
    const hasProduct = userCart?.cart?.find(
      (el) => el.product.toString() === pid && el.color === color
    );

    if (hasProduct) {
      const response = await User.updateOne(
        { cart: { $elemMatch: hasProduct } },
        { $set: { "cart.$.quantity": quantity } },
        { new: true }
      );
      res.status(StatusCodes.OK).json({
        success: response ? true : false,
        msg: response.acknowledged ? "Cart updated successfully" : "Something went wrong",
        quantity:
          +hasProduct.quantity !== +quantity
            ? `from ${hasProduct.quantity} to ${quantity}`
            : "remain",
      });
    } else {
      const response = await User.findByIdAndUpdate(
        userId,
        { $push: { cart: { product: pid, quantity, color } } },
        { new: true }
      );
      res.status(StatusCodes.OK).json({
        success: response ? true : false,
        msg: response ? "Successfully add product to cart" : "Failed to add product",
        updatedProduct: response,
      });
    }
  }
}

module.exports = new UserController();
