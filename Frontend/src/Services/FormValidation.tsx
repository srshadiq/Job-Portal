const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
const signupValidation = (name: string, value: string) => {
  switch (name) {
    case "name":
      if (value.length === 0) return "Name is required";
      return "";
    case "email":
      if (value.length === 0) return "Email is required";
      if (!emailRegex.test(value)) return "Email is invalid";
      return "";
    case "password":
      if (value.length === 0) return "Password is required";
      if (!passwordRegex.test(value))
        return "Password must be 6–15 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)";
      return "";
    default:
      return "";
  }
};
const loginValidation = (name: string, value: string) => {
  switch (name) {
    case "name":
      if (value.length === 0) return "Name is required";
      return "";
    case "email":
      if (value.length === 0) return "Email is required";
      return "";
    case "password":
      if (value.length === 0) return "Password is required";
      return "";
    default:
      return "";
  }
};
export { signupValidation, loginValidation };
