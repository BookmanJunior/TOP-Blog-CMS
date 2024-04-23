import { useParams } from 'react-router-dom';
import { ArticleType } from '../Types/ArticleType';
import FetchData from '../components/FetchData';
import ArticleForm from '../components/ArticleForm';
import { URL } from '../helpers/getUrl';

export default function ArticleEditor() {
  const { articleId } = useParams();
  const { data, loading, error } = FetchData<ArticleType>(`${URL}/articles/${articleId}`);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    throw error;
  }

  return (
    <ArticleForm data={data} fetchMethod="PUT" apiEndPoint={`${URL}/cms/articles/${articleId}`} />
  );
}
