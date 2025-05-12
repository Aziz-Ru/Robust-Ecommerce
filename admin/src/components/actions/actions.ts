"use server";

import { cookies } from "next/headers";
import { BaseURL } from "../baseurl";

export const loginAction = async (formData: FormData): Promise<boolean> => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const { data } = await BaseURL.post("/auth/local/login", {
      email,
      password,
    });
    if (data?.statusCode == 200) {
      (await cookies()).set("access_token", data?.access_token);
      (await cookies()).set("refresh_token", data?.refresh_token);
    }

    return true;
  } catch (error) {
    return false;
  }
};
