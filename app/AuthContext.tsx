import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '../supabase';
import { Session } from '@supabase/supabase-js';

// Defines the Interface
interface AuthContextInterface {
  isAuthenticated: boolean;
  session: Session | null;
}

const AuthContext = createContext<AuthContextInterface>({
  isAuthenticated: false,
  session: null,
});

// The Provider Logic
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in when the app opens
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsReady(true);
    });

    // Checks for the logins and logouts
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!isReady) return null; 

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!session, 
      session 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// The Custom Hook
export const useAuth = () => useContext(AuthContext);