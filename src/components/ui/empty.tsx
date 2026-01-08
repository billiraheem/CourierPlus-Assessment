import type { ReactNode } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../utils/cn';

interface EmptyProps {
    isEmpty?: boolean;
    title?: string;
    description?: string;
    icon?: ReactNode;
    action?: ReactNode;
    className?: string;
    children: ReactNode;
}

export const Empty = ({
    isEmpty = false,
    title = 'No data available',
    description = '',
    icon,
    action,
    className,
    children,
}: EmptyProps) => {
    if (!isEmpty) {
        return <>{children}</>;
    }

    return (
        <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300', className)}>
            <div className="bg-white p-4 rounded-full mb-3 shadow-sm">
                {icon || <Search className="h-6 w-6 text-gray-400" />}
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-1">{title}</h3>
            {description && <p className="text-text-secondary text-sm max-w-sm mb-6">{description}</p>}
            {action}
        </div>
    );
};
