import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import curlirize from "axios-curlirize";

import HttpRequestError from "@/src/utils/utils/http/http_request_error";
import { captureEvent } from "@/src/utils/utils/analytics";

curlirize(axios, (result, err) => {
  // Logs every http requests
  // console.log(result.command);
});

export const generalAxiosConfig = {
  timeout: 20000,
  timeoutErrorMessage: "20 second timeout exceeded. Please try again.",
} satisfies AxiosRequestConfig;

const fetchData = async <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T, any>> => {
  const mergedConfig = {
    ...generalAxiosConfig,
    ...config,
  };

  try {
    return await axios<T, AxiosResponse<T, any>, any>(mergedConfig);
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;

    // @ts-ignore
    const curl = error.config?.curlCommand;
    let errorType: "response" | "request" | "unknown";
    let errorTypeDescription: string;
    let errorToThrow: unknown;

    if (__DEV__ && error.response?.data !== undefined) {
      console.log(
        `🔴 ${error.response.config.method?.toUpperCase()} ${
          error.response.config.url
        } ${error.response.status}`,
        error.response.data["message"]
      );
    }

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      // Convert Axios response headers to the format compatible with HeadersInit
      const headersInit: HeadersInit = Object.entries(error.response?.headers!);

      // Convert AxiosResponse to Response
      const response = new Response(error.response?.data, {
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: headersInit,
      });

      errorType = "response";
      errorTypeDescription = "Server responded with a non-2xx status code.";
      errorToThrow = new HttpRequestError(response, error.response?.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      errorType = "request";
      errorTypeDescription = "Cannot connect to server.";
      errorToThrow = new Error("Cannot connect to server.");
    } else {
      // Something happened in setting up the request that triggered an Error

      errorType = "unknown";
      errorTypeDescription = "An unknown error occurred: " + error.message;
      errorToThrow = new Error(`An error occurred: ${error.message}`);
    }

    captureEvent({
      eventType: "error",
      eventDetails: "http",
      properties: {
        errorType,
        errorTypeDescription,
        error: errorToThrow,
        curl,
      },
    });

    throw errorToThrow;
  }
};

export default fetchData;
