import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'buyer' or 'seller'
  const [loading, setLoading] = useState(true);

  // Unified login function
  const login = async (email, password, type) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUserType(type);
    return userCredential;
  };

  // Registration function
  const register = async (email, password, type) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setUserType(type);
    return userCredential;
  };

  const logout = () => {
    setUserType(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userType,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);