import { useParams } from 'react-router-dom';
import CategoryForm from '../components/CategoryForm';
import FetchData from '../components/FetchData';
import { CategoryType } from '../Types/CategoryType';

export default function CategoryEditor() {
  const { categoryId } = useParams();
  const apiEndPoint = `http://localhost:3000/cms/categories/${categoryId}`;
  const { data, loading, error } = FetchData<CategoryType>(apiEndPoint);

  if (loading) return <div>Loading...</div>;

  if (error) throw error;

  return <CategoryForm data={data.title} apiEndpoint={apiEndPoint} fetchMethod="PUT" />;
}
