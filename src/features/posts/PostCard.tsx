import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

type PostCardProps = {
    id: string | number;
    title: string;
    content: string;
    onEdit?: (post?: any) => void;
    onDelete?: (id: string | number) => void;
};

export const PostCard = ({ id, title, content, onEdit, onDelete }: PostCardProps) => {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-text-primary">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    className="text-text-secondary text-sm line-clamp-3 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" onClick={(e) => { e.stopPropagation(); onEdit?.(); }}>
                    <Edit2 size={16} className="mr-1" /> Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={(e) => { e.stopPropagation(); onDelete?.(id); }}>
                    <Trash2 size={16} /> Delete
                </Button>
            </CardFooter>
        </Card>
    );
};
