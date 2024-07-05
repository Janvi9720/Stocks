import mongoose from 'mongoose';

const surveySchema = mongoose.Schema({
    response: {
        type: Object,
        required: true
      },
      comment: {
        type: String,
        default: ''
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      created: {
        type: Date,
        default: Date.now
      }
});

let Survey = mongoose.model('Survey', surveySchema);

export default Survey;
