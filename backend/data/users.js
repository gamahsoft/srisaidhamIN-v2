import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    phone: "123 123 1234",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    phone: "123 123 1234",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    phone: "123 123 1234",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
