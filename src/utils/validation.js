import { toast } from "sonner";
import { nanoid } from 'nanoid';
import { setLocalStorage } from "./localStorage";

export const formValidation = ({
    data,
    user,
    setUser,
    reset,
    navigate
}) => {

    const existingUser = user.find(u => u.email === data.email);
    if (existingUser) {
        toast.error('Email already exists!', {
            description: `User with email ${data.email} is already registered.`,
            duration: 4000,
            action: {
                label: 'Login',
                onClick: () => navigate('/'),
            },
            closeButton: true
        });
        return;
    }

    // Show loading toast
    const toastId = toast.loading('Creating your account...');

    const newUser = {
        id: nanoid(),
        ...data
    };

    try {
        setUser(prevUsers => {
            const updatedUsers = [...prevUsers, newUser];
            return updatedUsers;
        });

        reset();

        // Update loading to success
        toast.success('Welcome to SkyMart! 🎉', {
            id: toastId,
            description: `Your account has been created successfully.`,
            duration: 5000,
            closeButton: true
        });

        // Navigate after short delay for better UX
        setTimeout(() => {
            navigate('/');
        }, 500);

    } catch (error) {
        toast.error('Failed to create account', {
            id: toastId,
            description: 'Please try again later.',
        });
    }
};

export const login = ({
    data,
    setCurrentUser,
    user,
    reset,
    navigate
}) => {
    const existingUser = user.find(u => u.email === data.email && u.password === data.password);
    if (existingUser) {
        setCurrentUser(existingUser);
        toast.success(`Welcome back, ${existingUser.fullName}! 🎉`, {
            duration: 5000,
            closeButton: true
        });
        navigate('/home');
        reset();
        return true
    }

    toast.error('Invalid email or password!');
    return false;
}

export const logout = (setCurrentUser, navigate) => {
  setCurrentUser(null);
  localStorage.removeItem("currentUser");
  toast.info("Logged out successfully",{
    duration: 5000
  });
  navigate('/')
};