interface CustomToastProps {
    title: string;
    message: string;
    closeToast?: () => void;
    type?: string;
}

const CustomToast = ({ title, message, closeToast, type }: CustomToastProps) => (
    <div className="flex flex-col w-full pr-2">
        <h4 className="text-sm font-semibold text-gray-900 mb-0.5">
            {title}
        </h4>

        <p className="text-xs text-gray-600 leading-relaxed font-medium">
            {message}
        </p>
    </div>
);

export default CustomToast;
