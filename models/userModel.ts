import fs from "node:fs/promises";

const DB_PATH = "database.json";

const userModel = {
  /* FIX ME (types) 😭 */
  async findOne(email: string): Promise<Express.User | undefined> {
    try {
      const file = await fs.readFile(DB_PATH, "utf8");
      const users: Express.User[] = JSON.parse(file);
      return users.find((u) => u.email === email);
    } catch {
      return undefined;
    }
  },

  /* FIX ME (types) 😭 */
  async findById(id: string | number): Promise<Express.User | undefined> {
    try {
      const file = await fs.readFile(DB_PATH, "utf8");
      const users: Express.User[] = JSON.parse(file);
      return users.find((u: any) => String(u.id) === String(id));
    } catch {
      return undefined;
    }
  },

  async create(newUser: Express.User): Promise<Express.User> {
    let users: Express.User[] = [];

    try {
      const file = await fs.readFile(DB_PATH, "utf8");
      users = JSON.parse(file);
    } catch {
      users = [];
    }

    users.push(newUser);
    await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2), "utf8");

    return newUser;
  },
}
export { userModel };

declare global {
  namespace Express {
    export interface User {
      id: string | number;
      name: string;
      email?: string;
      password?: string;
      role?: string;
    }
  }
}
