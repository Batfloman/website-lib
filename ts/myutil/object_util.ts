export namespace array {
	export function getItemCyclic<T>(arr: T[], index: number): T {
		const wrappedIndex = ((index % arr.length) + arr.length) % arr.length;
		return arr[wrappedIndex];
	}

	export function getLastItem<T>(arr: T[]): T {
		return arr[-1];
	}

	export function getRandomItem<T>(arr: T[]): T {
		const randomIndex = Math.floor(Math.random() * arr.length);
		return arr[randomIndex];
	}

	export function removeItemAtIndex<T>(arr: T[], index: number): T {
		if (index < 0 || index >= arr.length) throw new Error(`${index} is not Valid!`);

		return arr.splice(index, 1)[0];
	}

	export function removeItem<T>(arr: T[], item: T): T | undefined {
		if (!arr.includes(item)) return undefined;

		return arr.splice(arr.indexOf(item), 1)[0];
	}

	export function sum(arr: number[]): number {
		return arr.reduce((a, b) => (a += isNaN(b) ? 0 : b));
	}

	export function isEmpty<T>(arr: T[]): boolean {
		return !arr || arr.length === 0;
	}

	export function copyOf<T>(arr: T[]): T[] {
		return [...arr];
	}

	export function connectArrays<T>(arrays: T[]): T[] {
		let connected: T[] = [];
		for (let arr of arrays) {
			connected = connected.concat(arr);
		}
		return connected;
	}
}

export namespace map {
	export function copyOf<K, V>(map: Map<K, V>): Map<K, V> {
		var newMap = new Map<K, V>();
		for (let [key, value] of map.entries()) {
			newMap.set(key, value);
		}
		return newMap;
	}
}

export namespace object {
	export function findClassName(clas: Object | Function): string {
		return clas instanceof Function ? clas.name : clas.constructor.name;
	}
	export function findSuperClassName(clas: Object | Function): string {
		return clas instanceof Function
			? Object.getPrototypeOf(clas).name
			: Object.getPrototypeOf(Object.getPrototypeOf(clas)).constructor.name;
	}
	export function findClass(clas: Object | Function): Function {
		return clas instanceof Function ? clas : Object.getPrototypeOf(clas).constructor;
	}
	export function findSuperClass(clas: Object | Function): Function {
		// if can't access .constructor => Max superclass Found!
		return clas instanceof Function
			? Object.getPrototypeOf(clas)
			: Object.getPrototypeOf(Object.getPrototypeOf(clas)).constructor;
	}
	export function findAllClassNames(clas: Object | Function): string[] {
		const superClasses: string[] = [];

		let currentClass = object.findClass(clas);
		while (currentClass.name != "") {
			superClasses.push(currentClass.name);
			currentClass = object.findSuperClass(currentClass);
		}
		return superClasses;
	}
	export function findAllClasses(clas: Object | Function): Function[] {
		const superClasses: Function[] = [];

		let currentClass = object.findClass(clas);
		while (currentClass.name != "") {
			superClasses.push(currentClass);
			currentClass = object.findSuperClass(currentClass);
		}

		return superClasses;
	}
	export function findAllSuperClassNames(clas: Object | Function): string[] {
		const superClasses: string[] = [];

		let currentClass = object.findSuperClass(clas);
		while (currentClass.name != "") {
			superClasses.push(currentClass.name);
			currentClass = object.findSuperClass(currentClass);
		}
		return superClasses;
	}
	export function findAllSuperClasses(clas: Object | Function): Function[] {
		const superClasses: Function[] = [];

		let currentClass = object.findSuperClass(clas);
		while (currentClass.name != "") {
			superClasses.push(currentClass);
			currentClass = object.findSuperClass(currentClass);
		}

		return superClasses;
	}
}
