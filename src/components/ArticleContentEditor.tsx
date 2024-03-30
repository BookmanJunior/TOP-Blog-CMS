import {
  MDXEditor,
  ListsToggle,
  toolbarPlugin,
  BlockTypeSelect,
  CreateLink,
  InsertCodeBlock,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  UndoRedo,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  headingsPlugin,
  markdownShortcutPlugin,
  BoldItalicUnderlineToggles,
  quotePlugin,
  InsertImage,
  imagePlugin
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { forwardRef } from 'react';
import { MDXEditorMethods } from '@mdxeditor/editor';

type ArticleEditorProps = {
  content?: string;
};

export const ArticleContentEditor = forwardRef<MDXEditorMethods, ArticleEditorProps>(
  function ArticleContentEditor(props, ref) {
    return (
      <MDXEditor
        ref={ref}
        markdown={props.content ? props.content : ''}
        placeholder="Article content here..."
        plugins={[
          listsPlugin(),
          headingsPlugin(),
          linkDialogPlugin(),
          linkPlugin(),
          sandpackPlugin(),
          markdownShortcutPlugin(),
          quotePlugin(),
          imagePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
          codeMirrorPlugin({
            codeBlockLanguages: { js: 'JavaScript', css: 'CSS' }
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <ListsToggle />
                <CreateLink />
                <InsertCodeBlock />
                <InsertImage />
              </>
            )
          })
        ]}
      />
    );
  }
);
