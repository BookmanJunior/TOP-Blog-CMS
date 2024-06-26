import { Link } from 'react-router-dom';
import FetchData from '../components/FetchData';
import { UserType } from '../Types/UserType';
import { format } from 'date-fns';
import DeleteButton from '../components/DeleteButton';
import { URL } from '../helpers/getUrl';

export default function Users() {
  const apiEndPoint = `${URL}/cms/users`;
  const { data, setData, loading, error } = FetchData<UserType[]>(apiEndPoint);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error) {
    throw error;
  }

  return (
    <>
      <Link to={'create'}>Create User</Link>
      <table>
        <caption>List of Users</caption>
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">ID</th>
            <th scope="col">Created At</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user._id}>
              <th scope="row">{user.username}</th>
              <td>{user.role}</td>
              <td>{user._id}</td>
              <td>{format(user.createdAt, 'PPP')}</td>
              <td>{<Link to={`${user._id}`}>Edit</Link>}</td>
              <td>
                <DeleteButton<UserType[]>
                  title={user.username}
                  setData={setData}
                  apiEndPoint={`${URL}/cms/users/${user._id}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
