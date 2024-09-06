export type Blog = {
  id: number;
  title: string;
  titleSearch: string;
  content: string;
  authorUsername: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};
