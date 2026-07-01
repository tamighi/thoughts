export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown,
  ) {
    super(message);
  }
}

type Json =
  | Record<string, unknown>
  | unknown[]
  | string
  | number
  | boolean
  | null;

export class AbstractApi {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async request<T>(url: string, init: RequestInit = {}): Promise<T> {
    const res = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
    });

    const text = await res.text();
    const body = text ? (this.safeJson(text) as Json) : null;

    if (!res.ok) {
      throw new ApiError(`Request failed: ${res.status}`, res.status, body);
    }

    return body as T;
  }

  private safeJson(text: string) {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  protected queryToSearchParams(query: object) {
    const searchParams = new URLSearchParams(
      Object.entries(query)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => [k, String(v)]),
    );

    return searchParams.toString();
  }
}
