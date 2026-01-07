import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
    type?: 'spin';
    color?: string;
    height?: number | string;
    width?: number | string;
    className?: string;
}

export const Loading = ({ type = 'spin', color, height = 24, width = 24, className }: LoadingProps) => {
    return (
        <div className={cn("flex items-center justify-center", className)} style={{ color }}>
            <Loader2
                className="animate-spin"
                style={{
                    height: height,
                    width: width,
                    color: color
                }}
            />
        </div>
    );
};
