import fetch, { RequestInit, Response } from 'node-fetch';

export class Api {
  static post(url: string, options: RequestInit): Promise<Response> {
    return fetch(url, {
      ...options,
      method: 'POST',
    });
  }
  static async postJson<R>(url: string, options: RequestInit): Promise<R> {
    const res = await Api.post(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    if (res.ok) {
      return json as R;
    } else {
      throw new Error(res.statusText);
    }
  }
}
