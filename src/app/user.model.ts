import {Deserializable} from "./deserializable.model";
import { Idols } from './idol.model';

export class User  implements Deserializable<User> {
  _id: number;
  username: String;
  password: String;
  firstname: String;
  lastname: String;
  email: String;
  avatar: String;
  resetPasswordToken: String;
  resetPasswordExpires: String;
  isAdmin: Boolean;
  
  deserialize(input: any): User {
    Object.assign(this, input);
    return this;
  }
}

export class Userform {
  username: String;
  password: String;
  firstname: String;
  lastname: String;
  email: String;
  avatar: any;
  isAdmin: String;
}

export class Userlogin {
  username: String;
  password: String;
}

export class Userreset {
  newpassword: String;
  conpassword: String;
}

export class Userprofile  implements Deserializable<Userprofile> {
  user: User;
  idols: Idols[];
  
  deserialize(input: any): Userprofile {
    Object.assign(this, input);
    this.user = new User().deserialize(input.user);
    this.idols = input.idols.map(idol => new Idols().deserialize(idol));
    return this;
  }
}