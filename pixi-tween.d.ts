/// <reference types="pixi.d.ts" />

interface on {
	end?: Function;
	pingpong?: Function;
	repeat?: Function;
	start?: Function;
	stop?: Function;
	update?: Function;
}

declare namespace PIXI {
	interface Graphics {
		drawPath(path: PIXI.tween.TweenPath): PIXI.Graphics;
	}
}

declare namespace PIXI.tween {
	const Easing: {
		inBack(v?: number): Function;
		inBounce(): Function;
		inCirc(): Function;
		inCubic(): Function;
		inElastic(a?: number, p?: number): Function;
		inExpo(): Function;
		inOutBack(v?: number): Function;
		inOutBounce(): Function;
		inOutCirc(): Function;
		inOutCubic(): Function;
		inOutElastic(a?: number, p?: number): Function;
		inOutExpo(): Function;
		inOutQuad(): Function;
		inOutQuart(): Function;
		inOutQuint(): Function;
		inOutSine(): Function;
		inQuad(): Function;
		inQuart(): Function;
		inQuint(): Function;
		inSine(): Function;
		linear(): Function;
		outBack(v?: number): Function;
		outBounce(): Function;
		outCirc(): Function;
		outCubic(): Function;
		outElastic(a?: number, p?: number): Function;
		outExpo(): Function;
		outQuad(): Function;
		outQuart(): Function;
		outQuint(): Function;
		outSine(): Function;
	}

	export interface tweenConfig {
		from?: object;
		to?: object;
		delay?: number;
		easing?: Function | string;
		loop?: boolean;
		path?: object;
		pathReverse?: boolean;
		pingPong?: boolean;
		repeat?: number;
		time?: number;
		on?: on;
		speed?: number;
	}

	class Tween {
		constructor(target: object, manager?: PIXI.tween.TweenManager, config?: PIXI.tween.tweenConfig);
		readonly active: boolean;
		delay: number;
		easing: Function;
		readonly elapsedTime: number;
		readonly isEnded: boolean;
		readonly isStarted: boolean;
		loop: boolean;
		path: PIXI.tween.TweenPath;
		pathReverse: boolean;
		pingPong: boolean;
		repeat: number;
		time: number;
		progress: number;
		speed: number;
		chain(tween: PIXI.tween.Tween): PIXI.tween.Tween;
		clear(): PIXI.tween.Tween;
		config(config: PIXI.tween.tweenConfig): PIXI.tween.Tween;
		from(data?: object): PIXI.tween.Tween;
		remove(): PIXI.tween.Tween;
		reset(): PIXI.tween.Tween;
		start(resolve?: Promise<any>): PIXI.tween.Tween;
		startPromise(): Promise<any>;
		stop(end?: boolean): PIXI.tween.Tween;
		to(data: object): PIXI.tween.Tween;
		update(deltaMS: number): void;
		once(event: "start" | "end" | "repeat" | "update" | "stop" | "pingpong", fn: Function, context?: any): void;
		on(event: "start" | "end" | "repeat" | "update" | "stop" | "pingpong", fn: Function, context?: any): void;
		off(event: "start" | "end" | "repeat" | "update" | "stop" | "pingpong", fn: Function, context?: any, once?: boolean): void;
	}

	class TweenPath extends PIXI.Graphics {
		constructor();
		dirty: boolean;
		readonly length: number;
		polygon: PIXI.Polygon;
		clear(): PIXI.tween.TweenPath;
		distanceBetween(num1: number, num2: number): number;
		getPoint(num: number): PIXI.Point;
		getPointAt(num: number): PIXI.Point;
		getPointAtDistance(distance: number): PIXI.Point;
		parsePoints(): PIXI.tween.TweenPath;
		totalDistance(): number;

		arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): PIXI.tween.TweenPath;
		arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): PIXI.tween.TweenPath;
		bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): PIXI.tween.TweenPath;
		drawCircle(x: number, y: number, radius: number): PIXI.tween.TweenPath;
		drawEllipse(x: number, y: number, width: number, height: number): PIXI.tween.TweenPath;
		drawRect(x: number, y: number, width: number, height: number): PIXI.tween.TweenPath;
		drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): PIXI.tween.TweenPath;
		drawPolygon(path: number[] | PIXI.Point[] | PIXI.Polygon): PIXI.tween.TweenPath;
		drawShape(shape: PIXI.Circle | PIXI.Ellipse | PIXI.Polygon | PIXI.Rectangle | PIXI.RoundedRectangle): PIXI.tween.TweenPath;
		drawStar(x: number, y: number, points: number, radius: number, innerRadius?: number, rotation?: number): PIXI.tween.TweenPath;
		lineTo(x: number, y: number): PIXI.tween.TweenPath;
		moveTo(x: number, y: number): PIXI.tween.TweenPath;
		quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): PIXI.tween.TweenPath;
	}

	class TweenManager {
		constructor();
		tweens: Array<PIXI.tween.Tween>;
		addTween(tween: PIXI.tween.Tween): void;
		createTween(target: object, config?: PIXI.tween.tweenConfig): PIXI.tween.Tween;
		getTweensForTarget(target: object): Array<PIXI.tween.Tween>;
		removeTween(tween: PIXI.tween.Tween): void;
		update(deltaMS: number): void;
	}

	const tweenManager: PIXI.tween.TweenManager;
}

declare module "pixi-tween" {
	export = PIXI.tween;
}
