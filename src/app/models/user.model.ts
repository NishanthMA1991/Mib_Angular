
export class User {
    id: any;
    fullName: string;
    email: string;
    userRole: string;
    profileImage: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    token:string;
    role:string;
    isLoggedIn:string;
    snumber:string;
    street:string;
    city:string;
    state:string;
    country:string;
    zip:string;
        
    constructor( token:string, role:string,isLoggedIn:string,email: string){
        this.token = token;
        this.role = role;
        this.isLoggedIn = isLoggedIn;
        this.email = email;
    }
}