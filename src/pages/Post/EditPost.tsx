import { useEffect, useState } from 'react';
import Input from '../../components/input/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import apiUploadImages from '../../api/image';
import { toast } from 'react-toastify';
import { uploadImage } from '../../assets';
import Loading from '../../components/Loading/Loading';
import { ImBin } from 'react-icons/im';
import Textarea from '../../components/textarea/Textarea';
import { useMutation, useQuery } from '@tanstack/react-query';
import postApi from '../../api/post.api';
import { postSchema } from '../../utils/validation';
import Button from '../../components/button/Button';
import { useParams } from 'react-router-dom';
import MySunEditor from '../../components/SunEditor/MySunEditor';

const EditPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkStatus, setCheckStatus] = useState(true);
  const [isHot, setIsHot] = useState(false);
  const { id: postId } = useParams();

  // update
  const { data, refetch } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => postApi.getPost(postId as string),
    enabled: !!postId,
  });

  //add
  const postData = data?.data?.result;

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
      title: '',
      subtitle: '',
      description: '',
    },
    resolver: yupResolver(postSchema),
  });

  const createPostMutation = useMutation({
    mutationFn: (body) => postApi.createPost(body),
    onSuccess: (data) => {
      reset();
      setValue('description', '');
      setImagesPreview([]);

      toast.success('Tạo bài viết thành công');
    },
    onError: (error: any) => {
      toast.error('Tạo bài viết thất bại');
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: (body) => postApi.updatePost(postId as string, body),
    onSuccess: (data) => {
      toast.success('Cập nhật bài viết thành công');
    },
    onError: (error: any) => {
      toast.error('Cập nhật bài viết thất bại');
    },
  });
  const onSubmit = handleSubmit((data) => {
    const newData = {
      ...data,
      status: checkStatus,
      isHot: isHot,
      thumbnail: imagesPreview[0] || '',
    };

    if (postId) {
      updatePostMutation.mutate(newData);
    } else {
      createPostMutation.mutate(newData);
    }
  });
  const [imagesPreview, setImagesPreview] = useState([]);
  const handleFiles = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
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
      if (response.status === 200)
        images = [...images, response.data?.secure_url];
      e.target.value = '';
    }
    setIsLoading(false);
    setImagesPreview((prev) => [...prev, ...images]);
  };
  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
  };

  useEffect(() => {
    if (postId && postData) {
      setValue('title', postData?.title);
      setValue('subtitle', postData?.subtitle);
      setValue('description', postData?.description);
      setImagesPreview([postData?.thumbnail]);
      setCheckStatus(postData?.status);
      setIsHot(postData?.isHot);
    }
  }, [postId, postData]);
  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-4">
          <div className="w-full ">
            <h2 className="font-medium text-2xl py-4">
              {postId ? 'Sửa bài viết' : 'Thêm bài viết'}
            </h2>
            <small>Cập nhật hình ảnh rõ ràng </small>
            <div className="w-full ">
              <label
                className="w-full border-2 h-[250px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md cursor-pointer bg-white"
                htmlFor="file"
              >
                {!isLoading ? (
                  <div className="flex flex-col items-center justify-center gap-5">
                    <img src={uploadImage} className="w-[90px] h-20" alt="" />
                    <span>Thêm ảnh</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <Loading />
                  </div>
                )}
              </label>
              <input
                onChange={handleFiles}
                hidden
                type="file"
                id="file"
                multiple
              />
              <div className="w-full">
                <h3 className="font-medium py-4">Ảnh đã chọn</h3>
                <div className="grid grid-cols-12 gap-2 items-center">
                  {imagesPreview?.map((item) => {
                    return (
                      <div
                        key={item}
                        className="relative w-full col-span-4 h-[100px] "
                      >
                        <img
                          src={item}
                          alt="preview"
                          className="w-full h-full object-fill rounded-md"
                        />
                        <span
                          title="Xóa"
                          onClick={() => handleDeleteImage(item)}
                          className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-full"
                        >
                          <ImBin size={15} className="text-red-500" />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8 flex flex-col gap-4">
          <Input
            control={control}
            label="Tiêu đề"
            name="title"
            type="text"
            id="title"
            placeholder="Nhập tiêu đề"
            errorMessage={
              errors.title?.message
                ? errors.title?.message
                : errors.title?.message
            }
          />
          <Textarea
            control={control}
            label="Mô tả ngắn"
            name="subtitle"
            type="text"
            id="title"
            placeholder="Nhập mô tả ngắn"
            errorMessage={
              errors.subtitle?.message
                ? errors.subtitle?.message
                : errors.subtitle?.message
            }
          />
          <MySunEditor
            control={control}
            label="Nội dung mô tả"
            name="description"
            type="text"
            id="description"
            errorMessage={errors.description?.message}
          />
          {/* <Editor
            control={control}
            label="Nội dung mô tả"
            name="description"
            type="text"
            id="description"
            errorMessage={errors.description?.message}
          /> */}

          <div className="flex items-center gap-4">
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
                  {(checkStatus && 'Hiển thị') || (!checkStatus && 'Ẩn')}
                </span>
              </label>
            </div>
            <div>
              <label className="relative inline-flex items-center mb-5 cursor-pointer ">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={isHot}
                />
                <div
                  className="w-11 border bg-gray-2 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  onClick={() => setIsHot(!isHot)}
                ></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {(isHot && 'nổi bật') || (!isHot && 'không nổi bật')}
                </span>
              </label>
            </div>
          </div>
          <div className="flex items-center  my-4">
            <Button
              type="submit"
              className="capitalize bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br text-white text-base font-semibold rounded-md px-8 py-3"
            >
              <span>{postId ? 'Cập nhật bài viết' : 'Thêm bài viết'}</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditPost;
