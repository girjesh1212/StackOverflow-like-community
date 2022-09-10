const validateQuestionInput = require('../../validation/question');
const Question = require('../../models/Question');

module.exports.test = (req, res) => {
    return res.status(200).json({ msg: 'Question route works' });
}

module.exports.create = (req, res) => {
    //Check validation
    const { errors, isValid } = validateQuestionInput(req.body);
    if (!isValid) { return res.status(400).json({ success: false, msg: errors }); }

    const newQues = new Question({
        user: req.user._id,
        title: req.body.title,
        text: req.body.text,
    });

    newQues.save((err) => {
        if (err) {
            return res.json({ success: false, msg: 'Database error, question creation failed' });
        }
        return res.json({ success: true, question: newQues });
    });

}

module.exports.upvote = (req, res) => {

    Question.findById(req.params.quesId)
        .exec((err, ques) => {
            if (err) {
                return res.json({ success: false, msg: 'Some error occurred' });
            }
            if (!ques) {
                return res.json({ success: false, msg: 'No ques exist with this id' });
            }

            const upvoteIndex = ques.upvotes.indexOf(req.user._id);
            if (upvoteIndex == -1) {
                ques.upvotes.push(req.user._id);
            } else {
                ques.upvotes.splice(upvoteIndex, 1);
            }
            const downvoteIndex = ques.downvotes.indexOf(req.user._id);
            if (downvoteIndex != -1) {
                ques.downvotes.splice(downvoteIndex, 1);
            }

            ques.save((error) => {
                if (error) {
                    return res.json({ success: false, msg: 'Some error occurred here' });
                }
                return res.json({ success: true, msg: 'Success' });
            });

        });


}

module.exports.downvote = (req, res) => {

    Question.findById(req.params.quesId)
        .exec((err, ques) => {
            if (err) {
                return res.json({ success: false, msg: 'Some error occurred' });
            }
            if (!ques) {
                return res.json({ success: false, msg: 'No ques exist with this id' });
            }

            const downvoteIndex = ques.downvotes.indexOf(req.user._id);
            if (downvoteIndex == -1) {
                ques.downvotes.push(req.user._id);
            } else {
                ques.downvotes.splice(downvoteIndex, 1);
            }
            const upvoteIndex = ques.upvotes.indexOf(req.user._id);
            if (upvoteIndex != -1) {
                ques.upvotes.splice(upvoteIndex, 1);
            }

            ques.save((error) => {
                if (error) {
                    return res.json({ success: false, msg: 'Some error occurred here' });
                }
                return res.json({ success: true, msg: 'Success' });
            });

        });


}