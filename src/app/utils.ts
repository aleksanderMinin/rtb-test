export class Utils {

  static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  static randomString(lenght: number, local: boolean = false): string {
      const possible = "abcdefghijklmnopqrstuvwxyz0123456789.!$&*-=^`|~#%'+/?_{}";
      var text = "";

      for (var i = 0; i < lenght; i++)
        text += possible.charAt(Math.floor(Math.random() * (local ? possible.length : (possible.length - 19))));

      return text;
  }
}