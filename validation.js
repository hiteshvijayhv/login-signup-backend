const Joi = require('joi')

const SignupValidation = (dataSchema) => {

    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(dataSchema)
}

const loginValidation = (dataSchema) => {

    const schema = Joi.object({
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(dataSchema)
}

module.exports.SignupValidation = SignupValidation
module.exports.loginValidation = loginValidation


