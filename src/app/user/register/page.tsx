"use client";

import { UserInput } from "@/db/models/user";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<UserInput>({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(user),
      });

      if (response.ok) router.replace("/user/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-2 w-80">
      <label className="flex">
        Name
        <input
          className="ml-auto w-56 bg-transparent border rounded-sm px-1"
          type="text"
          name="name"
          value={user.name}
          onChange={(e) =>
            setUser((user) => ({ ...user, name: e.target.value }))
          }
        />
      </label>
      <label className="flex">
        Email
        <input
          className="ml-auto w-56 bg-transparent border rounded-sm px-1"
          type="email"
          name="email"
          value={user.email}
          onChange={(e) =>
            setUser((user) => ({ ...user, email: e.target.value }))
          }
        />
      </label>
      <label className="flex">
        Password
        <input
          className="ml-auto w-56 bg-transparent border rounded-sm px-1"
          type="password"
          name="password"
          value={user.password}
          onChange={(e) =>
            setUser((user) => ({ ...user, password: e.target.value }))
          }
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
