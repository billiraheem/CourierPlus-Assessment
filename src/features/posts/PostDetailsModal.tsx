import { Button } from '../../components/ui/button';
import { Modal } from '../../components/ui/modal';

interface PostDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: { title: string; content: string } | null;
}

export const PostDetailsModal = ({ isOpen, onClose, post }: PostDetailsModalProps) => {
    if (!post) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={post.title} maxWidth="max-w-2xl">
            <div className="space-y-6">
                <div className="text-text-secondary whitespace-pre-wrap leading-relaxed">
                    {post.content}
                </div>
                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </div>
        </Modal>
    );
};
