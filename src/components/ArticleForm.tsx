import { useNavigate } from 'react-router-dom';
import { ArticleContentEditor } from '../components/ArticleContentEditor';
import ErrorMessage from './ErrorMessage';
import { ChangeEvent, useRef, useState } from 'react';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { ArticleType } from '../Types/ArticleType';
import FormInput from './FormInput';
import '../styles/ArticleForm.scss';
import FetchData from './FetchData';

type ArticleForm = {
  data?: ArticleType;
  fetchMethod: 'POST' | 'PUT';
  apiEndPoint: string;
};

type ArticleErrors = {
  cover?: string;
  title?: string;
  category?: string;
  content?: string;
  unexpected?: string;
};

type onChangeProps = "title" | "cover" | "category"

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
      <Categories articleData={article} handleChange={handlePropChange} />
      <ErrorMessage error={errors?.category} />
      <ArticleContentEditor content={data?.content} ref={mdxEditorRef} />
      <ErrorMessage error={errors?.content} />
      <ErrorMessage error={errors?.unexpected} />
      <button className="article-form-btn" disabled={loading}>
        Submit
      </button>
    </form>
  );

  function handlePropChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    prop: onChangeProps
  ) {
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

type Categories = {
  title: string;
  _id: string;
};

type CategoriesProps = {
  articleData: ArticleType | undefined;
  handleChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    prop: onChangeProps
  ) => void;
};

function Categories({ articleData, handleChange }: CategoriesProps) {
  const { data, loading, error } = FetchData<Categories[]>('http://localhost:3000/cms/categories');

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  return (
    <select
      name="category"
      onChange={(e) => handleChange(e, 'category')}
      defaultValue={articleData?.category ?? ''}>
      {!articleData?.category && (
        <option value="" disabled selected>
          Choose a category
        </option>
      )}
      {data.map((category) => (
        <option key={category.title} value={category._id}>
          {category.title}
        </option>
      ))}
    </select>
  );
}
