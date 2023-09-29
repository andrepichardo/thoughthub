export type PostType = {
  message: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    image: string;
  };
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
};
