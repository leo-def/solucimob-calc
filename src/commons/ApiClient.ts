import axios, { AxiosRequestConfig } from 'axios'

export class ApiClient {
    static async getClient(config: any) {
      return axios.create({
        ...config,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      } as AxiosRequestConfig)
    }
  }