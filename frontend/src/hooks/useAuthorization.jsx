"use client";

import { parseCookies } from "nookies";

const useAuthorization = () => {
  const cookies = parseCookies();
  const { userId } = cookies;
  const { accessToken } = cookies;
  const { userName } = cookies;
  return { userId, accessToken, userName };
};

export default useAuthorization;
