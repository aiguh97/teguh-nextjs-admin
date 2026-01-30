import React from "react";

const ImageUploadPreview = ({
  value,          // preview url (string)
  onChange,       // (file) => void
  onRemove,       // () => void
  size = 36,      // tailwind size (36 = w-36 h-36)
  accept = "image/*",
}) => {
  return value ? (
    /* PREVIEW */
    <div
      className={`relative w-${size} h-${size} rounded-lg border overflow-hidden group`}
    >
      <img
        src={value}
        alt="preview"
        className="w-full h-full object-cover"
      />

      {/* HOVER ACTION */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
        <label className="cursor-pointer text-white text-sm bg-white/20 px-3 py-1 rounded">
          Change
          <input
            type="file"
            accept={accept}
            hidden
            onChange={(e) => onChange(e.target.files?.[0])}
          />
        </label>

        <button
          type="button"
          onClick={onRemove}
          className="text-white text-sm bg-red-500 px-3 py-1 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  ) : (
    /* UPLOAD CARD */
    <label
      className={`w-${size} h-${size} border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition`}
    >
      <span className="text-2xl">+</span>
      <span className="text-sm text-gray-500">Upload</span>
      <input
        type="file"
        accept={accept}
        hidden
        onChange={(e) => onChange(e.target.files?.[0])}
      />
    </label>
  );
};

export default ImageUploadPreview;
