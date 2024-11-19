import { User } from "@/interfaces/user";
import { AuthService } from "@/services/auth.service"
import Cookies from "js-cookie";

export const useLogin = () => {
    const login = async (email: string, password: string) => {
        const authService = new AuthService("https://beard-nest.vercel.app/");
        const user = await authService.login(email, password);
        if (user)
            Cookies.set("currentUser", JSON.stringify(user));

        return user as User;        
    }

    return {login};
};