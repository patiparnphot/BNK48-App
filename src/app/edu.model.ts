import {Deserializable} from "./deserializable.model";

export class Edu implements Deserializable<Edu> {
    university: String;
    highschool: String;

  deserialize(input: any): Edu {
    Object.assign(this, input);
    return this;
  }
}
