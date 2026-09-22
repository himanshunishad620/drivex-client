import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/authApi";
import illustration from "../../assets/Illustration.svg";
import logo from "../../assets/Logo.svg";
import Button from "../../components/UI/reusable/Button";
import LinkText from "../../components/UI/reusable/LinkText";
import TextInput from "../../components/UI/reusable/TextInput";
import { useAuthContext } from "../../context/AuthProvider";
import useFormHook from "../../hooks/useFormHook";
import { useToast } from "../../hooks/useToast";

const Login: React.FC = () => {
  const { doLogin } = useAuthContext();
  const [login, { isLoading }] = useLoginMutation();
  const { values, handleChange } = useFormHook({
    email: "galij61035@koboywin.com",
    password: "Himan@123",
  });
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await login(values).unwrap();
      if (result) {
        showSuccess("Logged In Successfully!");
        doLogin(result._id);
        navigate("/dashboard", { replace: true });
      }
    } catch (error: any) {
      showError(error?.data?.msg);
    }
  };
  return (
    <div className="flex h-full w-full">
      <div className="hidden w-1/2 flex-col justify-between bg-[#407BE8] px-40 py-20 md:flex">
        <img src={logo} className="w-40" alt="" />
        <div>
          <h1 className="text-5xl font-bold text-white">
            Manage your files <br />
            the best way
          </h1>
          <p className="mt-6 text-sm text-white">
            Awesome, we've created the perfect place for you <br />
            to store all your documents.
          </p>
        </div>
        <img src={illustration} className="w-60" alt="" />
      </div>
      <div className="flex w-full items-center justify-center bg-gray-100 md:w-1/2">
        <form
          onSubmit={handleSumbit}
          className="shadow-3d flex w-90 flex-col items-center justify-center gap-1 rounded-xl bg-white p-10"
        >
          <h1 className="text-2xl font-semibold text-blue-500">Login</h1>
          <TextInput
            type="email"
            label="Email"
            name="email"
            value={values.email}
            placeHolder="e.g. abc@mail.com"
            size="md"
            parentWidth={true}
            helperText="Please enter your registered email."
            required={true}
            onChange={handleChange}
          />
          <TextInput
            type="password"
            label="Password"
            name="password"
            value={values.password}
            placeHolder="e.g. Abcd@123"
            size="md"
            parentWidth={true}
            helperText="Please enter your password."
            required={true}
            onChange={handleChange}
          />
          <LinkText
            text=""
            targetPage="/auth/forgotPassword"
            align="center"
            linkText="Forgot Password?"
          />
          <Button
            label="Login"
            size="sm"
            parentWidth={true}
            isLoading={isLoading}
          />
          <LinkText
            text="Don't have an account?"
            targetPage="register"
            linkText="Create account"
            align="center"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
