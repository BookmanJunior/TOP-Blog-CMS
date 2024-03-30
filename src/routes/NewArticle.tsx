import { useNavigate } from 'react-router-dom';
import { ArticleContentEditor } from '../components/ArticleContentEditor';
import { useRef } from 'react';
import { MDXEditorMethods } from '@mdxeditor/editor';
import '../styles/ArticleEditor.scss';

export default function NewArticle() {
  const mdxEditorRef = useRef<MDXEditorMethods>(null);
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="article-form form-util">
      <input type="text" name="cover" id="cover" placeholder="Cover" />
      <input type="text" name="title" id="title" placeholder="Title" />
      <ArticleContentEditor ref={mdxEditorRef} />
      <button>Submit</button>
    </form>
  );

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData);
    const content = mdxEditorRef.current?.getMarkdown();

    try {
      const res = await fetch(`http://localhost:3000/articles`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cover: updatedData.cover,
          title: updatedData.title,
          content: content
        })
      });

      if (res.ok) {
        navigate(`/articles`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
