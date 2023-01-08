export class User{
    id?:number;
    username = "";
    email = "";
    password = "";
    name = "";
    surname = "";
    dateOfBirth = "";
    address = "";
    typeOfUser = "";
    photoUrl = "";
    registered? : number;
    verified?: number;
    orders = [];
}