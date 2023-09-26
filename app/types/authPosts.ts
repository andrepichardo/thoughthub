export type AuthPosts = {
  email: string;
  id: string;
  image: string;
  name: string;
  Post: {
    createdAt: string;
    id: string;
    message: string;
    comments?: {
      createdAt: string;
      id: string;
      postId: string;
      userId: string;
    }[];
  }[];
};
