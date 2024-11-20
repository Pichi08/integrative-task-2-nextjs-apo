import { RegisterUser } from "@/interfaces/registerUser"
import { RegisterUserService } from "@/services/registerUser.service"
// import Cookies from "js-cookie";


export const useRegister = () => {
    const register = async (name: string, email: string, password: string) => {
        const registerUserService = new RegisterUserService("https://integrative-task-2-team.onrender.com/");
        // const registerUserService = new RegisterUserService("http://0.0.0.0:8000/");

        try {
            const registerUser = await registerUserService.registerUser(name, email, password);
            // console.log(registerUser)
            return registerUser as RegisterUser;
        } catch (err) {
            console.error("Error params register: ", err)
        }
        
    }

    return {register};
};