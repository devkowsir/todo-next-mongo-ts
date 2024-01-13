interface ITodo {
  id: string;
  title: string;
  user: string;
  completed: boolean;
}

interface IUser {
  username: string;
  email: string;
  password: string;
  todos: string[];
  isVerified: boolean;
  isAdmin: boolean;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
}
