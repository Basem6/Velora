'use client';

export default function ConfirmDialog({
  open = false,
  title = 'Remove item',
  message = 'Are you sure you want to remove this item?',
  cancelLabel = 'Keep item',
  confirmLabel = 'Remove',
  onCancel,
  onConfirm,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/35 px-5">
      <div className="w-full max-w-md border border-stone-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">Bag Edit</p>
          <h3 className="font-serif text-3xl leading-none text-stone-950">{title}</h3>
          <p className="mt-4 text-sm leading-6 text-stone-500">{message}</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="min-h-11 border border-stone-300 bg-white px-6 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-950 transition hover:border-stone-950"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-11 border border-stone-950 bg-stone-950 px-6 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-stone-950"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
