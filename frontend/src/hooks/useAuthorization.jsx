/* eslint-disable dot-notation */
/* eslint-disable prefer-destructuring */

"use client";

import { parseCookies } from "nookies";

const useAuthorization = () => {
  const cookies = parseCookies();
  const userId = cookies["userId"];
  const userName = cookies["userName"];
  const accessToken = cookies["accessToken"];
  return { userId, userName, accessToken };
};

export default useAuthorization;
