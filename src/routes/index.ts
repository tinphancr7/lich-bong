import { lazy } from 'react';
const ListUser = lazy(() => import('../pages/User/ListUser'));
const EditUser = lazy(() => import('../pages/User/EditUser'));
const ListPost = lazy(() => import('../pages/Post/ListPost'));
const EditPost = lazy(() => import('../pages/Post/EditPost'));

const coreRoutes = [
  {
    path: '/list-user',
    title: 'Nguời dùng',
    component: ListUser,
  },
  {
    path: '/edit-user',
    title: 'Nguời dùng',
    component: EditUser,
  },
  {
    path: '/edit-user/:id',
    title: 'Nguời dùng',
    component: EditUser,
  },
  {
    path: '/list-post',
    title: 'Bài viết',
    component: ListPost,
  },
  {
    path: '/edit-post',
    title: 'Bài viết',
    component: EditPost,
  },
  {
    path: '/edit-post/:id',
    title: 'Bài viết',
    component: EditPost,
  },
];

const routes = [...coreRoutes];
export default routes;
