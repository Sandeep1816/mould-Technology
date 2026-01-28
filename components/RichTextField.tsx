"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useFormikContext } from "formik"
import { useEffect } from "react"

export default function RichTextEditor({ name }: { name: string }) {
  const { values, setFieldValue } = useFormikContext<any>()

  const editor = useEditor({
    extensions: [StarterKit],
    content: values[name] || "",
    immediatelyRender: false, // ✅ FIX FOR SSR
    onUpdate({ editor }) {
      setFieldValue(name, editor.getHTML())
    },
  })

  // Sync Formik -> Editor safely
  useEffect(() => {
    if (!editor) return

    const currentHTML = editor.getHTML()
    const nextHTML = values[name] || ""

    if (currentHTML !== nextHTML) {
      editor.commands.setContent(nextHTML)
    }
  }, [values[name], editor])

  if (!editor) return null

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* TOOLBAR */}
      <div className="flex gap-2 border-b bg-gray-50 p-2 flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="editor-btn"
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="editor-btn"
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="editor-btn"
        >
          • Bullet
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="editor-btn"
        >
          1. Numbered
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className="editor-btn"
        >
          Paragraph
        </button>
      </div>

      {/* EDITOR */}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-3 min-h-[180px]"
      />
    </div>
  )
}
