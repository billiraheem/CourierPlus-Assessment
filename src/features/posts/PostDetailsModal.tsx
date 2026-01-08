import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Modal } from '../../components/ui/modal';
import type { Post } from '../../interface/post.interface';
import { getPostById } from '../../services/postService';

interface PostDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: Post | null;
}

export const PostDetailsModal = ({ isOpen, onClose, post }: PostDetailsModalProps) => {
    const [fullPost, setFullPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            if (post && post.blog_id && isOpen) {
                setIsLoading(true);
                try {
                    const response = await getPostById(post.blog_id, post.id);
                    if (!response.error) {
                        setFullPost(response.data);
                    }
                } catch (error) {
                    console.error("Failed to fetch post details", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setFullPost(null);
            }
        };
        fetchDetails();
    }, [post, isOpen]);

    const displayPost = fullPost || post;

    if (!displayPost) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={displayPost.title} maxWidth="max-w-3xl">
            <div className="space-y-6">
                {isLoading && <div className="text-xs text-primary mb-2">Refreshing details...</div>}

                <div
                    className="text-text-secondary whitespace-pre-wrap leading-relaxed prose prose-sm sm:prose-base max-w-none"
                    dangerouslySetInnerHTML={{ __html: displayPost.content }}
                />

                {/* Likes & Comments Section */}
                <div className="border-t border-gray-100 pt-4 space-y-4">
                    <div className="flex gap-4 text-sm text-text-secondary">
                        <span className="font-semibold">Likes: {fullPost?.likes?.length || 0}</span>
                        <span className="font-semibold">Comments: {fullPost?.comments?.length || 0}</span>
                    </div>

                    {fullPost?.comments && fullPost.comments.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded-md space-y-3">
                            <h4 className="font-semibold text-sm">Comments</h4>
                            {fullPost.comments.map(comment => (
                                <div key={comment.id} className="text-sm border-b border-gray-200 last:border-0 pb-2">
                                    <p className="text-gray-700">{comment.comment}</p>
                                    <span className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </div>
        </Modal>
    );
};
