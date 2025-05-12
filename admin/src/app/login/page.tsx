import LoginForm from "@/components/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const access_token = (await cookies()).get("access_token");
  if (access_token) {
    redirect("/");
  }
  return (
    <div className="flex justify-center items-center p-4 h-screen">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
