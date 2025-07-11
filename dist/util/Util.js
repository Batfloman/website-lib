import { Polygon2Helper } from "../physic/algorithms/Polygon2Helper";
import { Vector2 } from "../math/Vector2";
export const Util = {
    array: {
        getItem(arr, index) {
            if (index < 0)
                index = arr.length - 1;
            return arr[index % arr.length];
        },
        getLastItem(arr) {
            return arr[-1];
        },
        getRandomItem(arr) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            return arr[randomIndex];
        },
        removeItemAtIndex(arr, index) {
            if (index < 0 || index >= arr.length)
                throw new Error(`${index} is not Valid!`);
            return arr.splice(index, 1)[0];
        },
        removeItem(arr, item) {
            if (!arr.includes(item))
                return undefined;
            return arr.splice(arr.indexOf(item), 1)[0];
        },
        sum(arr) {
            return arr.reduce((a, b) => (a += isNaN(b) ? 0 : b));
        },
        isEmpty(arr) {
            return !arr || arr.length === 0;
        },
        copyOf(arr) {
            return [...arr];
        },
        connectArrays(arrays) {
            let connected = [];
            for (let arr of arrays) {
                connected = connected.concat(arr);
            }
            return connected;
        },
    },
    map: {
        copyOf(map) {
            var newMap = new Map();
            for (let [key, value] of map.entries()) {
                newMap.set(key, value);
            }
            return newMap;
        },
    },
    math: {
        random: {
            between(start, end, num_decimals = 0) {
                return Util.math.round(Math.random() * (end - start) + start, num_decimals);
            },
            mathSign() {
                return Math.random() > 0.5 ? 1 : -1;
            },
        },
        convert: {
            DegToRad(degree) {
                return (degree * Math.PI) / 180;
            },
            RadToDeg(rad) {
                return (180 * rad) / Math.PI;
            },
            percent(percent, value = 1) {
                if (typeof percent === "string") {
                    percent = parseFloat(percent);
                    if (isNaN(percent))
                        throw new Error(`${percent} contains no number`);
                }
                return (percent / 100) * value;
            },
        },
        trigonomitry: {
            cos(degree) {
                return Math.cos(Util.math.convert.DegToRad(degree));
            },
            arccos(num) {
                return Util.math.convert.RadToDeg(Math.acos(num));
            },
        },
        round(number, num_decimals = 0) {
            const factor = Math.pow(10, num_decimals);
            return Math.round(number * factor) / factor;
        },
        floor(number, num_decimals = 0) {
            const factor = Math.pow(10, num_decimals);
            return Math.floor(number * factor) / factor;
        },
        ceil(number, num_decimals = 0) {
            const factor = Math.pow(10, num_decimals);
            return Math.ceil(number * factor) / factor;
        },
    },
    shapes: {
        circle: {
            area(radius) {
                return Math.PI * Math.pow(radius, 2);
            },
            radius(volume) {
                return Math.sqrt(volume / Math.PI);
            },
        },
        polygon: {
            area(polygon) {
                return Polygon2Helper.findArea(polygon);
            },
        },
    },
    object: {
        findClassName(clas) {
            return clas instanceof Function ? clas.name : clas.constructor.name;
        },
        findSuperClassName(clas) {
            return clas instanceof Function
                ? Object.getPrototypeOf(clas).name
                : Object.getPrototypeOf(Object.getPrototypeOf(clas)).constructor.name;
        },
        findClass(clas) {
            return clas instanceof Function ? clas : Object.getPrototypeOf(clas).constructor;
        },
        findSuperClass(clas) {
            return clas instanceof Function
                ? Object.getPrototypeOf(clas)
                : Object.getPrototypeOf(Object.getPrototypeOf(clas)).constructor;
        },
        findAllClassNames(clas) {
            const superClasses = [];
            let currentClass = this.findClass(clas);
            while (currentClass.name != "") {
                superClasses.push(currentClass.name);
                currentClass = this.findSuperClass(currentClass);
            }
            return superClasses;
        },
        findAllClasses(clas) {
            const superClasses = [];
            let currentClass = this.findClass(clas);
            while (currentClass.name != "") {
                superClasses.push(currentClass);
                currentClass = this.findSuperClass(currentClass);
            }
            return superClasses;
        },
        findAllSuperClassNames(clas) {
            const superClasses = [];
            let currentClass = this.findSuperClass(clas);
            while (currentClass.name != "") {
                superClasses.push(currentClass.name);
                currentClass = this.findSuperClass(currentClass);
            }
            return superClasses;
        },
        findAllSuperClasses(clas) {
            const superClasses = [];
            let currentClass = this.findSuperClass(clas);
            while (currentClass.name != "") {
                superClasses.push(currentClass);
                currentClass = this.findSuperClass(currentClass);
            }
            return superClasses;
        },
    },
    position: {
        worldPos_to_staticPos(worldPos, camara) {
            const camaraOffset = camara.getOffset();
            const camaraScale = camara.scaleValue;
            const camaraPos = camara.pos;
            const distance = worldPos.subtract(camaraPos).scale(camaraScale);
            const staticPos = new Vector2(Util.math.round(distance.x, 5), Util.math.round(-distance.y, 5)).add(camaraOffset);
            return staticPos;
        },
        staticPos_to_worldPos(staticPos, camara) {
            const camaraCenter = camara.getOffset();
            const camaraScale = camara.scaleValue;
            const distance = staticPos.subtract(camaraCenter).scale(1 / camaraScale);
            const worldPos = camara.pos.add(new Vector2(Util.math.round(distance.x, 5), Util.math.round(-distance.y, 5)));
            return worldPos;
        },
        convertStaticPosInValue(pos, camara) {
            switch (pos) {
                case "center":
                    return camara.getOffset();
                default:
                    console.warn(pos, " has no case!");
                    return new Vector2();
            }
        },
        convertPercentInValue(canvas, widthPercent, heightPercent) {
            return new Vector2(Util.math.convert.percent(widthPercent, canvas.width), Util.math.convert.percent(heightPercent, canvas.height));
        },
        convertWidthPercentInValue(canvas, percent) {
            const number = (Number.parseFloat(percent) / 100) * canvas.width;
            return isNaN(number) ? 0 : number;
        },
        convertHeightPercentInValue(canvas, percent) {
            const number = (Number.parseFloat(percent) / 100) * canvas.height;
            return isNaN(number) ? 0 : number;
        },
    },
    toVector(angle, lenght) {
        const rad = Util.math.convert.DegToRad(angle);
        return new Vector2(Math.sin(rad) * lenght, Math.cos(rad) * lenght);
    },
    findAngleLine(startPoint, endPoint) {
        const zeroDegreeVector = new Vector2(0, 1);
        const vec = endPoint.subtract(startPoint);
        const dot = zeroDegreeVector.dotProduct(vec);
        const mag1 = zeroDegreeVector.getMagnitude();
        const mag2 = vec.getMagnitude();
        const angle = Util.math.trigonomitry.arccos(dot / (mag1 * mag2));
        return endPoint.x < startPoint.x ? -angle : angle;
    },
    calcHypothenuse(side1, side2) {
        return Math.sqrt(Math.pow(side1, 2) + Math.pow(side2, 2));
    },
    distance(point1, point2) {
        return Util.calcHypothenuse(point1.x - point2.x, point1.y - point2.y);
    },
    closestPoint(mainPoint, points, exclude) {
        let closest = new Vector2(Infinity, Infinity);
        let closestDistance = Infinity;
        points.forEach((point) => {
            if (mainPoint == point)
                return;
            if (exclude instanceof Vector2 && point == exclude)
                return;
            if (exclude instanceof Array && exclude.includes(point))
                return;
            let distance = Util.distance(mainPoint, point);
            if (!closest || !closestDistance || distance < closestDistance) {
                closest = point;
                closestDistance = distance;
            }
        });
        return closest;
    },
    farthestPoint(mainPoint, points, exclude) {
        let farthest = mainPoint;
        let farthestDistance = 0;
        points.forEach((point) => {
            if (mainPoint == point)
                return;
            if (exclude instanceof Vector2 && point == exclude)
                return;
            if (exclude instanceof Array && exclude.includes(point))
                return;
            let distance = Util.distance(mainPoint, point);
            if (distance >= farthestDistance) {
                farthest = point;
                farthestDistance = distance;
            }
        });
        return farthest;
    },
    moveDirection(start, direction, distance) {
        const rad = Util.math.convert.DegToRad(direction);
        const moveX = Math.sin(rad) * distance;
        const moveY = Math.cos(rad) * distance;
        return new Vector2(start.x + moveX, start.y + moveY);
    },
    rotateAroundCenter(center, point, angle) {
        const rad = Util.math.convert.DegToRad(angle);
        return new Vector2(Math.cos(rad) * (point.x - center.x) - Math.sin(rad) * (point.y - center.y) + center.x, Math.sin(rad) * (point.x - center.x) + Math.cos(rad) * (point.y - center.y) + center.y);
    },
};
