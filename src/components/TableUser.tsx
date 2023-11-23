import { BsFillTrashFill } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ModalDelete from './modal/ModalDelete';
import { useEffect, useState } from 'react';
import Pagination from './pagination/Pagination';
import userApi from '../api/user.api';
import ModalUserDelete from './modal/ModalUserDelete';
interface TableUserProps {
  searchMatch: string;
}

const TableUser = ({ searchMatch }: TableUserProps) => {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [userId, setUserId] = useState('');

  const { data, refetch } = useQuery({
    queryKey: ['users', pageIndex, searchMatch],
    queryFn: () =>
      userApi.allUsers({
        search: searchMatch || '',
        pageSize: pageSize,
        pageIndex: pageIndex,
      }),
  });
  const usersData = data?.data?.result;
  useEffect(() => {
    if (usersData?.length > 0) {
      setTotalPage(data?.data?.totalPage);
      setPageIndex(data?.data?.pageIndex);
    }
  }, [usersData?.length]);

  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };

  const handleOpenModalDelete = (e: any, id: string) => {
    e.stopPropagation();
    setShowModalDelete(true);
    setUserId(id);
  };
  return (
    <>
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="rounded-sm border border-stroke bg-white  pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark  xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Tên
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Hình ảnh
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Email
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Vai trò
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Trạng thái
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Thời gian
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersData?.map((user: any) => (
                  <tr className="border-b border-[#eee] last:border-none">
                    <td className=" py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <p className="text-black  dark:text-white">
                        {user?.username}
                      </p>
                    </td>
                    <td className=" py-5 px-4 dark:border-strokedark">
                      <div className="h-12 w-12 rounded-md">
                        <img
                          src={`${user?.avatar}`}
                          alt="Product"
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className=" py-5 px-4 dark:border-strokedark">
                      <p className="text-black  dark:text-white">
                        {user?.email}
                      </p>
                    </td>
                    <td className=" py-5 px-4 dark:border-strokedark">
                      <p className="text-black  dark:text-white">
                        {user?.role}
                      </p>
                    </td>
                    <td className=" py-5 px-4 dark:border-strokedark">
                      {user.status ? (
                        <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                          Hiển thị
                        </p>
                      ) : (
                        <p className="inline-flex rounded-full bg-red-500 bg-opacity-10 py-1 px-3 text-sm font-medium text-red-500">
                          Ẩn
                        </p>
                      )}
                    </td>
                    <td className=" py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {moment(user?.createdAt).fromNow()}
                      </p>
                    </td>
                    <td className=" py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <Link to={`/edit-user/${user._id}`} className="">
                          <AiOutlineEye size={20} className="text-primary" />
                        </Link>
                        <button
                          className=""
                          onClick={(e) => handleOpenModalDelete(e, user._id)}
                        >
                          <BsFillTrashFill size={20} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-end">
        <Pagination
          pageSize={pageSize}
          totalPage={totalPage}
          setPageIndex={setPageIndex}
        />
      </div>
      {showModalDelete && (
        <ModalUserDelete onClose={handleCloseModalDelete} userId={userId} />
      )}
    </>
  );
};

export default TableUser;
