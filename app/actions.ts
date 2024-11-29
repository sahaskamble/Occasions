'use server';

import Users from "@/lib/models/Users";

export async function FetchUser() {
  try {
    const user = await Users.find();
    console.log(user)
    return JSON.stringify(user);
  } catch (error: unknown) {
    return error;
  }
}

