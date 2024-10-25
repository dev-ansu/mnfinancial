import {createContext, useContext, ReactNode, useState, useEffect} from "react"
import {onAuthStateChanged} from "firebase/auth";
import { auth } from "../services/firebaseConnection";

type AuthData = {
    signed: boolean;
    loadingAuth: boolean;
    user: UserProps | null;
    handleInfoUser: ({uid, name, email}: UserProps) => void;
}

interface UserProps{
    uid: string;
    name: string | null;
    email:string | null;
}

const AuthContext = createContext({} as AuthData);


interface AuthProviderProps{
    children: ReactNode;
}

export const AuthProvider = ({children}:AuthProviderProps)=>{
    const [user, setUser] = useState<UserProps | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(()=>{
        const unSub = onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser({
                    uid: user.uid,
                    name: user?.displayName,
                    email: user?.email,
                });
                setLoadingAuth(false)
            }else{
                setUser(null);
                setLoadingAuth(false);
            }
        })
        return ()=> unSub();
    },[])

    const handleInfoUser = ({uid,name,email}:UserProps)=>{
        setUser({
            uid,
            name,
            email,
        });
    }

    return(
        <AuthContext.Provider value={{user, signed: !!user, handleInfoUser, loadingAuth}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = ():AuthData=>{
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error('useAuthContext must be abled within a AuthProvider')
    }
    return context;
}