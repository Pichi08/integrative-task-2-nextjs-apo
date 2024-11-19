import Cookies from "js-cookie";

export function useLogout() {
    const logout = () => {
        Cookies.remove("currentUser");
    };
    return { logout };
}