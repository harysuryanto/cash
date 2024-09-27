export default class HttpRequestError<T = object> extends Error {
  public readonly response: Response;
  public readonly payload: T | undefined;
  public readonly status: number;

  private getErrorName = (status: number, errorDetail: string | null) => {
    if (errorDetail) {
      console.log(`🔴 Error ${status} with details:\n${errorDetail}`);
      return errorDetail;
    }

    switch (status) {
      case 401:
        return 'Unauthorized';
      case 404:
        return 'Data tidak tersedia';
    }

    if (500 <= status && status < 600) {
      return 'Terjadi kesalahan pada server';
    } else if (400 <= status && status < 500) {
      return `Terjadi kesalahan ${status}`;
    } else {
      return 'Terjadi kesalahan yang tidak diketahui';
    }
  };

  public constructor(response: Response, payload?: T) {
    const msg = `Error: ${response.status}${response.statusText ? `: ${response.statusText}` : ''}`;
    super(msg);

    this.response = response;
    this.payload = payload;
    this.status = response.status;
    this.name = this.getErrorName(response.status, response.headers.get('x-error-detail'));
  }
}
