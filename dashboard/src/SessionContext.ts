import { createContext, useContext } from "react";

export interface Session {
  user: {
    name?: string;
    email?: string;
    image?: string;
    token?: string;
  };
}

interface SessionContextType {
  session: Session | null;
  setSession: (session: Session) => void;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  setSession: (session: Session) => {
    console.log("nice");
    console.log(session);
  },
  loading: true,
});

export default SessionContext;

export const useSession = () => useContext(SessionContext);
