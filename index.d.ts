
  declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }

declare module '*.svg' {
    const content: any;
    export default content;
  }
  
// TYPES
type UserType = {
    id: string;
    email: string;
    username: string;
    password: string;
    diskSpace: number;
    usedSpace: number;
    files?: any[];
  };

type AuthState = {
  user : Omit<UserType, 'password' | 'files'> | null;
  isAuthenticated: boolean;
  token: string | null;
  message: string | null;
}  
// INTERFACES
interface Service {
    isLogined: boolean;
  }

type customError = {
    data: {
        message: string
    } 
} 
 

  // MESSAGE TYPES 
type SignUpMessage= {
   
    isSignUp: boolean,
    message: string,
    date: string
}
type SignInMessage = {
    user: Omit<UserType, 'password' | 'files'>,
    isSignIn: boolean,
    message: string,
    JWT: string,
    date: string
}
type AuthMeMessage = {
    id: string,
    date: string
}