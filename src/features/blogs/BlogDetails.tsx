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
import { getBlogById } from '../../services/blogService';
import { getPosts, createPost, updatePost, deletePost } from '../../services/postService';
import type { Blog } from '../../interface/blog.interface';
import type { Post } from '../../interface/post.interface';
import { showToast } from '../../utils/toastUtils';
import { globalErrorHandler } from '../../utils/globalErrorHandler';
import { Loading } from '../../components/ui/loading';

export const BlogDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { setTitle } = useDashboard();
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
    const [viewingPost, setViewingPost] = useState<Post | null>(null);

    const [blog, setBlog] = useState<Blog | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPostsLoading, setIsPostsLoading] = useState(false);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            if (!id) return;
            try {
                setIsLoading(true);
                // Fetch Blog Details
                const blogResponse = await getBlogById(id);
                if (!blogResponse.error && blogResponse.data && blogResponse.data.length > 0) {
                    setBlog(blogResponse.data[0]);
                }

                // Fetch Posts for this Blog
                setIsPostsLoading(true);
                const postsResponse = await getPosts(id);
                if (!postsResponse.error) {
                    setPosts(postsResponse.data);
                }

            } catch (error: any) {
                const { message, title, severity } = globalErrorHandler(error.data, error);
                showToast({ title, message, severity });
            } finally {
                setIsLoading(false);
                setIsPostsLoading(false);
            }
        };

        fetchBlogDetails();
    }, [id]);

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
        }
        return () => setTitle('Dashboard');
    }, [blog, setTitle]);

    const fetchPosts = async () => {
        if (!id) return;
        try {
            setIsPostsLoading(true);
            const postsResponse = await getPosts(id);
            if (!postsResponse.error) {
                setPosts(postsResponse.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsPostsLoading(false);
        }
    };

    const handleCreatePost = async (values: { title: string; content: string }) => {
        if (!id) return;
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);

            const response = await createPost(id, formData);

            if (!response.error) {
                showToast({
                    title: 'Success',
                    message: response.message || 'Post created successfully',
                    severity: 'success',
                });
                setIsCreatePostModalOpen(false);
                fetchPosts(); // Refresh posts list
            }
        } catch (error: any) {
            const { message, title, severity } = globalErrorHandler(error.data, error);
            showToast({ title, message, severity });
        }
    };

    const handleEditPost = async (values: { title: string; content: string }) => {
        if (!editingPost || !id) return;
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);

            const response = await updatePost(id, editingPost.id, formData);

            if (!response.error) {
                showToast({
                    title: 'Success',
                    message: response.message || 'Post updated successfully',
                    severity: 'success',
                });
                setEditingPost(null);
                fetchPosts();
            }
        } catch (error: any) {
            const { message, title, severity } = globalErrorHandler(error.data, error);
            showToast({ title, message, severity });
        }
    };

    const handleDeletePost = async () => {
        if (!deletingPostId || !id) return;
        try {
            const response = await deletePost(id, deletingPostId);
            if (!response.error) {
                showToast({
                    title: 'Success',
                    message: response.message || 'Post deleted successfully',
                    severity: 'success',
                });
                setDeletingPostId(null);
                fetchPosts();
            }
        } catch (error: any) {
            const { message, title, severity } = globalErrorHandler(error.data, error);
            showToast({ title, message, severity });
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!blog) {
        return <div className="text-center py-10">Blog not found.</div>;
    }

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
                    <p className="text-text-secondary mt-1">{blog.content}</p>
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
                                    onDelete={(id) => { setDeletingPostId(String(id)); }}
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
                    isLoading={isPostsLoading}
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
                        isLoading={isPostsLoading}
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
