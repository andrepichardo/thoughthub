export type PostType = {
  id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  user: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
  comments: {
    createdAt: string;
    id: string;
    postId: string;
    comment: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
};
