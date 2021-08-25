import authService from "./components/services/auth.service"

export const isUserAdmin = () => {
    if (authService.getCurrentUser() != null && authService.getCurrentUser().role === "ADMIN") {
        return true;
    }
    return true;
}
export const floatConvert = (amount) => {
    if (amount == Math.floor(amount))
        return amount.toString() + ".00";
    return amount
}