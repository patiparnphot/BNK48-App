import {Edu} from "./edu.model";
import {Author} from "./author.model";
import {Comment} from "./comment.model";
import {Deserializable} from "./deserializable.model";

export class Idol  implements Deserializable<Idol> {
  _id: number;
  firstname: String;
  lastname: String;
  nickname: String;
  aka: String;
  height: Number;
  bloodgroup: String;
  address: String;
  favcolor: String;
  favfood: String;
  hobby: String;
  lang: String;
  edu: Edu;
  image: String;
  description: String;
  createdAt: String;
  author: Author;
  comments: Comment[];
  
  deserialize(input: any): Idol {
    Object.assign(this, input);
    this.edu = new Edu().deserialize(input.edu);
    this.author = new Author().deserialize(input.author);
    this.comments = input.comments.map(comment => new Comment().deserialize(comment));
    return this;
  }
}

export class Idols  implements Deserializable<Idols> {
  _id: number;
  firstname: String;
  lastname: String;
  nickname: String;
  aka: String;
  height: Number;
  bloodgroup: String;
  address: String;
  favcolor: String;
  favfood: String;
  hobby: String;
  lang: String;
  edu: Edu;
  image: String;
  description: String;
  createdAt: String;
  author: Author;
  comments: any;
  
  deserialize(input: any): Idols {
    Object.assign(this, input);
    this.edu = new Edu().deserialize(input.edu);
    this.author = new Author().deserialize(input.author);
    return this;
  }
}

export class Idolform  implements Deserializable<Idolform> {
  firstname: String;
  lastname: String;
  nickname: String;
  aka: String;
  height: Number;
  bloodgroup: String;
  address: String;
  favcolor: String;
  favfood: String;
  hobby: String;
  lang: String;
  edu: Edu;
  image: any;
  description: String;
  
  deserialize(input: any): Idolform {
    Object.assign(this, input);
    this.edu = new Edu().deserialize(input.edu);
    return this;
  }
}
