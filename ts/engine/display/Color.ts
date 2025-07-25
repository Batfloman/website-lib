import { Util } from "myutil";

export class Color {
  static none = new Color(0, 0, 0, 0);

  r: number = 0;
  g: number = 0;
  b: number = 0;
  a: number = 100;

  constructor(r: number, g: number, b: number, a: number = 100) {
    this.r = r - (1 % 255) + 1;
    this.g = g - (1 % 255) + 1;
    this.b = b - (1 % 255) + 1;
    this.a = a - (1 % 100) + 1;
  }

  /**
   * @returns {String} - a String "rgb(r, g, bm a)" with r/g/b/a values for rendering
   */
  getRGBString(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a / 100})`;
  }

  setR(r: number) {
    this.r = ((r - 1) % 255) + 1;
  }
  setG(g: number) {
    this.g = ((g - 1) % 255) + 1;
  }
  setB(b: number) {
    this.b = ((b - 1) % 255) + 1;
  }
  setA(a: number) {
    this.a = ((a - 1) % 100) + 1;
  }

  // ==========================================================================================
  // #region static

  static getRandom() {
    return new Color(
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256)
    );
  }

  static getRandomNamedColor() {
    return Util.array.getRandomItem(Array.from(colors.values()));
  }

  static get(color: colors): Color {
    if (!colors.has(color)) {
      console.warn(`${color} is not declared!`);
      return Color.none;
    }

    let c = colors.get(color);
    if (c == undefined) return Color.none;
    return c;
  }

  //#endregion
}

// colors from https://www.w3.org/wiki/CSS/Properties/color/keywords

const colors = new Map<colors, Color>([
  ["aliceblue", new Color(240, 248, 255)],
  ["antiquewhite", new Color(250, 235, 215)],
  ["aqua", new Color(0, 255, 255)],
  ["aquamarine", new Color(127, 255, 212)],
  ["azure", new Color(240, 255, 255)],
  ["beige", new Color(245, 245, 220)],
  ["bisque", new Color(255, 228, 196)],
  ["black", new Color(0, 0, 0)],
  ["blanchedalmond", new Color(255, 235, 205)],
  ["blue", new Color(0, 0, 255)],
  ["blueviolet", new Color(138, 43, 226)],
  ["brown", new Color(165, 42, 42)],
  ["burlywood", new Color(222, 184, 135)],
  ["cadetblue", new Color(95, 158, 160)],
  ["chartreuse", new Color(127, 255, 0)],
  ["chocolate", new Color(210, 105, 30)],
  ["coral", new Color(255, 127, 80)],
  ["cornflowerblue", new Color(100, 149, 237)],
  ["cornsilk", new Color(255, 248, 220)],
  ["crimson", new Color(220, 20, 60)],
  ["cyan", new Color(0, 255, 255)],
  ["darkblue", new Color(0, 0, 139)],
  ["darkcyan", new Color(0, 139, 139)],
  ["darkgoldenrod", new Color(184, 134, 11)],
  ["darkgray", new Color(169, 169, 169)],
  ["darkgreen", new Color(0, 100, 0)],
  ["darkkhaki", new Color(189, 183, 107)],
  ["darkmagenta", new Color(139, 0, 139)],
  ["darkolivegreen", new Color(85, 107, 47)],
  ["darkorange", new Color(255, 140, 0)],
  ["darkorchid", new Color(153, 50, 204)],
  ["darkred", new Color(139, 0, 0)],
  ["darksalmon", new Color(233, 150, 122)],
  ["darkseagreen", new Color(143, 188, 143)],
  ["darkslateblue", new Color(72, 61, 139)],
  ["darkslategray", new Color(47, 79, 79)],
  ["darkturquoise", new Color(0, 206, 209)],
  ["darkviolet", new Color(148, 0, 211)],
  ["deeppink", new Color(255, 20, 14)],
  ["deepskyblue", new Color(0, 191, 255)],
  ["dimgray", new Color(105, 105, 105)],
  ["dodgerblue", new Color(30, 144, 255)],
  ["firebrick", new Color(178, 34, 34)],
  ["floralwhite", new Color(255, 250, 240)],
  ["forestgreen", new Color(34, 139, 34)],
  ["fuchsia", new Color(255, 0, 255)],
  ["gainsboro", new Color(220, 220, 220)],
  ["ghostwhite", new Color(248, 248, 255)],
  ["gold", new Color(255, 215, 0)],
  ["goldenrod", new Color(218, 165, 32)],
  ["gray", new Color(128, 128, 128)],
  ["green", new Color(0, 128, 0)],
  ["greenyellow", new Color(173, 255, 47)],
  ["honeydew", new Color(240, 255, 240)],
  ["hotpink", new Color(255, 105, 180)],
  ["indianred", new Color(205, 92, 92)],
  ["indigo", new Color(75, 0, 130)],
  ["ivory", new Color(255, 255, 240)],
  ["khaki", new Color(240, 230, 140)],
  ["lavender", new Color(230, 230, 250)],
  ["lavenderblush", new Color(255, 240, 245)],
  ["lawngreen", new Color(124, 252, 0)],
  ["lemonchiffon", new Color(255, 250, 205)],
  ["lightblue", new Color(173, 216, 230)],
  ["lightcoral", new Color(240, 128, 128)],
  ["lightcyan", new Color(224, 255, 255)],
  ["lightgoldenrodyellow", new Color(250, 250, 210)],
  ["lightgray", new Color(211, 211, 211)],
  ["lightgreen", new Color(144, 238, 144)],
  ["lightpink", new Color(255, 182, 193)],
  ["lightsalmon", new Color(255, 160, 122)],
  ["lightseagreen", new Color(32, 178, 170)],
  ["lightskyblue", new Color(135, 206, 250)],
  ["lightslategray", new Color(119, 136, 153)],
  ["lightsteelblue", new Color(176, 196, 222)],
  ["lightyellow", new Color(255, 255, 224)],
  ["lime", new Color(0, 255, 0)],
  ["limegreen", new Color(50, 205, 50)],
  ["linen", new Color(250, 240, 230)],
  ["magenta", new Color(255, 0, 255)],
  ["maroon", new Color(128, 0, 0)],
  ["mediumaquamarine", new Color(102, 205, 170)],
  ["mediumblue", new Color(0, 0, 205)],
  ["mediumorchid", new Color(186, 85, 211)],
  ["mediumpurple", new Color(147, 112, 219)],
  ["mediumseagreen", new Color(60, 179, 113)],
  ["mediumslateblue", new Color(123, 104, 238)],
  ["mediumspringgreen", new Color(0, 250, 154)],
  ["mediumturquoise", new Color(72, 209, 204)],
  ["mediumvioletred", new Color(199, 21, 133)],
  ["midnightblue", new Color(25, 25, 112)],
  ["mintcream", new Color(245, 255, 250)],
  ["mistyrose", new Color(255, 228, 225)],
  ["moccasin", new Color(255, 228, 181)],
  ["navajowhite", new Color(255, 222, 173)],
  ["navy", new Color(0, 0, 128)],
  ["oldlace", new Color(253, 245, 230)],
  ["olive", new Color(128, 128, 0)],
  ["olivedrab", new Color(107, 142, 35)],
  ["orange", new Color(255, 165, 0)],
  ["orangered", new Color(255, 69, 0)],
  ["orchid", new Color(218, 112, 214)],
  ["palegoldenrod", new Color(238, 232, 170)],
  ["palegreen", new Color(152, 251, 152)],
  ["paleturquoise", new Color(175, 238, 238)],
  ["palevioletred", new Color(219, 112, 147)],
  ["papayawhip", new Color(255, 239, 213)],
  ["peachpuff", new Color(255, 218, 185)],
  ["peru", new Color(205, 133, 63)],
  ["pink", new Color(255, 192, 203)],
  ["plum", new Color(221, 160, 221)],
  ["powderblue", new Color(176, 224, 230)],
  ["purple", new Color(128, 0, 128)],
  ["red", new Color(255, 0, 0)],
  ["rosybrown", new Color(188, 143, 143)],
  ["royalblue", new Color(65, 105, 225)],
  ["saddlebrown", new Color(139, 69, 19)],
  ["salmon", new Color(250, 128, 114)],
  ["sandybrown", new Color(244, 164, 96)],
  ["seagreen", new Color(46, 139, 87)],
  ["seashell", new Color(255, 245, 238)],
  ["sienna", new Color(160, 82, 45)],
  ["silver", new Color(192, 192, 192)],
  ["skyblue", new Color(135, 206, 235)],
  ["slateblue", new Color(106, 90, 205)],
  ["slategray", new Color(112, 128, 144)],
  ["snow", new Color(255, 250, 250)],
  ["springgreen", new Color(0, 255, 127)],
  ["steelblue", new Color(70, 130, 180)],
  ["tan", new Color(210, 180, 140)],
  ["teal", new Color(0, 128, 128)],
  ["thistle", new Color(216, 191, 216)],
  ["tomato", new Color(255, 99, 71)],
  ["turquoise", new Color(64, 224, 208)],
  ["violet", new Color(238, 130, 238)],
  ["wheat", new Color(245, 222, 179)],
  ["white", new Color(255, 255, 255)],
  ["whitesmoke", new Color(245, 245, 245)],
  ["yellow", new Color(255, 255, 0)],
  ["yellowgreen", new Color(154, 205, 50)],
]);

type colors =
  | "aliceblue"
  | "antiquewhite"
  | "aqua"
  | "aquamarine"
  | "azure"
  | "beige"
  | "bisque"
  | "black"
  | "blanchedalmond"
  | "blue"
  | "blueviolet"
  | "brown"
  | "burlywood"
  | "cadetblue"
  | "chartreuse"
  | "chocolate"
  | "coral"
  | "cornflowerblue"
  | "cornsilk"
  | "crimson"
  | "cyan"
  | "darkblue"
  | "darkcyan"
  | "darkgoldenrod"
  | "darkgray"
  | "darkgreen"
  | "darkkhaki"
  | "darkmagenta"
  | "darkolivegreen"
  | "darkorange"
  | "darkorchid"
  | "darkred"
  | "darksalmon"
  | "darkseagreen"
  | "darkslateblue"
  | "darkslategray"
  | "darkturquoise"
  | "darkviolet"
  | "deeppink"
  | "deepskyblue"
  | "dimgray"
  | "dodgerblue"
  | "firebrick"
  | "floralwhite"
  | "forestgreen"
  | "fuchsia"
  | "gainsboro"
  | "ghostwhite"
  | "gold"
  | "goldenrod"
  | "gray"
  | "green"
  | "greenyellow"
  | "honeydew"
  | "hotpink"
  | "indianred"
  | "indigo"
  | "ivory"
  | "khaki"
  | "lavender"
  | "lavenderblush"
  | "lawngreen"
  | "lemonchiffon"
  | "lightblue"
  | "lightcoral"
  | "lightcyan"
  | "lightgoldenrodyellow"
  | "lightgray"
  | "lightgreen"
  | "lightpink"
  | "lightsalmon"
  | "lightseagreen"
  | "lightskyblue"
  | "lightslategray"
  | "lightsteelblue"
  | "lightyellow"
  | "lime"
  | "limegreen"
  | "linen"
  | "magenta"
  | "maroon"
  | "mediumaquamarine"
  | "mediumblue"
  | "mediumorchid"
  | "mediumpurple"
  | "mediumseagreen"
  | "mediumslateblue"
  | "mediumspringgreen"
  | "mediumturquoise"
  | "mediumvioletred"
  | "midnightblue"
  | "mintcream"
  | "mistyrose"
  | "moccasin"
  | "navajowhite"
  | "navy"
  | "oldlace"
  | "olive"
  | "olivedrab"
  | "orange"
  | "orangered"
  | "orchid"
  | "palegoldenrod"
  | "palegreen"
  | "paleturquoise"
  | "palevioletred"
  | "papayawhip"
  | "peachpuff"
  | "peru"
  | "pink"
  | "plum"
  | "powderblue"
  | "purple"
  | "red"
  | "rosybrown"
  | "royalblue"
  | "saddlebrown"
  | "salmon"
  | "sandybrown"
  | "seagreen"
  | "seashell"
  | "sienna"
  | "silver"
  | "skyblue"
  | "slateblue"
  | "slategray"
  | "snow"
  | "springgreen"
  | "steelblue"
  | "tan"
  | "teal"
  | "thistle"
  | "tomato"
  | "turquoise"
  | "violet"
  | "wheat"
  | "white"
  | "whitesmoke"
  | "yellow"
  | "yellowgreen";
