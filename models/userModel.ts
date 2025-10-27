export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
}

const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
  },
];



const userModel = {

  /* FIX ME (types) 😭 */
  findOne: (email: string): User | undefined => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    return undefined;  // return undefined if user is not found
  },
  /* FIX ME (types) 😭 */
   findById: (id: number): User | undefined => {
    const user = database.find((user) => user.id === id);
    return user || undefined;
  },
};

export { database, userModel };
