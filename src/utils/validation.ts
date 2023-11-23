import * as yup from 'yup';
const postSchema = yup.object().shape({
  title: yup.string().required('Vui lòng nhập tiêu đề'),
  subtitle: yup.string().required('Vui lòng nhập mô tả ngắn gọn'),
  description: yup.string().required('Vui lòng nhập nội dung'),
});

const userSchema = yup.object().shape({
  username: yup.string().required('Vui lòng nhập username'),
  password: yup
    .string()
    .min(5, 'Mật khẩu phải có ít nhất 5 kí tự')
    .required('Vui lòng nhập password'),
  email: yup.string().email('Email is invalid').required('Vui lòng nhập email'),
});
// username:"",
// password:"",
// email:"",
// phone:"",

// role:"",
// status:""
// image:"",
export type PostSchema = yup.InferType<typeof postSchema>;
export type UserSchema = yup.InferType<typeof userSchema>;

export { postSchema, userSchema };
