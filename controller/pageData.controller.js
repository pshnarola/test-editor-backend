const { Op, where } = require('Sequelize');
const { Page, User, sequelize } = require('../models')

exports.addPage = async (req, res) => {
    try {
        const pageData = { ...req.body };
        pageData['user'] = req.authUser
        const page = await Page.create(pageData)
        if (!page) {
            return res.status(400).json({ message: `Getting error while creating new page!!`, status: "fail" })
        }
        return res.status(200).json({ message: `New Page created successfully!!`, status: "success" })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

exports.getPages = async (req, res) => {
    try {
        const page = await Page.findAll({ where: [{ user: req.authUser }] })
        if (!page) {
            return res.status(400).json({ message: `Something Wrong!!`, status: "fail" })
        }
        return res.status(200).json({ data: page, status: "success" })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

exports.getPageById = async (req, res) => {
    try {
        const page = await Page.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ['fullName', 'email']
            }]
        })
        if (!page) {
            return res.status(400).json({ message: `Page not found!!`, status: "fail" })
        }
        return res.status(200).json({ data: page, status: "success" })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

exports.updatePage = async (req, res) => {
    try {
        const page = await Page.findByPk(req.params.id)
        const pageData = { ...req.body }
        if (!page) {
            return res.status(400).json({ message: `Page not found!!`, status: "fail" })
        }
        const updatedPage = await page.update(pageData)
        if (!updatedPage) {
            return res.status(400).json({ message: `Getting error while updating the page!!`, status: "fail" })
        }
        return res.status(200).json({ message: 'Page updated successfully!!', status: "success" })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

exports.deletePage = async (req, res) => {
    try {
        const page = await Page.findByPk(req.params.id)
        const pageData = { ...req.body }
        if (!page) {
            return res.status(400).json({ message: `Page not found!!`, status: "fail" })
        }
        const updatedPage = await page.destroy()
        if (!updatedPage) {
            return res.status(400).json({ message: `Getting error while updating the page!!`, status: "fail" })
        }
        return res.status(200).json({ message: 'Page updated successfully!!', status: "success" })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}