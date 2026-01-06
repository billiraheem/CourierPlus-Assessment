import { Button } from './button';
import { Modal } from './modal';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    isLoading?: boolean;
}

export const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Deletion",
    description = "Are you sure you want to delete this item? This action cannot be undone.",
    isLoading
}: DeleteConfirmationModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-sm">
            <div className="space-y-4">
                <p className="text-text-secondary text-sm">{description}</p>
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                        onClick={onConfirm}
                        isLoading={isLoading}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
