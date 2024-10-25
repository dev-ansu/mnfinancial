import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Container from "../../components/Container"
import Input from "../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginProps, LoginSchema } from "../../schemas/LoginSchema";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const Login = ()=>{
    const {handleInfoUser} = useAuthContext();
    const navigate = useNavigate();
    const {register, formState:{errors}, handleSubmit} = useForm<LoginProps>({
        criteriaMode:"all",
        mode:"all",
        resolver: zodResolver(LoginSchema),
    });
    
    useEffect(()=>{
        const handleLogout = async()=>{
            await signOut(auth);
        }
        handleLogout();
    },[]);

    const authenticate = async(data: LoginProps)=>{
        try{
            const user = await signInWithEmailAndPassword(auth, data.email, data.password);
            handleInfoUser({
                uid: user.user.uid,
                email: user.user.email,
                name: user.user.displayName,
            });
            toast.success("Autenticação realizada com sucesso.");
            navigate("/app");
        }catch(err: any){
            console.log(err);
            toast.error("Autenticação falhou!")
        }
    }

    return(
        <Container className="
            flex
            justify-center
            items-center
        ">
            <div className="bg-white md:w-4/12 w-full rounded p-4">
                <h1 className="text-center font-bold text-3xl">Login</h1>
                <form onSubmit={handleSubmit(authenticate)} className="mt-4 flex flex-col gap-4">
                    <div className="form-group">
                        <label htmlFor="email" className="">E-mail:</label>
                        <Input 
                            placeholder="Digite seu e-mail"
                            register={register("email")}
                            error={errors.email?.message}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="">Senha:</label>
                        <Input 
                            register={register("password")}
                            error={errors.password?.message}
                            placeholder="Digite sua senha"
                            type="password"
                        />
                    </div>
                    <Button 
                        className="bg-purple-950 text-white"
                        text="Entrar"
                        type="submit"
                    />
                </form>
            </div>
        </Container>
    )
}
export default Login;