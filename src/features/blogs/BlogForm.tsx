import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

interface BlogFormProps {
    initialValues?: {
        title: string;
        content: string;
    };
    onSubmit: (values: { title: string; content: string }) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const BlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string(),
});

export const BlogForm = ({ initialValues, onSubmit, onCancel, isLoading }: BlogFormProps) => {
    const formik = useFormik({
        initialValues: initialValues || { title: '', content: '' },
        validationSchema: BlogSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <Input
                id="title"
                name="title"
                label="Blog Title*"
                placeholder="e.g., Tech Trends"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && formik.errors.title ? formik.errors.title : undefined}
            />

            <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium text-text-secondary">
                    Content
                </label>
                <textarea
                    id="content"
                    name="content"
                    rows={4}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Describe your blog collection..."
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" isLoading={isLoading}>
                    {initialValues ? 'Update Blog' : 'Create Blog'}
                </Button>
            </div>
        </form>
    );
};
