import ArticleForm from '../components/ArticleForm';
import '../styles/ArticleEditor.scss';

export default function NewArticle() {
  return <ArticleForm fetchMethod="POST" apiEndPoint="http://localhost:3000/articles" />;
}
