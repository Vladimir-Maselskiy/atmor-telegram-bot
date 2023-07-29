import { Schema, model, models } from 'mongoose';
// import { handleSaveErrors } from '../utils/mongo/handleSaveErrors';

const userSchema = new Schema(
  {
    userID: {
      type: Number,
      required: [true, 'userID is required'],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, 'First is required'],
    },
    lastName: {
      type: String || undefined,
    },

    userName: {
      type: String || undefined,
    },
  },
  { versionKey: false, timestamps: true }
);

// userSchema.post('save', handleSaveErrors);

export const User = models.users || model('users', userSchema);
