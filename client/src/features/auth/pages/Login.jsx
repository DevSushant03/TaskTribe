import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import { loginSchema } from "../validator/auth_validation.js";
import useLogin from "../hooks/useLogin.jsx";

import LoginForm from "../components/LoginForm.jsx";
import AuthImage from "../components/AuthImage.jsx";
import SidePicture from "/src/assets/teamworks.jpg";

export default function Login() {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  const handleLoginSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>Login | TaskTribe</title>
        <meta
          name="description"
          content="Login to TaskTribe and start posting or solving tasks quickly."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col h-screen justify-center px-8 py-8 bg-gradient-to-br from-orange-50 to-white">
          <button
            onClick={() => navigate("/")}
            className="absolute flex justify-evenly w-25 cursor-pointer top-5 left-5 text-white bg-orange-500 p-2 rounded-full"
          >
            <FaArrowAltCircleLeft color="white" size={25} /> Home
          </button>

          <FormProvider {...methods}>
            <LoginForm onValid={handleLoginSubmit} loading={loginMutation.isPending} />
          </FormProvider>
        </div>

        <AuthImage src={SidePicture} alt="Motivational Visual" />
      </div>
    </>
  );
}