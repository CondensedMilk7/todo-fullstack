export class AuthUtils {
  public static checkToken() {
    const token = localStorage.getItem('access_token');
    return token ? true : false;
  }
}
