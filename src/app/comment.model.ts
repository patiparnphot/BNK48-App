import {Author} from "./author.model";
import {Deserializable} from "./deserializable.model";

export class Comment  implements Deserializable<Comment> {
  _id: any;
  text: String;
  createdAt: String;
  author: Author;
    
  deserialize(input: any): Comment {
    Object.assign(this, input);
    this.author = new Author().deserialize(input.author);
    return this;
  }
}

export class Commentform  {
  text: String;
}
