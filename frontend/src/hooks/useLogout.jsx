import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const router = useRouter();
  const handleLogout = () => {
    // 删除名为 "access_token" 的 cookie
    destroyCookie(null, "accessToken");
    destroyCookie(null, "userId");
    destroyCookie(null, "userName");
    // 可以执行其他登出操作
    router.push("/login");
  };
  return { handleLogout };
}
