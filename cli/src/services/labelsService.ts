import { config } from "@/config";
import type { CreateLabelDto, Label } from "@/types/label";
import { AbstractApi } from "./abstractApi";

class LabelsService extends AbstractApi {
  constructor() {
    super(`${config.apiUrl}/labels`);
  }

  list(): Promise<Label[]> {
    const url = `${this.baseUrl}`;
    return this.request<Label[]>(url);
  }

  create(dto: CreateLabelDto): Promise<Label> {
    return this.request<Label>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(dto),
    });
  }

  delete(id: number): Promise<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.request<void>(url, {
      method: "DELETE",
    });
  }
}

export const labelsService = new LabelsService();
