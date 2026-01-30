"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Heading2,
  Image as ImageIcon,
} from "lucide-react";
import { uploadFile } from "@/services/supabase/fileHandler";
import { useEffect } from "react";

const ToolbarButton = ({ onClick, active, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded transition ${
      active
        ? "bg-blue-100 text-blue-600"
        : "hover:bg-gray-200 text-gray-700"
    }`}
  >
    {children}
  </button>
);

const TiptapEditor = ({ value, onChange }) => {
  const editor = useEditor({
    immediatelyRender: false, // 🔥 FIX SSR
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: "Write something amazing...",
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files?.[0];
      if (!file || !editor) return;

      const uploaded = await uploadFile(file, "portfolio/content/");
      editor.chain().focus().setImage({ src: uploaded.url }).run();
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    }
  };

  if (!editor) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* TOOLBAR */}
      <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <Bold size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <Italic size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 size={16} />
        </ToolbarButton>

        {/* IMAGE UPLOAD */}
        <label className="p-2 rounded cursor-pointer hover:bg-gray-200 text-gray-700">
          <ImageIcon size={16} />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* EDITOR */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-[200px] prose max-w-none focus:outline-none"
      />
    </div>
  );
};

export default TiptapEditor;
