import { v4 as uuidv4 } from "uuid";

export class GenerateIdAdapter {
  execute() {
    return uuidv4();
  }
}
