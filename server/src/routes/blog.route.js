const router = require('express').Router()
const { createBlog, updateBlog, getSingleBlog, deleteBlog, getAllBlogs, likeBlog, disLikeBlog, uploadBlogImage } = require('../controllers/Blog.controller')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploadImage = require('../config/cloudinary/cloudinary.config')

router.route('/')
    .post([verifyAccessToken, isAdmin], createBlog)
    .get(getAllBlogs)

router.route('/upload/:bid').put([verifyAccessToken, isAdmin], uploadImage.single('image'), uploadBlogImage)
router.route('/like/:bid').patch(verifyAccessToken, likeBlog)
router.route('/dislike/:bid').patch(verifyAccessToken, disLikeBlog)

router.route('/:bid')
    .get(getSingleBlog)
    .put([verifyAccessToken, isAdmin], updateBlog)
    .delete([verifyAccessToken, isAdmin], deleteBlog)


module.exports = router