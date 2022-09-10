// src/Tiptap.jsx
import {Editor, EditorContent, useEditor} from '@tiptap/react'
import './Tiptap.scss';
import StarterKit from '@tiptap/starter-kit'
import {IconCheck} from "@tabler/icons";

const MenuBar = ({editor, props}: {editor: Editor, props: TipTapProps}) => {
    if (!editor) {
        return null
    }

    return (
        <div className={'flex justify-evenly  border-black border-b-2'}>

            <div className={'w-10-12 flex space-x-2  justify-around'}>
                <button onClick={() => editor.chain().focus().setHardBreak().run()}>

                    undo
                </button>
                <button onClick={() => editor.chain().focus().redo().run()}>
                    redo
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={editor.isActive('code') ? 'is-active' : ''}
                >


                    *.
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('list') ? 'is-active' : ''}
                >
                    1.
                </button>
                <button
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    ---
                </button>
            </div>

            <div className={'w-2/12 text-right'}>
                <button onClick={() => props.onSave(editor.getHTML())} className={'b2'}>
                    <IconCheck/>
                </button>
            </div>
        </div>
    )
}

interface TipTapProps {
    initialContent: string;
    onChange?: (content: string) => void;
    onSave: (content: string) => void;
    onCancel?: () => void;
    title?: string;
    size: 'small' | 'medium' | 'large';
}

const Tiptap = (props: TipTapProps) => {

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: props.initialContent,
    })

    return (
        <div className={'border-2 border-black w-full px-4 rounded-lg text-xs space-y-4 pb-4'}>
            <MenuBar editor={editor!} props={props}/>
            <EditorContent

                editor={editor}>
            </EditorContent>
            <div>{props.title}</div>
        </div>
    )
}

export default Tiptap
