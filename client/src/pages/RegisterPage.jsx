import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { authApi } from "../api/auth.js";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await authApi.register(values);
      toast.success("Account created. Please sign in.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-white px-4 dark:from-slate-950 dark:to-slate-900">
      <div className="card w-full max-w-sm p-8">
        <h1 className="text-2xl font-bold text-brand-600">Create Account</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Requires an existing Employee record and Role Id — created by an admin.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="label">Username</label>
            <input className="input" {...register("username", { required: true })} />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" {...register("email", { required: true })} />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">Minimum 8 characters</p>
            )}
          </div>
          <div>
            <label className="label">Employee Id</label>
            <input className="input" {...register("employeeId", { required: true })} />
          </div>
          <div>
            <label className="label">Role Id</label>
            <input className="input" {...register("roleId", { required: true })} />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-brand-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
