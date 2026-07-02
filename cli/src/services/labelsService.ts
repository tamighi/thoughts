import { config } from "@/config";
import type { CreateLabelDto, ILabel } from "@/types/label";
import { AbstractApi } from "./abstractApi";

class LabelsService extends AbstractApi {
  constructor() {
    super(`${config.apiUrl}/labels`);
  }

  list(): Promise<ILabel[]> {
    const url = `${this.baseUrl}`;
    return this.request<ILabel[]>(url);
  }

  create(dto: CreateLabelDto): Promise<ILabel> {
    return this.request<ILabel>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(dto),
    });
  }
}

export const labelsService = new LabelsService();
