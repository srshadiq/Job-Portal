import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { useEffect } from "react";
import { useTheme } from "../../Context/ThemeContext";

const TextEditor = (props: any) => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    editor?.commands.setContent(props.data);
  }, [props.data]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: props.form.getValues().description,
    onUpdate: ({ editor }) => {
      props.form.setFieldValue("description", editor.getHTML());
    },
  });

  return (
    <div className={isDarkMode ? "theme-bg-secondary" : "bg-white"}>
      <RichTextEditor
        editor={editor}
        className={
          isDarkMode
            ? "theme-bg-secondary theme-text-primary"
            : "bg-white text-gray-900"
        }
      >
        <RichTextEditor.Toolbar
          bg={isDarkMode ? "dark.7" : "gray.1"}
          sticky
          stickyOffset={60}
          className={
            isDarkMode
              ? "theme-bg-tertiary border-gray-600"
              : "bg-gray-100 border-gray-300"
          }
        >
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content
          className={
            isDarkMode
              ? "theme-bg-secondary theme-text-primary"
              : "bg-white text-gray-900"
          }
        />
      </RichTextEditor>
    </div>
  );
};
export default TextEditor;
