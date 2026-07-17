import { config } from "@/config";
import { AbstractApi } from "./abstractApi";
import type {
  CreateHighlightDto,
  Highlight,
  UpdateHighlightDto,
} from "@/types/highlight";

class HighlightsService extends AbstractApi {
  constructor() {
    super(`${config.apiUrl}/highlights`);
  }

  create(dto: CreateHighlightDto): Promise<Highlight> {
    return this.request<Highlight>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(dto),
    });
  }

  update(id: number, dto: UpdateHighlightDto): Promise<Highlight> {
    return this.request<Highlight>(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dto),
    });
  }

  delete(id: number): Promise<void> {
    return this.request<void>(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
  }
}

export const highlightsService = new HighlightsService();
