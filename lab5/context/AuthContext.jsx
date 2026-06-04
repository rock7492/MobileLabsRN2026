import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const initialUsers = [
  {
    id: "1",
    name: "Адміністратор",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "Демо користувач",
    email: "demo@example.com",
    password: "123456",
    role: "user",
  },
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);

  const isAuthenticated = Boolean(currentUser);
  const isAdmin = currentUser?.role === "admin";

  function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = users.find(
      (item) => item.email === normalizedEmail && item.password === password
    );

    if (!user) {
      return {
        success: false,
        message: "Неправильний email або пароль.",
      };
    }

    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return {
      success: true,
    };
  }

  function register(email, password, name) {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();

    const userExists = users.some((item) => item.email === normalizedEmail);

    if (userExists) {
      return {
        success: false,
        message: "Користувач з таким email вже існує.",
      };
    }

    const newUser = {
      id: String(Date.now()),
      name: normalizedName,
      email: normalizedEmail,
      password,
      role: "user",
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);

    setCurrentUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });

    return {
      success: true,
    };
  }

  function logout() {
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        currentUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth потрібно використовувати всередині AuthProvider.");
  }

  return context;
}