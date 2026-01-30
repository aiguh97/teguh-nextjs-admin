import React from "react";

export default function PopupModal({
  openModal,
  setOpenModal,
  msg,
  handleConfirm,
  isLoading = false,
}) {
  if (!openModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md mx-4 rounded-xl bg-white shadow-xl">
        <div className="p-6 text-center">
          {/* Icon */}
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
              />
            </svg>
          </div>

          {/* Text */}
          <h3 className="text-lg font-semibold text-gray-900">
            Confirm Deletion
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {msg}
          </p>

          {/* Actions */}
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? "Deleting..." : "Yes, delete"}
            </button>

            <button
              onClick={() => setOpenModal(false)}
              disabled={isLoading}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
