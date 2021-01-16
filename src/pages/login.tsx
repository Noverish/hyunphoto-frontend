import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="p-3 d-flex flex-column justify-content-center text-white bg-primary vh-100">
      <h3 className="text-center">HyunPhoto</h3>
      <form className="p-4 text-center" onSubmit={handleSubmit(onSubmit)}>
        <input name="username" className="form-control" type="text" placeholder="본인 실명" ref={register({ required: true })} required />
        <input name="password" className="form-control mt-2" type="password" placeholder="비밀 번호" ref={register({ required: true })} required />
        <button type="submit" className="w-50 p-2 border-0 rounded-pill bg-white text-primary mt-3">Login</button>
      </form>
    </div>
  )
}
