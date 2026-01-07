import { Plus, Trash2, Edit2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';
import { Link } from 'react-router-dom';
import { Modal } from '../../components/ui/modal';
import { DeleteConfirmationModal } from '../../components/ui/delete-modal';
import { BlogForm } from './BlogForm';
import { useDashboard } from '../../context/DashboardContext';
import { useEffect } from 'react';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../../services/blogService';
import type { Blog } from '../../interface/blog.interface';
import { showToast } from '../../utils/toastUtils';
import { globalErrorHandler } from '../../utils/globalErrorHandler';
import { Loading } from '../../components/ui/loading';



const BlogCard = ({ blog, onEdit, onDelete }: { blog: Blog, onEdit: (blog: Blog) => void, onDelete: (id: number) => void }) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
            <CardTitle className="text-xl">{blog.title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-text-secondary line-clamp-2">{blog.content || "No content provided."}</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <Link to={`/dashboard/blogs/${blog.id}`}>
                <Button variant="outline" size="sm">View Posts</Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" onClick={() => onEdit(blog)}>
                <Edit2 size={16} className="mr-1" /> Edit
            </Button>
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(blog.id)}>
                <Trash2 size={16} />
            </Button>
        </CardFooter>
    </Card>
);

export const BlogList = () => {
    const { setTitle } = useDashboard();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [deletingBlogId, setDeletingBlogId] = useState<number | null>(null);

    const fetchBlogs = async () => {
        try {
            setIsLoading(true);
            const response = await getBlogs();
            if (!response.error) {
                setBlogs(response.data);
            }
        } catch (error: any) {
            const { message, title, severity } = globalErrorHandler(error.data, error);
            showToast({ title, message, severity });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setTitle('Blogs');
        fetchBlogs();
    }, [setTitle]);

    const handleCreateBlog = async (values: { title: string; content: string }) => {
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);

            const response = await createBlog(formData);

            if (!response.error) {
                showToast({
                    title: 'Success',
                    message: response.message || 'Blog created successfully',
                    severity: 'success',
                });
                setIsCreateModalOpen(false);
                fetchBlogs(); // Refresh to show new blog
            }
        } catch (error: any) {
            const { message, title, severity } = globalErrorHandler(error.data, error);
            showToast({ title, message, severity });
        }
    };

    const handleEditBlog = async (values: { title: string; content: string }) => {
        if (!editingBlog) return;
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);
            // formData.append('_method', 'PUT'); // Uncommon but sometimes needed for Laravel POST updates. 
            // If it fails, I'll add it. User curl didn't show it.

            const response = await updateBlog(editingBlog.id, formData);

            if (!response.error) {
                showToast({
                    title: 'Success',
                    message: response.message || 'Blog updated successfully',
                    severity: 'success',
                });
                setEditingBlog(null);
                fetchBlogs();
            }
        } catch (error: any) {
            const { message, title, severity } = globalErrorHandler(error.data, error);
            showToast({ title, message, severity });
        }
    };

    const handleDeleteBlog = async () => {
        if (!deletingBlogId) return;
        try {
            const response = await deleteBlog(deletingBlogId);
            if (!response.error) {
                showToast({
                    title: 'Success',
                    message: response.message || 'Blog deleted successfully',
                    severity: 'success',
                });
                setDeletingBlogId(null);
                fetchBlogs();
            }
        } catch (error: any) {
            const { message, title, severity } = globalErrorHandler(error.data, error);
            showToast({ title, message, severity });
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    {/* Title moved to header */}
                    <p className="text-text-secondary">Manage your blog collections.</p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus size={18} className="mr-2" />
                    Create New Blog
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map(blog => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        onEdit={setEditingBlog}
                        onDelete={setDeletingBlogId}
                    />
                ))}
            </div>

            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create New Blog"
            >
                <BlogForm
                    onSubmit={handleCreateBlog}
                    onCancel={() => setIsCreateModalOpen(false)}
                    isLoading={isLoading}
                />
            </Modal>

            <Modal
                isOpen={!!editingBlog}
                onClose={() => setEditingBlog(null)}
                title="Edit Blog"
            >
                {editingBlog && (
                    <BlogForm
                        initialValues={editingBlog}
                        onSubmit={handleEditBlog}
                        onCancel={() => setEditingBlog(null)}
                        isLoading={isLoading}
                    />
                )}
            </Modal>

            <DeleteConfirmationModal
                isOpen={!!deletingBlogId}
                onClose={() => setDeletingBlogId(null)}
                onConfirm={handleDeleteBlog}
                title="Delete Blog"
                description="Are you sure you want to delete this blog? All associated posts will also be deleted."
            />
        </div>
    );
};
