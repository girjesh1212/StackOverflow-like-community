const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
    let errors = {};

    if (isEmpty(data.quesId)) {
        errors.quesId = 'Question id is required';
    }

    if (isEmpty(data.text)) {
        errors.text = 'Text is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}