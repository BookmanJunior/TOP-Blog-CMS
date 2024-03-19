import { Link } from 'react-router-dom';
import { ArticleType } from '../Types/ArticleType';
import FetchData from '../components/FetchData';

export default function Articles() {
  const apiEndPoint = 'http://localhost:3000/articles';
  const { data, error, loading } = FetchData<ArticleType[]>(apiEndPoint);

  if (loading) return <span>Loading...</span>;

  if (error) {
    return <span>{error.message}</span>;
  }

  return (
    <table>
      <caption>Articles</caption>
      <thead>
        <tr>
          <th scope="col">title</th>
          <th scope="col">author</th>
          <th scope="col">ID</th>
          <th scope="col">Date</th>
          <th scope="col">Published</th>
          <th scope="col">Featured</th>
          <th scope="col">Comments</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((article) => (
          <tr key={article._id}>
            <th scope="row">{article.title}</th>
            <td>{article.author.username}</td>
            <td>{article._id}</td>
            <td>{article.date}</td>
            <td>{article.published + ''}</td>
            <td>{article.featured + ''}</td>
            <td>{article.comments.length}</td>
            <td>{<Link to={`${article._id}`}>Edit</Link>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
