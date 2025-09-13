import { CommentBody } from "../01-utils/types";
import { CommentModel } from "../06-schemas/commentSchema";

async function addComment(commentData: CommentBody) {
    const comment = new CommentModel(commentData);
    const result = await comment.save();
    return result;
}

export default {
    addComment
}