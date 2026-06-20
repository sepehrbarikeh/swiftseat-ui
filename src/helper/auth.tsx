"use client";

import Cookies from "universal-cookie";

export default function UserLoginToken(token: string) {
  const cookie = new Cookies();
  cookie.set("access_token", token, {
    maxAge: 23.5 * 3600,
    path: "/",
    sameSite: "lax",
  });
};
