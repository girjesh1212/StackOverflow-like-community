const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    text: { type: String, required: true },
    upvotes: { type: [mongoose.Schema.Types.ObjectId], ref: 'users' },
    downvotes: { type: [mongoose.Schema.Types.ObjectId], ref: 'users' },
    createdAt: { type: Date, default: Date.now }
});

const Answer = mongoose.model('answers', AnswerSchema);
module.exports = Answer;
