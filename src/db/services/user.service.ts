"use server";

import dbConnect from "@/db";
import { User, UserInput } from "@/db/models";
import { FilterQuery, HydratedDocument, UpdateQuery } from "mongoose";

export async function createUser(user: UserInput) {
  await dbConnect();
  const addedUser = await User.create(user);
  return addedUser.id as string;
}

export async function findAllUsers(filter: FilterQuery<UserInput> = {}) {
  await dbConnect();
  return (await User.find(filter)) as HydratedDocument<
    HydratedDocument<IUser>
  >[];
}

export async function findUser(filter: FilterQuery<UserInput>) {
  await dbConnect();
  return (await User.findOne(filter)) as HydratedDocument<IUser>;
}

export async function updateUser(id: string, data: UpdateQuery<UserInput>) {
  await dbConnect();
  const updatedDoc = await User.findByIdAndUpdate(id, { $set: { ...data } });
  return (updatedDoc?.id ?? null) as string | null;
}

export async function deleteUser(id: string) {
  await dbConnect();
  const removedUser = await User.findOneAndDelete({ _id: id });
  return removedUser as HydratedDocument<IUser> | null;
}
