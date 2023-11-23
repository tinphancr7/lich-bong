import { useEffect, useState } from 'react';
import Input from '../../components/input/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import apiUploadImages from '../../api/image';
import { toast } from 'react-toastify';
import { ImBin } from 'react-icons/im';
import { useMutation, useQuery } from '@tanstack/react-query';
import { userSchema } from '../../utils/validation';
import Button from '../../components/button/Button';
import { useParams } from 'react-router-dom';
import userApi from '../../api/user.api';
import { AiOutlineUser } from 'react-icons/ai';
import MySelect from '../../components/MySelect/MySelect';
import Loading from '../../components/Loading/Loading';

const EditUser = () => {
  const [checkStatus, setCheckStatus] = useState(true);
  const { id: userId } = useParams();

  // update
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUser(userId as string),
    enabled: !!userId,
  });

  //add
  const userData = data?.data?.result;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
    resolver: yupResolver(userSchema),
  });

  const createUserMutation = useMutation({
    mutationFn: (body) => userApi.createUser(body),
    onSuccess: (data) => {
      reset();
      setImagesPreview([]);

      toast.success('Tạo bài người dùng thành công');
    },
    onError: (error: any) => {
      toast.error('Tạo bài người dùng thất bại');
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (body) => userApi.updateUser(userId as string, body),
    onSuccess: (data) => {
      toast.success('Cập nhật người dùng thành công');
    },
    onError: (error: any) => {
      toast.error('Cập nhật người dùng thất bại');
    },
  });
  const onSubmit = handleSubmit((data) => {
    const newData = {
      ...data,
      status: checkStatus,
      avatar: imagesPreview[0] || '',
    };
    console.log(
      '🚀 ~ file: EditUser.tsx ~ line 121 ~ onSubmit ~ newData',
      newData,
    );

    if (userId) {
      updateUserMutation.mutate(newData);
    } else {
      createUserMutation.mutate(newData);
    }
  });
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const handleFiles = async (e) => {
    e.stopPropagation();

    const maxUploads = 5; // Maximum number of images allowed
    let images = [];

    let files = e.target.files;
    if (files.length > maxUploads)
      return toast.warning('Chỉ được tối đa 5 ảnh');
    let formData = new FormData();
    for (let i of files) {
      formData.append('file', i);
      // @ts-ignore
      formData.append('upload_preset', import.meta.env.VITE_UPLOAD_ASSETS_NAME);
      formData.append('folder', 'phongtro123');

      let response = await apiUploadImages(formData);
      console.log('response', response);
      if (response.status === 200)
        images = [...images, response.data?.secure_url];
    }

    setImagesPreview((prev) => [...prev, ...images]);
  };
  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
  };

  useEffect(() => {
    if (userId && userData) {
      setValue('username', userData.username);
      setValue('email', userData.email);
      setValue('password', userData.password);
      setImagesPreview([userData?.avatar]);

      // setValue('role', userData.role);
    }
  }, [userId, userData]);
  return (
    <form onSubmit={onSubmit} className="border border-gray rounded-lg">
      <div className="p-10 w-full rounded-lg bg-white  h-fit shadow-md">
        <div className="border-b mb-4 pb-4">
          <h3 className="text-2xl capitalize font-semibold">
            {userId ? 'Cập nhật' : 'Thêm'} người dùng
          </h3>
        </div>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-8 border-r pr-10 flex flex-col gap-4">
            <Input
              control={control}
              label="Tên đăng nhập"
              name="username"
              type="text"
              className="w-full"
              id="username"
              placeholder="Nhập tên đăng nhập"
              errorMessage={
                errors.username?.message
                  ? errors.username?.message
                  : errors.username?.message
              }
            />

            <Input
              control={control}
              label="Email"
              name="email"
              type="text"
              className="w-full"
              id="email"
              placeholder="Nhập email"
              errorMessage={
                errors.email?.message
                  ? errors.email?.message
                  : errors.email?.message
              }
            />
            <Input
              control={control}
              label="Mật khẩu"
              name="password"
              type="text"
              className="w-full"
              id="password"
              placeholder="Nhập password"
              errorMessage={
                errors.password?.message
                  ? errors.password?.message
                  : errors.password?.message
              }
            />

            <MySelect
              control={control}
              label="Vai trò"
              name="role"
              type="text"
              className="w-full"
              id="role"
              defaultValue="admin"
              errorMessage={''}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </MySelect>
            <div>
              <label className="relative inline-flex items-center mb-5 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={checkStatus}
                />
                <div
                  className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  onClick={() => setCheckStatus(!checkStatus)}
                ></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {(checkStatus && 'Hiển thị người dùng') ||
                    (!checkStatus && 'Ẩn bài người dùng')}
                </span>
              </label>
            </div>
            <Button
              type="submit"
              className="capitalize bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br text-white text-base font-semibold rounded-md px-8 py-3"
            >
              {isLoading ? <Loading /> : userId ? 'Cập nhật' : 'Thêm'}
            </Button>
          </div>
          <div className="col-span-4">
            <div className="flex items-center justify-center flex-col gap-2">
              {imagesPreview.length > 0 ? (
                <div className="w-[150px] h-[150px] rounded-full relative bg-gray">
                  <img
                    src={imagesPreview[0]}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                  <span
                    title="Xóa"
                    onClick={() => setImagesPreview([])}
                    className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-full"
                  >
                    <ImBin size={15} className="text-red-500" />
                  </span>
                </div>
              ) : (
                <div className="w-[150px] h-[150px] rounded-full bg-gray-200 flex items-center justify-center bg-gray">
                  <AiOutlineUser size={30} className="text-gray-400" />
                </div>
              )}

              <input
                onChange={handleFiles}
                hidden
                type="file"
                id="avatar"
                multiple
              />
              <label
                htmlFor="avatar"
                className="px-5 py-2 border rounded-md bg-slate-100 cursor-pointer"
              >
                Chọn ảnh
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditUser;
