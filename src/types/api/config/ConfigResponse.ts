import { DTO } from "../../../abstracts/DTO";

export class ConfigResponse extends DTO {
  valorM2: number;

  constructor(defaultValues?: any) {
    super();
    if (defaultValues) {
      this.load(defaultValues, this);
    }
  }

  toDTO() {
    const { valorM2 } = this;
    return {
      valorM2,
    };
  }
}
