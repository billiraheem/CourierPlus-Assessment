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

// Placeholder Card component until core one is built
interface Blog {
    id: string;
    title: string;
    description: string;
}

const BlogCard = ({ blog, onEdit, onDelete }: { blog: Blog, onEdit: (blog: Blog) => void, onDelete: (id: string) => void }) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
            <CardTitle className="text-xl">{blog.title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-text-secondary line-clamp-2">{blog.description || "No description provided."}</p>
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
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);

    useEffect(() => {
        setTitle('Blogs');
    }, [setTitle]);

    // Dummy Data
    const blogs = [
        { id: '1', title: 'Tech Trends 2025', description: 'Latest updates in technology.' },
        { id: '2', title: 'Healthy Living', description: 'Tips for a better lifestyle.' },
        { id: '3', title: 'Travel Diaries', description: 'Exploring the world.' },
    ];

    const handleCreateBlog = (values: { title: string; description: string }) => {
        console.log("Creating Blog:", values);
        setIsCreateModalOpen(false);
        // Implementation with API later
    };

    const handleEditBlog = (values: { title: string; description: string }) => {
        console.log("Updating Blog:", editingBlog?.id, values);
        setEditingBlog(null);
    };

    const handleDeleteBlog = () => {
        if (deletingBlogId) {
            console.log("Deleting Blog:", deletingBlogId);
            setDeletingBlogId(null);
        }
    };

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
