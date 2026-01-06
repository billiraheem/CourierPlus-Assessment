import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { PostCard } from '../posts/PostCard';
import { Modal } from '../../components/ui/modal';
import { DeleteConfirmationModal } from '../../components/ui/delete-modal';
import { PostForm } from '../posts/PostForm';
import { PostDetailsModal } from '../posts/PostDetailsModal';
import { useDashboard } from '../../context/DashboardContext';
import { useEffect } from 'react';

interface Post {
    id: string;
    title: string;
    content: string;
}

export const BlogDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { setTitle } = useDashboard();

    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
    const [viewingPost, setViewingPost] = useState<Post | null>(null);

    // Mock Data
    const blog = {
        id,
        title: 'Tech Trends 2025',
        description: 'Latest updates in technology and software development.',
    };

    const posts = [
        { id: '101', title: 'The Rise of AI Agents', content: 'AI Agents are transforming how we build software...' },
        { id: '102', title: 'React 19 Hooks', content: 'Understanding the new hooks in React 19...' },
        { id: '103', title: 'Tailwind CSS v4', content: 'What is new in the latest Tailwind release...' },
    ];

    useEffect(() => {
        // Set header title to blog title (mock)
        setTitle(blog.title);
        return () => setTitle('Dashboard'); // Reset on unmount
    }, [blog.title, setTitle]);

    const handleCreatePost = (values: { title: string; content: string }) => {
        console.log("Creating Post in Blog", id, ":", values);
        setIsCreatePostModalOpen(false);
    };

    const handleEditPost = (values: { title: string; content: string }) => {
        console.log("Updating Post:", editingPost?.id, values);
        setEditingPost(null);
    };

    const handleDeletePost = () => {
        if (deletingPostId) {
            console.log("Deleting Post:", deletingPostId);
            setDeletingPostId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/dashboard/blogs">
                    <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent hover:text-primary">
                        <ArrowLeft size={20} className="mr-1" /> Back to Blogs
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-6">
                <div>
                    {/* Title moved to header */}
                    <p className="text-text-secondary mt-1">{blog.description}</p>
                </div>
                <Button onClick={() => setIsCreatePostModalOpen(true)}>
                    <Plus size={18} className="mr-2" />
                    Create New Post
                </Button>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-text-primary">Posts ({posts.length})</h2>
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map(post => (
                            <div key={post.id} onClick={() => setViewingPost(post)} className="cursor-pointer">
                                <PostCard
                                    {...post}
                                    onEdit={() => { setEditingPost(post); }}
                                    onDelete={(id) => { setDeletingPostId(id); }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                        <p className="text-text-secondary">No posts found for this blog.</p>
                        <Button variant="link" className="mt-2 text-primary" onClick={() => setIsCreatePostModalOpen(true)}>
                            Create your first post
                        </Button>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isCreatePostModalOpen}
                onClose={() => setIsCreatePostModalOpen(false)}
                title="Create New Post"
                maxWidth="max-w-xl"
            >
                <PostForm
                    onSubmit={handleCreatePost}
                    onCancel={() => setIsCreatePostModalOpen(false)}
                />
            </Modal>
            <Modal
                isOpen={!!editingPost}
                onClose={() => setEditingPost(null)}
                title="Edit Post"
                maxWidth="max-w-xl"
            >
                {editingPost && (
                    <PostForm
                        initialValues={editingPost}
                        onSubmit={handleEditPost}
                        onCancel={() => setEditingPost(null)}
                    />
                )}
            </Modal>

            <DeleteConfirmationModal
                isOpen={!!deletingPostId}
                onClose={() => setDeletingPostId(null)}
                onConfirm={handleDeletePost}
                title="Delete Post"
                description="Are you sure you want to delete this post? This action cannot be undone."
            />

            <PostDetailsModal
                isOpen={!!viewingPost}
                onClose={() => setViewingPost(null)}
                post={viewingPost}
            />
        </div>
    );
};
