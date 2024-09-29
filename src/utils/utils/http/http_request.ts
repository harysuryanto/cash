import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import HttpRequestError from "@/src/utils/utils/http/http_request_error";
import { captureEvent } from "@/src/utils/utils/analytics";

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
    if (axios.isAxiosError(error)) {
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
        const headersInit: HeadersInit = Object.entries(
          error.response?.headers!
        );

        // Convert AxiosResponse to Response
        const response = new Response(error.response?.data, {
          status: error.response?.status,
          statusText: error.response?.statusText,
          headers: headersInit,
        });

        captureEvent({
          eventType: "error",
          eventDetails: "http_response",
        });

        throw new HttpRequestError(response, error.response?.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js

        captureEvent({
          eventType: "error",
          eventDetails: "http_request",
        });

        throw new Error("Cannot connect to server.");
      } else {
        // Something happened in setting up the request that triggered an Error

        captureEvent({
          eventType: "error",
          eventDetails: "http_unknown",
        });

        throw new Error(`An error occurred: ${error.message}`);
      }
    }

    throw error;
  }
};

export default fetchData;
