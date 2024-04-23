import { useParams } from 'react-router-dom';
import { UserType } from '../Types/UserType';
import FetchData from '../components/FetchData';
import UserForm from '../components/UserForm';
import { URL } from '../helpers/getUrl';

export default function User() {
  const { userId } = useParams();
  const apiEndPoint = `${URL}/cms/users/${userId}`;
  const { data, loading, error } = FetchData<UserType>(apiEndPoint);

  if (loading) return <div>Loading...</div>;

  if (error) throw error;

  return <UserForm user={data} apiEndPoint={apiEndPoint} fetchMethod="PUT" />;
}
