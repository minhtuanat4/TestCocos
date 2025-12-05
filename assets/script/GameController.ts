import { _decorator, Component, director, Node, RigidBody2D } from 'cc';
import { GrabButton } from './GrabButton';
import { GlobalEventManager } from './GlobalEventManager';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    private static _instance: GameController | null = null;

    @property(Node)
    private restartAgain: Node;

    public static get instance(): GameController {
        if (!this._instance) {
            console.warn("[GameController] Singleton is not ready yet!");
        }
        return this._instance!;
    }

    onLoad() {
        GameController._instance = this;
    }
    public time: number = 15;

    public gameInProcessing: boolean = false;

    public insideBlueZones: Map<string, Node> = new Map();

    public isStartGame: boolean = false;

    public isFinishGame: boolean = false;

    public limitLeft: boolean = false;

    public limitRight: boolean = false;

    public spawnedNodes: Node[] = [];
    start() {
        GlobalEventManager.eventBus.on('onFinishGame', this.onFinishGame, this);

    }
    onFinishGame() {
        this.restartAgain.active = true;
        this.insideBlueZones.forEach((value, key) => {
            // console.log("insideBlueZones =============================: " + value.name + key);
            value.getComponent(RigidBody2D).allowSleep = true;
        });
    }

    update(deltaTime: number) {

    }

    startCountDown() {
        this.time = 15;
        this.schedule(this.callBackCountTime, 1);
    }


    restartCountDown() {
        this.time = 15;
        this.schedule(this.callBackCountTime, 1);
    }

    callBackCountTime() {
        this.time--;
        GlobalEventManager.eventBus.emit('onTimeChange', this.time);
        if (this.time <= 0) {
            GlobalEventManager.eventBus.emit('onTimerEnd');
        }

    };

    endTimer() {
        this.unschedule(this.callBackCountTime);
        this.time = 0;
    }

    restartGame() {
        console.log("insideBlueZones length =============================: " + this.insideBlueZones.size.toString());
        this.insideBlueZones.forEach((value, key) => {
            console.log("Point =============================: " + value.name + key);
            // value.destroy();
        });

        director.loadScene("assets/scenes/Main.scene");
        // this.spawnedNodes.forEach((e) => {
        //     e.destroy();
        // })
        // this.insideBlueZones.clear();
        // this.isStartGame = true;
        // this.startCountDown();
        // GameController.instance.gameInProcessing = false;
        // GlobalEventManager.eventBus.emit('onRestartGame');
    }
}

