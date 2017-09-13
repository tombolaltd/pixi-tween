// Type definitions for pixi-tween
// Project: https://github.com/themoonrat/pixi-tween

declare namespace PIXI {
    class Graphics {
        drawPath(path: PIXI.tween.TweenPath): PIXI.Graphics;
    }

    tweenManager: PIXI.tween.TweenManager;

    namespace tween {
        class Tween {
            constructor(target: Object, manager: PIXI.tween.TweenManager);
            readonly active: boolean;
            delay: number;
            easing: PIXI.tween.Easing;
            readonly elapsedTime: number;
            expire: boolean;
            readonly isEnded: boolean;
            readonly isStarted: boolean;
            loop: boolean;
            path: PIXI.tween.TweenPath;
            pathReverse: boolean;
            pingPong: boolean;
            repeat: number;
            time: number;
            addTo(manager: PIXI.tween.TweenManager): PIXI.tween.Tween;
            chain(tween: PIXI.tween.Tween): PIXI.tween.Tween;
            clear(): PIXI.tween.Tween;
            from(data?: Object): PIXI.tween.Tween;
            remove(): PIXI.tween.Tween;
            reset(): PIXI.tween.Tween;
            start(resolve?: Promise<any>): PIXI.tween.Tween;
            startPromise(): Promise<any>;
            stop(end?: boolean): PIXI.tween.Tween;
            to(data: Object): PIXI.tween.Tween;
            update(deltaMS: number);
            once(event: string, fn: () => void, context?: any);
            on(event: string, fn: Function, context?: any);
            off(event: string, fn: Function, context?: any, once?: boolean);
        }

        interface Easing {
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

        class TweenManager {
            constructor();
            tweens: Array<PIXI.tween.Tween>;
            addTween(tween: PIXI.tween.Tween);
            createTween(target: Object): PIXI.tween.Tween;
            getTweensForTarget(target: Object): Array<PIXI.tweenTween>;
            removeTween(tween: PIXI.tween.Tween);
            update(deltaMS: number);
        }

        class TweenPath {
            constructor();
            closed: boolean;
            currentPath: PIXI.GraphicsData;
            dirty: boolean;
            graphicsData: Array<PIXI.GraphicsData>;
            readonly length: number;
            polygon: PIXI.Polygon;
            arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): PIXI.tween.TweenPath;
            arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): PIXI.tween.TweenPath;
            bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): PIXI.tween.TweenPath;
            clear(): PIXI.tween.TweenPath;
            distanceBetween(num1: number, num2: number): number;
            drawShape(shape: Circle | Rectangle | Ellipse | Polygon | RoundedRectangle | any): PIXI.tween.TweenPath;
            getPoint(num: number): PIXI.Point;
            getPointAt(num: number): PIXI.Point;
            getPointAtDistance(distance: number): PIXI.Point;
            lineTo(x: number, y: number): PIXI.tween.TweenPath;
            moveTo(x: number, y: number): PIXI.tween.TweenPath;
            parsePoints(): PIXI.tween.TweenPath;
            quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): PIXI.tween.TweenPath;
            totalDistance(): number;
        }
    }
}

declare module "pixi-tween" {
    export = PIXI.tween;
}
