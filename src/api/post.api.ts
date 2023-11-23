import http from '../utils/http';

const postApi = {
  createPost: (body: any) => {
    return http.post('/posts', body);
  },
  allPosts: ({ search, pageIndex, pageSize }: any) => {
    return http.get('/posts', {
      params: {
        search,
        pageIndex,
        pageSize,
      },
    });
  },
  getPost: (postId: string) => {
    return http.get(`/posts/${postId}`);
  },
  updatePost: (postId: string, body: any) => {
    return http.put(`/posts/${postId}`, body);
  },
  deletePost: (postId: string) => {
    return http.delete(`/posts/${postId}`);
  },
};

export default postApi;
