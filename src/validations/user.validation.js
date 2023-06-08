'use strict'

let Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const getModules = {
    body: Joi.object().keys({
        topic: Joi.string().required(),
        level: Joi.string().required(),
        language: Joi.string().required()
    })
};

const getLessons = {
    body: Joi.object().keys({
        module_name: Joi.string().required(),
        level: Joi.string().required(),
        language: Joi.string().required(),
        topic: Joi.string().required(),
    })
}

const getDescription = {
    query: Joi.object().keys({
        module_name: Joi.string().required(),
        level: Joi.string().required(),
        language: Joi.string().required(),
        lesson_name: Joi.string().required(),
        chapter: Joi.string(),
        topic: Joi.string()
    })
}

const getQuiz = {
    body: Joi.object().keys({
        description: Joi.string().required(),
        language: Joi.string().required(),
        level: Joi.string().required()
    })
}

const getExample = {
    query: Joi.object().keys({
        module_name: Joi.string().required(),
        level: Joi.string().required(),
        language: Joi.string().required(),
        lesson_name: Joi.string().required(),
        activity_name: Joi.string()
    })
}

const getQuizAnswer = {
    body: Joi.object().keys({
        question: Joi.string().required(),
        language: Joi.string().required(),
        answer1: Joi.string().required(),
        answer2: Joi.string().required(),
        answer3: Joi.string().required(),
        answer4: Joi.string().required()
    })
}

const askQuestion = {
    query: Joi.object().keys({
        language: Joi.string().required(),
        question: Joi.string().required()
    })
}

const register = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
}

const login = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
}

const profile = {
    body: Joi.object().keys({
        firstName: Joi.string(),
        lastName: Joi.string(),
        userId: Joi.string(),
        password: Joi.custom(objectId)
    })
}
module.exports = {
    getModules,
    getLessons,
    getDescription,
    getQuiz,
    getQuizAnswer,
    askQuestion,
    getExample,
    register,
    login,
    profile
}