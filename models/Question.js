const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    answers: { type: [mongoose.Schema.Types.ObjectId], ref: 'answers' },
    comments: { type: [mongoose.Schema.Types.ObjectId], ref: 'comments' },
    upvotes: { type: [mongoose.Schema.Types.ObjectId], ref: 'users' },
    downvotes: { type: [mongoose.Schema.Types.ObjectId], ref: 'users' },

    createdAt: { type: Date, default: Date.now }
});

const Question = mongoose.model('questions', QuestionSchema);
module.exports = Question;
