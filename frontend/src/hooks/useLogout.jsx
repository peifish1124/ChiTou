import { removeCookie } from "nookies";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const router = useRouter();
  const handleLogout = () => {
    // 删除名为 "access_token" 的 cookie
    removeCookie(null, "accessToken", { path: "/" });
    removeCookie(null, "userId", { path: "/" });
    removeCookie(null, "userName", { path: "/" });
    // 可以执行其他登出操作
    router.push("/login");
  };
  return { handleLogout };
}
