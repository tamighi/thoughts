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

  delete(id: number): Promise<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.request<void>(url, {
      method: "DELETE",
    });
  }
}

export const labelsService = new LabelsService();
