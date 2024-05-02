import { Link } from 'react-router-dom';
import { ArticleType } from '../Types/ArticleType';
import FetchData from '../components/FetchData';
import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import DeleteButton from '../components/DeleteButton';
import { URL } from '../helpers/getUrl';

export default function Articles() {
  const apiEndPoint = `${URL}/articles`;
  const { data, setData, error, loading } = FetchData<ArticleType[]>(apiEndPoint);
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);

  if (loading) return <span>Loading...</span>;

  if (error) {
    throw error;
  }

  return (
    <>
      <Link to={'create'}>Create article</Link>
      <table>
        <caption>Articles</caption>
        <thead>
          <tr>
            <th scope="col">title</th>
            <th scope="col">author</th>
            <th scope="col">ID</th>
            <th scope="col">Date</th>
            <th scope="col">Comments</th>
            <th scope="col">Published</th>
            <th scope="col">Featured</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((article) => (
            <tr key={article._id}>
              <th scope="row">{article.title}</th>
              <td>{article.author.username}</td>
              <td>{article._id}</td>
              <td>{format(article.date, 'PPP')}</td>
              <td>{article.comments.length}</td>
              <td>
                <PublishedCheckBox article={article} setData={setData} />
              </td>
              <td>
                <CheckBox
                  article={article}
                  setData={setData}
                  name="featured"
                  checkBoxStatus={checkBoxStatus}
                  setCheckBoxStatus={setCheckBoxStatus}
                />
              </td>
              <td>{<Link to={`${article._id}`}>Edit</Link>}</td>
              <td>
                <DeleteButton<ArticleType[]>
                  title={article.title}
                  setData={setData}
                  apiEndPoint={`${URL}/cms/articles/${article._id}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

type PublishedCheckBoxProps = {
  article: ArticleType;
  setData: (prev: any) => void;
};

function PublishedCheckBox({ article, setData }: PublishedCheckBoxProps) {
  const [publishedStatus, setPublishedStatus] = useState(false);

  return (
    <CheckBox
      article={article}
      setData={setData}
      name="published"
      checkBoxStatus={publishedStatus}
      setCheckBoxStatus={setPublishedStatus}
    />
  );
}

type CheckBoxProps = {
  name: 'published' | 'featured';
  checkBoxStatus: boolean;
  setCheckBoxStatus: (arg0: boolean) => void;
} & PublishedCheckBoxProps;

function CheckBox({ article, setData, name, checkBoxStatus, setCheckBoxStatus }: CheckBoxProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (flag) {
      formRef.current?.requestSubmit();
    }

    return () => {
      setFlag(false);
    };
  }, [flag]);

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <input
        type="checkbox"
        name={name}
        checked={article[name]}
        onChange={handleChange}
        disabled={checkBoxStatus}
      />
    </form>
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData((prev: ArticleType[]): ArticleType[] =>
      prev.map((currentArticle) => {
        if (currentArticle._id === article._id) {
          const articleUpdate = { ...currentArticle, [name]: e.target.checked };
          return articleUpdate;
        }
        return currentArticle;
      })
    );
    setFlag(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCheckBoxStatus && setCheckBoxStatus(true);
    try {
      const res = await fetch(`${URL}/cms/articles/${article._id}/checkbox`, {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      });

      if (res.status >= 400) {
        console.log('Error');
        return;
      }

      const resResult: ArticleType[] = await res.json();
      setData(resResult);
    } catch (error) {
      console.log(error);
    } finally {
      setCheckBoxStatus && setCheckBoxStatus(false);
    }
  }
}
