import FetchData from '../components/FetchData';
import { URL } from '../helpers/getUrl';

type DocumentTypeCount = {
  userCount: number;
  articleCount: number;
  commentCount: number;
};

export default function Home() {
  const { data, loading, error } = FetchData<DocumentTypeCount>(`${URL}/cms/count`);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Something wen't wrong!</p>;

  return (
    <div>
      <p>{`Users: ${data?.userCount}`}</p>
      <p>{`Articles: ${data?.articleCount}`}</p>
      <p>{`Comments: ${data?.commentCount}`}</p>
    </div>
  );
}
