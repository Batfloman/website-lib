import { Vector2 } from "./Vector2";

export namespace math {
  export function round(x: number, num_decimals: number = 0): number {
    const factor = Math.pow(10, num_decimals);
    return Math.round(x * factor) / factor;
  }
  export function floor(x: number, num_decimals: number = 0): number {
    const factor = Math.pow(10, num_decimals);
    return Math.floor(x * factor) / factor;
  }
  export function ceil(x: number, num_decimals: number = 0): number {
    const factor = Math.pow(10, num_decimals);
    return Math.ceil(x * factor) / factor;
  }

  export namespace random {
    export function between(start: number, end: number, num_decimals: number = 0): number {
      return round(Math.random() * (end - start) + start, num_decimals);
    }
    // Vorzeichen
    export function sign(): number {
      return Math.random() > 0.5 ? 1 : -1;
    }

  }

  // uses degree instead of the Math. functions
  export namespace trigonometry {
    export function cos(degree: number): number {
      // Math.cos uses radian not degree
      return Math.cos(convert.DegToRad(degree));
    }
    export function arccos(num: number): number {
      return convert.RadToDeg(Math.acos(num));
    }
  }

  export namespace convert {
    export function DegToRad(degree: number) {
      return (degree * Math.PI) / 180;
    }

    export function RadToDeg(rad: number) {
      return (180 * rad) / Math.PI;
    }

    export function percent(percent: number | string, value: number = 1) {
      if (typeof percent === "string") {
        percent = parseFloat(percent);
        if (isNaN(percent)) throw new Error(`${percent} contains no number`);
      }

      return (percent / 100) * value;
    }
  }
}
