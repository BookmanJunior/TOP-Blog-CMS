import { useNavigate } from 'react-router-dom';
import { ArticleContentEditor } from '../components/ArticleContentEditor';
import ErrorMessage from './ErrorMessage';
import { ChangeEvent, useRef, useState } from 'react';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { ArticleType } from '../Types/ArticleType';
import FormInput from './FormInput';

type ArticleForm = {
  data?: ArticleType;
  fetchMethod: 'POST' | 'PUT';
  apiEndPoint: string;
};

type ArticleErrors = {
  cover?: string;
  title?: string;
  content?: string;
  unexpected?: string;
};

export default function ArticleForm({ data, fetchMethod, apiEndPoint }: ArticleForm) {
  const [article, setArticle] = useState<ArticleType | undefined>(data || undefined);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ArticleErrors | null>(null);
  const mdxEditorRef = useRef<MDXEditorMethods>(null);
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="article-form form-util">
      <FormInput
        name="cover"
        placeholder="Cover"
        value={article?.cover}
        onChange={(e) => handlePropChange(e, 'cover')}>
        <ErrorMessage error={errors?.cover} />
      </FormInput>
      <FormInput
        name="title"
        placeholder="Title"
        value={article?.title}
        onChange={(e) => handlePropChange(e, 'title')}>
        <ErrorMessage error={errors?.title} />
      </FormInput>
      <ArticleContentEditor content={data?.content} ref={mdxEditorRef} />
      <ErrorMessage error={errors?.content} />
      <ErrorMessage error={errors?.unexpected} />
      <button className="article-form-btn" disabled={loading}>
        Submit
      </button>
    </form>
  );

  function handlePropChange(e: ChangeEvent<HTMLInputElement>, prop: 'title' | 'cover') {
    setArticle({ ...article, [prop]: e.target.value } as ArticleType);
  }

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const content = mdxEditorRef.current?.getMarkdown();

    try {
      const res = await fetch(apiEndPoint, {
        method: fetchMethod,
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...article,
          content: content
        })
      });

      if (res.status >= 400) {
        const resResult: ArticleErrors = await res.json();
        setErrors(resResult);
        return;
      }
      if (errors) {
        setErrors(null);
      }
      navigate(`/articles`);
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ ...errors, unexpected: error.message });
      }
    } finally {
      setLoading(false);
    }
  }
}
