import {Deserializable} from "./deserializable.model";

export class Author implements Deserializable<Author> {
  id: number;
  username: string;
  
  deserialize(input: any): Author {
    Object.assign(this, input);
    return this;
  }
}
