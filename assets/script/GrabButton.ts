import { _decorator, BoxCollider2D, Button, CCFloat, Collider2D, Component, Contact2DType, IPhysics2DContact, Label, log, Node, RigidBody2D, tween, v3, Vec3 } from 'cc';
import { GlobalEventManager } from './GlobalEventManager';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

@ccclass('GrabButton')
export class GrabButton extends Component {

    @property([Label])
    private label: Label = null;
    private gameController: GameController = GameController.instance;


    protected onLoad(): void {
        this.label = this.node.getComponentInChildren(Label);

    }

    start() {
        GlobalEventManager.eventBus.on('onTimerEnd', this.onClick, this);
        GlobalEventManager.eventBus.on('onTimeChange', this.onTimeChange, this);
        this.registerClick();
    }
    onTimeChange(value: number) {

        if (value <= 0) {
            this.label.string = 'Kết thúc';
        } else {
            this.label.string = 'Grab ' + value.toString();
        }
    }
    registerClick() {
        this.node.on(Button.EventType.CLICK, this.onClick, this);
    }

    public onClick() {

        if (!GameController.instance.isStartGame) {
            return;
        } if (GameController.instance.gameInProcessing) {
            return;
        } else {
            GameController.instance.gameInProcessing = true;
            this.label.string = 'Kết thúc';
            GameController.instance.endTimer();
            GlobalEventManager.eventBus.emit('onStartCliked');
            console.log('Grab Button');
        }

    }

    onResetData() {
        this.label.string = 'Grab';
    }
}

