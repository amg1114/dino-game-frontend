import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';

import clsx from 'clsx';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  BoldIcon,
  Heading1,
  Heading2,
  Heading3,
  ItalicIcon,
  LinkIcon,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  TextQuote,
  Undo,
} from 'lucide-react';

function ToolbarButton({
  onClick,
  isActive,
  children,
  disabled,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'hover:bg-green flex aspect-square cursor-pointer items-center justify-center rounded px-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40',
        {
          'bg-green font-bold': isActive,
        }
      )}
    >
      {children}
    </button>
  );
}

function ToolbarSeparator() {
  return <span className="bg-placeholder-2 w-px"></span>;
}

export function RichEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      Bold,
      Italic,
      Strike,
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: 'Escribe algo...',
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
    ],
  });

  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt('Escribe la URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const handleWrapperClick = () => {
    editor.commands.focus();
  };

  return (
    <div className="bg-placeholder w-full rounded p-4">
      <div className="mb-2 flex flex-wrap justify-center gap-2 border-b pb-2">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}>
          <Strikethrough />
        </ToolbarButton>
        <ToolbarButton onClick={setLink} isActive={editor.isActive('link')}>
          <LinkIcon />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
        >
          <List />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
        >
          <ListOrdered />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
        >
          <TextQuote />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton
          onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
        >
          <Heading1 />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
        >
          <Heading2 />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
        >
          <Heading3 />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
        >
          <AlignLeft />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
        >
          <AlignCenter />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
        >
          <AlignRight />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo />
        </ToolbarButton>
      </div>

      {/* Focusable wrapper */}
      <div onClick={handleWrapperClick}>
        <EditorContent editor={editor} className="rich-text min-h-96 border-0 outline-0" />
      </div>
    </div>
  );
}
