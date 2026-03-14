import React from 'react';
import { Trash2, Pencil } from 'lucide-react';

/**
 * Reusable Edit/Delete button group.
 * Only renders when the current user is the post author.
 * Props:
 *   - user: current logged-in user from AuthContext
 *   - postUser: the user object stored on the post
 *   - onEdit: callback to open edit modal
 *   - onDelete: callback for delete action
 */
const PostActions = ({ user, postUser, onEdit, onDelete }) => {
    if (!user || !postUser || user.id !== postUser.id) return null;

    return (
        <div className="absolute top-3 left-3 z-10 flex gap-2">
            <button
                onClick={onEdit}
                className="bg-white/90 hover:bg-blue-50 text-blue-600 p-2 rounded-full shadow border border-blue-100 transition-colors"
                title="Edit Post"
            >
                <Pencil className="w-4 h-4" />
            </button>
            <button
                onClick={onDelete}
                className="bg-white/90 hover:bg-red-50 text-red-600 p-2 rounded-full shadow border border-red-100 transition-colors"
                title="Delete Post"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
};

export default PostActions;
