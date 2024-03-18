import { UserType } from './UserType';

export type ArticleType = {
  cover: string;
  title: string;
  content: string;
  author: UserType;
  comments: [];
  _id: string;
  date: string;
  published: boolean;
  featured: boolean;
};
