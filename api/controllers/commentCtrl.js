// Load Input Validation
const validateCommentInput = require('../../validation/comment');

const Question = require('../../models/Question');
const Comment = require('../../models/Comment');

module.exports.test = (req, res) => {
    return res.status(200).json({ msg: 'Comment route works' });
}

module.exports.create = (req, res) => {
    //Check validation
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) { return res.status(400).json({ success: false, msg: errors }); }


    Question.exists({ _id: req.body.quesId }, (e, doc) => {
        if (e) {
            return res.json({ success: false, msg: 'Some error' });
        }
        if (!doc) {
            return res.json({ success: false, msg: 'No question exists with this id' });
        }

        const newComment = new Comment({
            user: req.user._id,
            text: req.body.text,
        });

        newComment.save((err) => {
            if (err) {
                return res.json({ success: false, msg: 'Database error, comment creation failed' });
            }
            Question.findByIdAndUpdate(req.body.quesId, { $push: { comments: newComment._id } }, (e, doc) => {
                if (e) {
                    return res.json({ success: false, msg: 'Some error occurred' });
                }
                return res.json({ success: true, msg: 'Comment successful' });
            });
        });
    });
}
