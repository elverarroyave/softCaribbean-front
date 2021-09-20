export class Client{

  firstName: string;
  lastName: string;
  numDocument: number;
  gender: string;
  email: string;


  constructor(
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    numDocument: number
  ){
    this.firstName = firstName;
    this.lastName=lastName;
    this.email=email;
    this.gender=gender;
    this.numDocument=numDocument;
  }
}
