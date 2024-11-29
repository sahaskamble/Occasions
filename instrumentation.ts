import Categories from "./lib/models/Categories";
import Packages from "./lib/models/Packages";
import Users from "./lib/models/Users";
import dbConnect from "./lib/mongodb";

export async function register() {
  await dbConnect();
  Users.create();
  Categories.create();
  Packages.create();
}
