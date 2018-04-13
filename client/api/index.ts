import { APIType } from "server/api";

export const enum ErrorType {
  JSON_PARSE_ERROR = "JSON_PARSE_ERROR",
  FETCH_ERROR = "FETCH_ERROR",
  NON_200_STATUS_CODE = "NON_200_STATUS_CODE"
}

interface BadEndpointResponse<T> {
  response: Response | null;
  error: Error | null;
  errorType: ErrorType | null;
  statusCode: number | null;
  result: T | null;
}

interface OkEndpointResponse<T> {
  response: Response;
  error: null;
  errorType: null;
  statusCode: number;
  result: T;
}

type EndpointResponse<T = any> = OkEndpointResponse<T> | BadEndpointResponse<T>;

// prettier-ignore
type MapFn<Fn, R> = Fn extends (a: infer A) => any ? (arg1: A) => R
  : Fn extends (a: infer A, b: infer B) => any ? (arg1: A, arg2: B) => R
  : Fn extends (a: infer A, b: infer B, c: infer C) => any ? (arg1: A, arg2: B, arg3: C) => R
  : Fn extends (a: infer A, b: infer B, c: infer C, d: infer D) => any ? (arg1: A, arg2: B, arg3: C, arg4: D) => R
  : Fn extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E) => any ? (arg1: A, arg2: B, arg3: C, arg4: D, arg5: E) => R
  : (...args: any[]) => R;

type Unpromised<T> = T extends Promise<infer U> ? U : T;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : T;
type ClientEndpoint<T> = MapFn<T, EndpointResponse<Unpromised<ReturnType<T>>>>;

const endpoints = new Map<string, Function>();

export const api = new Proxy({}, { get }) as {
  readonly [P in keyof APIType]: ClientEndpoint<APIType[P]>
};

export function isOk<T>(
  endpointResponse: EndpointResponse<T>
): endpointResponse is OkEndpointResponse<T> {
  return endpointResponse.error === null;
}

function get(_: any, path: string) {
  if (!endpoints.has(path)) {
    endpoints.set(path, createEndpoint(path));
  }

  return endpoints.get(path);
}

function createEndpoint(path: string) {
  return async (...args: any[]): Promise<EndpointResponse> => {
    let response: Response | null = null;

    try {
      response = await fetch(`http://10.10.30.129:3000/${path}`, {
        method: "POST",
        body: JSON.stringify(args),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      });
    } catch (error) {
      console.log(error);
      return {
        response: null,
        error,
        errorType: ErrorType.FETCH_ERROR,
        statusCode: null,
        result: null
      };
    }

    let result: any = null;

    try {
      result = await response.json();
    } catch (error) {
      return {
        response,
        error,
        errorType: ErrorType.JSON_PARSE_ERROR,
        statusCode: response.status,
        result: null
      };
    }

    if (response.status < 200 || response.status > 299) {
      return {
        response,
        error: new Error(ErrorType.NON_200_STATUS_CODE),
        errorType: ErrorType.NON_200_STATUS_CODE,
        statusCode: response.status,
        result
      };
    }

    return {
      response,
      error: null,
      errorType: null,
      statusCode: response ? response.status : null,
      result
    };
  };
}
