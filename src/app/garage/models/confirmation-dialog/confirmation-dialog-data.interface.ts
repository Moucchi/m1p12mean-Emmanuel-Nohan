export interface ConfirmationDialogDataInterface {
  message: string;
  onConfirm: () => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

