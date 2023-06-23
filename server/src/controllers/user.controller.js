const userModel = require('../models/user.model');

class UserController {
    register = async (req, res) => {
        const { email, password, name } = req.body
        if (!email || !password || !name) return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })

        const response = await userModel.create(req.body)
        return res.status(200).json({
            success: response ? true : false,
            response
        })
    }
}

module.exports = new UserController()