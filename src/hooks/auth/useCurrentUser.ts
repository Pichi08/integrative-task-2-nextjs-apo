import { User } from "@/interfaces/user";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useCurrentUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = Cookies.get("currentUser");
        if (user) {
            setUser(JSON.parse(user));
        }
        setIsLoading(false); // Set loading to false after attempting to get the user
    }, []);

    return { user, isLoading };
};
