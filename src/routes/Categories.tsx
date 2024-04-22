import FetchData from '../components/FetchData';
import { Link } from 'react-router-dom';
import { CategoryType } from '../Types/CategoryType';
import DeleteButton from '../components/DeleteButton';

export default function Categories() {
  const { data, setData, loading, error } = FetchData<CategoryType[]>(
    'http://localhost:3000/cms/categories'
  );

  if (loading) return <div>Loading...</div>;

  if (error) throw error;

  return (
    <>
      <Link to="create">Create category</Link>
      <table>
        <caption>Categories</caption>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((category) => (
            <tr key={category._id}>
              <th>{category.title}</th>
              <td>
                <Link to={category._id}>Edit</Link>
              </td>
              <td>
                <DeleteButton
                  title={category.title}
                  apiEndPoint={`http://localhost:3000/cms/categories/${category._id}`}
                  setData={setData}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
