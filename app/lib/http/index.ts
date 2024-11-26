/* eslint-disable @typescript-eslint/no-explicit-any */
type ReqInterceptor = [(init: RequestInit) => RequestInit, (err: any) => any];
type ResInterceptor = [
  (init: Response) => Response | Promise<Response>,
  (err: any) => any
];

interface Interceptor {
  req: ReqInterceptor[];
  res: ResInterceptor[];
}

export class Http {
  private interceptor: Interceptor;
  baseURL: string;
  constructor() {
    this.interceptor = {
      req: [],
      res: [],
    };
    this.baseURL = "";
  }

  private async request(req: RequestInfo | URL, init: RequestInit = {}) {
    req = new URL(req as URL | string, this.baseURL);
    const reqLen = this.interceptor.req.length;
    for (let i = 0; i < reqLen; i++) {
      const [onFulfilled, onRejected] = this.interceptor.req[i];
      try {
        init = onFulfilled(init);
      } catch (error) {
        onRejected(error);
        break;
      }
    }
    let promise = fetch(req, init);
    const resLen = this.interceptor.res.length;
    for (let i = 0; i < resLen; i++) {
      const [onFulfilled, onRejected] = this.interceptor.res[i];
      promise = promise.then(onFulfilled, onRejected);
    }

    return promise;
  }

  async get(req: RequestInfo | URL, init?: RequestInit) {
    if (!init) {
      init = {};
    }
    init.method = "GET";
    const response = await this.request(req, init);
    return response;
  }

  async post(req: RequestInfo | URL, init?: RequestInit) {
    if (!init) {
      init = {};
    }
    init.method = "POST";
    const response = await this.request(req, init);
    return response;
  }

  async delete(req: RequestInfo | URL, init?: RequestInit) {
    if (!init) {
      init = {};
    }
    init.method = "DELETE";
    const response = await this.request(req, init);
    return response;
  }

  async patch(req: RequestInfo | URL, init?: RequestInit) {
    if (!init) {
      init = {};
    }
    init.method = "PATCH";
    const response = await this.request(req, init);
    return response;
  }

  async put(req: RequestInfo | URL, init?: RequestInit) {
    if (!init) {
      init = {};
    }
    init.method = "PUT";
    const response = await this.request(req, init);
    return response;
  }

  addReqInterceptor(interceptor: ReqInterceptor) {
    this.interceptor.req.push(interceptor);
  }
  addResInterceptor(interceptor: ResInterceptor) {
    this.interceptor.res.push(interceptor);
  }
}

export class HttpLibs {
  static async toJson<T>(response: Response) {
    return response.json() as T;
  }
}
