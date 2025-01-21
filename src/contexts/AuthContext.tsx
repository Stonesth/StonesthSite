import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, initializeAuth } from '../firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      console.log('Initializing authentication...');
      await initializeAuth();
      setInitialized(true);
    };
    initialize();
  }, []);

  useEffect(() => {
    if (!initialized) return;

    console.log('Setting up auth state listener');
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log('Auth state changed:', user ? `User ${user.uid} logged in` : 'No user');
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [initialized]);

  const value = {
    currentUser,
    loading,
  };

  console.log('AuthProvider state:', { currentUser: currentUser?.uid, loading, initialized });

  if (!initialized || loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
