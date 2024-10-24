import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../Components/UsedInputs";
import Layout from "../Layout/Layout";
import { FiLogIn } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../Components/Notifications/Error";
import { RegisterValidation } from "../Components/Validation/UserValidation";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { registerAction } from "../Redux/Actions/UserActions";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, isLoading, isError, isSuccess } = useSelector(
    (state) => state.userRegister
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterValidation),
  });

  const onSubmit = (data) => {
    dispatch(registerAction(data));
  };

  useEffect(() => {
    if (userInfo?.isAdmin) {
      navigate("/dashboard");
    } else if (userInfo) {
      navigate("/profile");
    }
    if (isSuccess) {
      toast.success(`Welcome ${userInfo?.fullName} 😊`);
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
  }, [userInfo, isSuccess, dispatch, navigate, isError]);

  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry  rounded-lg border border-border"
        >
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-full h-12 object-contain"
          />
          <div className="w-full">
            <Input
              label="FullName"
              placeholder="John Example"
              type="text"
              bg={true}
              name="fullName"
              register={{ ...register("fullName") }}
            />
            {errors.fullName && (
              <InlineError message={errors.fullName.message} />
            )}
          </div>
          <div className="w-full">
            <Input
              label="Email"
              placeholder="example@gmail.com"
              type="email"
              bg={true}
              name="email"
              register={{ ...register("email") }}
            />
            {errors.email && <InlineError message={errors.email.message} />}
          </div>

          <div className="w-full">
            <Input
              label="Password"
              placeholder="********"
              type="password"
              bg={true}
              name="password"
              register={{ ...register("password") }}
            />
            {errors.password && (
              <InlineError message={errors.password.message} />
            )}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                <FiLogIn /> Sign Up
              </>
            )}
          </button>
          <p className="text-center text-border">
            Already have an account?{" "}
            <Link to="/login" className="text-dryGray font-semibold ml-2">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
