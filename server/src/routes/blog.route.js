const router = require('express').Router()
const { createBlog, updateBlog, getSingleBlog, deleteBlog, getAllBlogs, likeBlog, disLikeBlog } = require('../controllers/Blog.controller')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.route('/')
    .post([verifyAccessToken, isAdmin], createBlog)
    .get(getAllBlogs)

router.route('/like/:bid').patch(verifyAccessToken, likeBlog)
router.route('/dislike/:bid').patch(verifyAccessToken, disLikeBlog)

router.route('/:bid')
    .get(getSingleBlog)
    .put([verifyAccessToken, isAdmin], updateBlog)
    .delete([verifyAccessToken, isAdmin], deleteBlog)


module.exports = router