import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    Bold,
    Italic,
    Strikethrough,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
} from 'lucide-react';
import { Button } from './button';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) {
        return null;
    }

    const buttons = [
        {
            icon: Bold,
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive('bold'),
            title: 'Bold',
        },
        {
            icon: Italic,
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive('italic'),
            title: 'Italic',
        },
        {
            icon: Strikethrough,
            action: () => editor.chain().focus().toggleStrike().run(),
            isActive: editor.isActive('strike'),
            title: 'Strikethrough',
        },
        {
            icon: Heading2,
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive('heading', { level: 2 }),
            title: 'Heading 2',
        },
        {
            icon: Heading3,
            action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: editor.isActive('heading', { level: 3 }),
            title: 'Heading 3',
        },
        {
            icon: List,
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive('bulletList'),
            title: 'Bullet List',
        },
        {
            icon: ListOrdered,
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive('orderedList'),
            title: 'Ordered List',
        },
        {
            icon: Quote,
            action: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: editor.isActive('blockquote'),
            title: 'Blockquote',
        },
        {
            icon: Undo,
            action: () => editor.chain().focus().undo().run(),
            disabled: !editor.can().chain().focus().undo().run(),
            title: 'Undo',
        },
        {
            icon: Redo,
            action: () => editor.chain().focus().redo().run(),
            disabled: !editor.can().chain().focus().redo().run(),
            title: 'Redo',
        },
    ];

    return (
        <div className="flex flex-wrap gap-1 border-b border-gray-300 bg-gray-50 p-2">
            {buttons.map((btn, index) => (
                <Button
                    key={index}
                    onClick={(e) => {
                        e.preventDefault(); // Prevent form submission
                        btn.action();
                    }}
                    disabled={btn.disabled}
                    variant="ghost"
                    size="sm"
                    className={`h-8 w-8 p-0 ${btn.isActive ? 'bg-gray-200 text-black' : 'text-gray-600'}`}
                    title={btn.title}
                    type="button"
                >
                    <btn.icon className="h-4 w-4" />
                </Button>
            ))}
        </div>
    );
};

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[150px] px-3 py-2 text-text-primary',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="overflow-hidden rounded-md border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};
