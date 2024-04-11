import { useParams } from 'react-router-dom';
import { ArticleType } from '../Types/ArticleType';
import FetchData from '../components/FetchData';
import ArticleForm from '../components/ArticleForm';

export default function ArticleEditor() {
  const { articleId } = useParams();
  const { data, loading, error } = FetchData<ArticleType>(
    `http://localhost:3000/articles/${articleId}`
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ArticleForm
      data={data}
      fetchMethod="PUT"
      apiEndPoint={`http://localhost:3000/cms/articles/${articleId}`}
    />
  );
}
