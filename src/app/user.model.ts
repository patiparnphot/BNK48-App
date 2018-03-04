import { Deserializable } from "./deserializable.model";
import { Idols } from './idol.model';

export class User  implements Deserializable<User> {
  _id: any;
  username: string;
  password: string;
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

export class Currently {
  _id: any;
  username: string;
  password: string;
  isAdmin: boolean;
}

export class Userform {
  username: string;
  password: string;
  firstname: String;
  lastname: String;
  email: String;
  avatar: String;
  admincode: String;
}

export class Userlogin {
  username: string;
  password: string;
}

export class Userreset {
  password: String;
  confirm: String;
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

export class Cloudinary {
  public_id: String;
  version: Number;
  signature: String;
  width: Number;
  height: Number;
  format: String;
  resource_type: String;
  created_at: String;
  tags: any;
  bytes: Number;
  type: String;
  etag: String;
  placeholder: Boolean;
  url: String;
  secure_url: String;
}