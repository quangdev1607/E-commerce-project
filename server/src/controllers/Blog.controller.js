const { StatusCodes } = require('http-status-codes')
const Blog = require('../models/blog')
const { BadRequestError, NotFoundError } = require('../errors')

class BlogController {
    async createBlog(req, res) {
        const { title, description, category } = req.body
        if (!title || !description || !category) throw new BadRequestError('missing inputs')
        const blog = await Blog.create({ ...req.body })
        res.status(StatusCodes.CREATED).json({
            success: blog ? true : false,
            newBlog: blog ? blog : 'cannot create blog'
        })
    }

    async getAllBlogs(req, res) {
        const blogs = await Blog.find()
        res.status(StatusCodes.OK).json({
            success: blogs ? true : false,
            counts: blogs.length,
            allBlogs: blogs ? blogs : 'Cannot get blogs',
        })
    }

    async getSingleBlog(req, res) {
        const { bid } = req.params

        const includedFields = 'firstname lastname email mobile'
        const blog = await Blog.findByIdAndUpdate(bid, { $inc: { viewCounts: 1 } }, { new: true })
            .populate('likes', includedFields)
            .populate('disLikes', includedFields)

        if (!blog) throw new NotFoundError('Blog not found')
        res.status(StatusCodes.OK).json({
            success: true,
            blog
        })
    }

    async updateBlog(req, res) {
        const { bid } = req.params
        const blog = await Blog.findByIdAndUpdate(bid, { ...req.body }, { new: true })
        if (!blog) throw new NotFoundError('Blog not found')
        res.status(StatusCodes.OK).json({
            success: true,
            updatedBlog: blog
        })
    }

    async deleteBlog(req, res) {
        const { bid } = req.params
        const blog = await Blog.findByIdAndDelete(bid)
        if (!blog) throw new NotFoundError('Blog not found')
        res.status(StatusCodes.OK).json({
            success: true,
            msg: 'Delete blog successfully'
        })
    }

    /*
    Khi người dùng like một blog:
    1. Check xem trước đó user đó có dislike bài blog đó chưa?
     - Nếu đã dislike => Bỏ dislike + Thêm like = true
     - Nếu chưa thì chỉ thêm like
    2. Check xem trước đó user đó có like hay chưa?
    - Nếu có rồi thì bỏ cái like đó
    - Nếu không thì thêm like
    */
    async likeBlog(req, res) {
        const { userId } = req.user
        const { bid } = req.params
        if (bid.length !== 24) throw new BadRequestError('Blog ID is not valid')
        const blog = await Blog.findById(bid)
        if (!blog) throw new NotFoundError('blog not found')

        // Chọc vào mảng dislikes xem có userId không
        const hasDisliked = blog?.disLikes?.find(el => el.toString() === userId)
        if (hasDisliked) {
            const response = await Blog.findByIdAndUpdate(
                bid,
                { $pull: { disLikes: userId }, $push: { likes: userId } },
                { new: true }).select('title  likes disLikes')
            return res.status(StatusCodes.OK).json({
                success: response ? true : false,
                result: response
            })
        }

        const hasLiked = blog?.likes?.find(el => el.toString() === userId)
        if (hasLiked) {
            const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: userId } }, { new: true }).select('title  likes disLikes')
            return res.status(StatusCodes.OK).json({
                success: response ? true : false,
                result: response
            })
        } else {
            const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: userId } }, { new: true }).select('title  likes disLikes')
            return res.status(StatusCodes.OK).json({
                success: response ? true : false,
                result: response
            })
        }
    }

    async disLikeBlog(req, res) {
        const { userId } = req.user
        const { bid } = req.params
        if (bid.length !== 24) throw new BadRequestError('Blog ID is not valid')
        const blog = await Blog.findById(bid)
        if (!blog) throw new NotFoundError('blog not found')

        const hasLiked = blog?.likes?.find(el => el.toString() === userId)
        if (hasLiked) {
            const response = await Blog.findByIdAndUpdate(
                bid,
                { $pull: { likes: userId }, $push: { disLikes: userId } },
                { new: true }).select('title  likes disLikes')

            return res.status(StatusCodes.OK).json({
                success: response ? true : false,
                result: response
            })
        }

        const hasDisliked = blog?.disLikes?.find(el => el.toString() === userId)
        if (hasDisliked) {
            const response = await Blog.findByIdAndUpdate(bid, { $pull: { disLikes: userId } }, { new: true }).select('title  likes disLikes')
            return res.status(StatusCodes.OK).json({
                success: response ? true : false,
                result: response
            })
        } else {
            const response = await Blog.findByIdAndUpdate(bid, { $push: { disLikes: userId } }, { new: true }).select('title  likes disLikes')
            return res.status(StatusCodes.OK).json({
                success: response ? true : false,
                result: response
            })
        }
    }

    async uploadBlogImage(req, res) {
        const { bid } = req.params
        if (bid.length !== 24) throw new BadRequestError('Blog id is not valid')
        if (!req.file) throw new BadRequestError('Image is required')
        console.log(req.file.path)
        const blog = await Blog.findByIdAndUpdate(bid, { image: req.file.path }, { new: true })
        if (!blog) throw new NotFoundError('Blog not found')
        res.status(StatusCodes.OK).json({
            success: blog ? true : false,
            updatedBlog: blog ? blog : 'Cannot upload image'
        })
    }


}

module.exports = new BlogController()

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjNjgwMTk2YjlkMjA4NjI1NzdkNjkiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5OTg2MTA2NCwiZXhwIjoxNjk5OTQ3NDY0fQ.cIIFCvuM2z4yyJLVRX4Gd9NnO2czIbGq8s1aKS2c35g