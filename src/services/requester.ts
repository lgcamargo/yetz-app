import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(method: string, url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      method,
      url: `${this.baseURL}${url}`,
      data,
      ...config,
    };

    try {
      const response = await axios(requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>('GET', url, null, config);
  }

  public post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>('POST', url, data, config);
  }

  public put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>('PUT', url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>('DELETE', url, null, config);
  }
}

export default ApiClient;