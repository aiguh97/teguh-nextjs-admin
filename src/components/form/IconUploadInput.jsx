import { useEffect, useState } from "react";

export default function IconUploadInput({ value, onChange }) {
  const [preview, setPreview] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof value === "string") {
      // SVG string or URL
      setPreview(value);
    }
  }, [value]);

  const handleFile = (file) => {
    if (!file) return;

    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result);
        setPreview(reader.result);
      };
      reader.readAsText(file);
    } else if (file.type.startsWith("image/")) {
      onChange(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        {/* Preview box */}
        <div className="h-14 w-14 rounded-lg border flex items-center justify-center bg-gray-50">
          {preview ? (
            typeof value === "string" && value.startsWith("<svg") ? (
              <div dangerouslySetInnerHTML={{ __html: preview }} />
            ) : (
              <img src={preview} className="h-full w-full object-contain" />
            )
          ) : (
            <span className="text-xs text-gray-400">No icon</span>
          )}
        </div>

        {/* Upload */}
        <label className="cursor-pointer rounded-lg border px-3 py-2 text-sm hover:bg-gray-100">
          Upload Icon
          <input
            type="file"
            accept="image/*,.svg"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </label>

        {/* Eye */}
        {preview && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-gray-500 hover:text-gray-800"
          >
            👁
          </button>
        )}
      </div>

      {/* Modal Preview */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-4 rounded-xl shadow-xl">
            <img src={preview} className="max-h-[70vh] max-w-[70vw]" />
            <button
              onClick={() => setOpen(false)}
              className="mt-3 w-full rounded-lg border py-2 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
