import http from '../utils/http';

const userApi = {
  createUser: (body: any) => {
    return http.post('/users', body);
  },
  allUsers: ({ search, pageIndex, pageSize }: any) => {
    return http.get('/users', {
      params: {
        search,
        pageIndex,
        pageSize,
      },
    });
  },
  getUser: (userId: string) => {
    return http.get(`/users/${userId}`);
  },
  updateUser: (userId: string, body: any) => {
    return http.put(`/users/${userId}`, body);
  },
  deleteUser: (userId: string) => {
    return http.delete(`/users/${userId}`);
  },
};

export default userApi;
