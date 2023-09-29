export type AuthPosts = {
  email: string;
  id: string;
  image: string;
  name: string;
  posts: {
    createdAt: string;
    updatedAt: string;
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
