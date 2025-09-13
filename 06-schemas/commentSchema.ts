// {
//   _id: ObjectId,
//   recipeId: String (references SQL Recipe.id),
//   userId: String (references SQL User.id),
//   username: String (denormalized for performance),
//   comment: String,
//   rating: Number (1-5),
//   likes: [String], // Array of user IDs who liked
//   isEdited: Boolean,
//   createdAt: Date,
//   updatedAt: Date
// }

import { Document, model, Schema } from "mongoose";
import errorsHandling from "../01-utils/errorsHandling";

const castError = errorsHandling.handleCastError;

export interface ICommentModel extends Document {
    recipeId: string,
    userId: string,
    username: string,
    comment: string,
    rating?: number,
    likes: string[],
    isEdited: boolean,
    createdAt: Date,
    updatedAt: Date
}

export const CommentSchema = new Schema<ICommentModel>({
    recipeId: {
        type: String,
        cast: castError(),
        required: [true, 'Recipe ID is required'],
    },
    userId: {
        type: String,
        cast: castError(),
        required: [true, 'User ID is required'],
    },
    username: {
        type: String,
        cast: castError(),
        required: [true, 'Username is required'],
    },
    comment: {
        type: String,
        cast: castError(),
        required: [true, 'Comment text is required'],
        maxLength: [20, 'Comment cannot exceed 20 characters'],
        minLength: [5, 'Comment must be at least 5 characters long'],
    },
    rating: {
        type: Number,
        cast: castError(),
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5'],
        validate: {
            validator: (value: number) => Number.isInteger(value),
            message: 'Rating must be a whole number'
        }
    },
    likes: {
        type: [String],
        default: [],
        validate: { //maybe change to a toggle method
            // Check for duplicate user IDs in likes array
            validator: (likes: string[]) => likes.length === new Set(likes).size,
            message: 'Duplicate user IDs are not allowed in likes array'
        }
    },
    isEdited: {
        type: Boolean,
        default: false,
    },
}, {
    versionKey: false,
    timestamps: true
});


// indexing specific columns for popular searches in better performance:
CommentSchema.index({ recipeId: 1 });
CommentSchema.index({ userId: 1 });

export const CommentModel = model<ICommentModel>('Comment', CommentSchema, 'comments');