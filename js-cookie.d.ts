declare module "js-cookie" {
  interface CookieAttributes {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
  }

  interface CookiesStatic {
    set(name: string, value: string, options?: CookieAttributes): void;
    get(name: string): string | undefined;
    remove(name: string, options?: CookieAttributes): void;
  }

  const Cookies: CookiesStatic;
  export default Cookies;
}
