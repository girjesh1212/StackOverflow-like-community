// Load Input Validation
const validateAnswerInput = require('../../validation/answer');

const Answer = require('../../models/Answer');
const Question = require('../../models/Question');

module.exports.test = (req, res) => {
    return res.status(200).json({ msg: 'Answer route works' });
}

module.exports.create = (req, res) => {
    //Check validation
    const { errors, isValid } = validateAnswerInput(req.body);
    if (!isValid) { return res.status(400).json({ success: false, msg: errors }); }

    Question.exists({ _id: req.body.quesId }, (e, doc) => {
        if (e) {
            return res.json({ success: false, msg: 'Some error' });
        }
        if (!doc) {
            return res.json({ success: false, msg: 'No question exists with this id' });
        }

        const newAns = new Answer({
            user: req.user._id,
            text: req.body.text,
        });

        newAns.save((err) => {
            if (err) {
                return res.json({ success: false, msg: 'Database error, answer creation failed' });
            }
            Question.findByIdAndUpdate(req.body.quesId, { $push: { answers: newAns._id } }, (e, doc) => {
                if (e) {
                    return res.json({ success: false, msg: 'Some error occurred' });
                }
                return res.json({ success: true, msg: 'Answer successful' });
            });
        });

    });
}

module.exports.upvote = (req, res) => {

    Answer.findById(req.params.ansId)
        .exec((err, ans) => {
            if (err) {
                return res.json({ success: false, msg: 'Some error occurred' });
            }
            if (!ans) {
                return res.json({ success: false, msg: 'No answer exist with this id' });
            }

            const upvoteIndex = ans.upvotes.indexOf(req.user._id);
            if (upvoteIndex == -1) {
                ans.upvotes.push(req.user._id);
            } else {
                ans.upvotes.splice(upvoteIndex, 1);
            }
            const downvoteIndex = ans.downvotes.indexOf(req.user._id);
            if (downvoteIndex != -1) {
                ans.downvotes.splice(downvoteIndex, 1);
            }

            ans.save((error) => {
                if (error) {
                    return res.json({ success: false, msg: 'Some error occurred here' });
                }
                return res.json({ success: true, msg: 'Success' });
            });

        });


}

module.exports.downvote = (req, res) => {

    Answer.findById(req.params.ansId)
        .exec((err, ans) => {
            if (err) {
                return res.json({ success: false, msg: 'Some error occurred' });
            }
            if (!ans) {
                return res.json({ success: false, msg: 'No answer exist with this id' });
            }

            const downvoteIndex = ans.downvotes.indexOf(req.user._id);
            if (downvoteIndex == -1) {
                ans.downvotes.push(req.user._id);
            } else {
                ans.downvotes.splice(downvoteIndex, 1);
            }
            const upvoteIndex = ans.upvotes.indexOf(req.user._id);
            if (upvoteIndex != -1) {
                ans.upvotes.splice(upvoteIndex, 1);
            }

            ans.save((error) => {
                if (error) {
                    return res.json({ success: false, msg: 'Some error occurred here' });
                }
                return res.json({ success: true, msg: 'Success' });
            });

        });


}