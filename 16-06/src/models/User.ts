export class User {
    private id?:number;
    private email:string;
    private password:string;

    constructor(id:number, email:string, password:string){
        this.id = id
        this.email = email
        this.password = password
    } 
    getId(): number | undefined {
        return this.id;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    setId (id:number):void{
        this.id = id
    }

    setEmail (email:string):void{
        this.email = email
    }

    setPassword (password:string):void{
        this.password = password
    }

}