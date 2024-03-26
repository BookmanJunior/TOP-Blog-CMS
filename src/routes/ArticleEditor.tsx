import { useNavigate, useParams } from 'react-router-dom';
import { ArticleType } from '../Types/ArticleType';
import FetchData from '../components/FetchData';
import { ArticleContentEditor } from '../components/ArticleContentEditor';
import { useRef } from 'react';
import { MDXEditorMethods } from '@mdxeditor/editor';

export default function ArticleEditor() {
  const { articleId } = useParams();
  const { data, setData, loading, error } = FetchData<ArticleType>(
    `http://localhost:3000/articles/${articleId}`
  );
  const mdxEditorRef = useRef<MDXEditorMethods>(null);
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
      <label htmlFor="cover">
        cover
        <input
          type="text"
          name="cover"
          id="cover"
          value={data?.cover}
          onChange={(e) => setData({ ...data, cover: e.target.value })}
        />
      </label>
      <label htmlFor="title">
        Title
        <input
          type="text"
          name="title"
          id="title"
          value={data?.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </label>
      <ArticleContentEditor content={data.content} ref={mdxEditorRef} />
      <button>Submit</button>
    </form>
  );

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const content = mdxEditorRef.current?.getMarkdown();

    try {
      const res = await fetch(`http://localhost:3000/cms/articles/${data._id}`, {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
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
