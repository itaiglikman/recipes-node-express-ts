import { CommentBody } from "../01-utils/types";
import { CommentModel, ICommentModel } from "../06-schemas/commentSchema";

async function addComment(commentData: CommentBody): Promise<ICommentModel> {
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

export default {
    addComment, getCommentsByRecipeId
}