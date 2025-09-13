import { NewCommentBody, UpdateCommentBody } from "../01-utils/types";
import { CommentModel, ICommentModel } from "../06-schemas/commentSchema";

async function addComment(commentData: NewCommentBody): Promise<ICommentModel> {
    const comment = new CommentModel(commentData);
    const result = await comment.save();
    return result;
}

// get all matched comments and averageRating:
async function getCommentsByRecipeId(recipeId: string): Promise<{ comments: ICommentModel[], avgRating: number } | []> {
    const result = await CommentModel.aggregate([
        { $match: { recipeId: recipeId } },
        {
            $group: {
                _id: '$recipeId',
                comments: { $push: "$$ROOT" }, // get the processed document
                avgRating: { $avg: '$rating' }
            }
        },
        {
            $project: {
                _id: 0,
                comments: 1,
                avgRating: 1
            }
        }
    ]);
    return result as { comments: ICommentModel[], avgRating: number } | [];
}

async function getCommentById(commentId: string) {
    try {
        const result = await CommentModel.findById(commentId);
        return result;
    } catch (error) {
        throw error;
    }
}

async function updateComment(commentId: string, commentBody: UpdateCommentBody): Promise<ICommentModel> {
    const updatedData = {
        comment: commentBody.comment,
        rating: commentBody.rating,
        isEdited: true
    }
    const options = {
        new: true, // return the updated document
        runValidators: true // run the schema validations
    }
    const result = await CommentModel.findByIdAndUpdate(commentId, updatedData, options);
    return result;
}

export default {
    getCommentById, addComment, getCommentsByRecipeId, updateComment
}