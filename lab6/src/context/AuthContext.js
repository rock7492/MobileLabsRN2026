import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { createInitialUserProfile, deleteUserProfile } from '../services/userService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  async function register(email, password) {
    const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    await createInitialUserProfile(credential.user);
    return credential.user;
  }

  async function login(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
    return credential.user;
  }

  async function logout() {
    await signOut(auth);
  }

  async function resetPassword(email) {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      throw new Error('auth/missing-email');
    }

  await sendPasswordResetEmail(auth, normalizedEmail);
}

  async function deleteAccount(password) {
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.email) {
      throw new Error('Користувач не авторизований.');
    }

    const credential = EmailAuthProvider.credential(currentUser.email, password);
    await reauthenticateWithCredential(currentUser, credential);
    await deleteUserProfile(currentUser.uid);
    await deleteUser(currentUser);
  }

  const value = useMemo(
    () => ({
      user,
      initializing,
      register,
      login,
      logout,
      resetPassword,
      deleteAccount,
    }),
    [user, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth має використовуватись всередині AuthProvider.');
  }

  return context;
}
