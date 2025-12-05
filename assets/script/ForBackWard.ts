import { _decorator, CCFloat, Component, EventTouch, Node, Vec3 } from 'cc';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

@ccclass('ForBackWard')
export class ForBackWard extends Component {
    @property(Node)
    private player: Node = null

    @property(CCFloat)
    private moveSpeed: number = 140;


    @property(Number)
    private horizontalType: number = 1;

    private maxWidth: number = 100;

    private minWidth: number = 0;

    private isPressed: boolean = false;

    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.onPressStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.onPressEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onPressCancel, this);
        if (this.horizontalType <= 0) {
            this.moveSpeed = this.moveSpeed * -1;
        }

    }

    onPressStart(event: EventTouch) {
        if (!GameController.instance.isStartGame) {
            return;
        }
        if (GameController.instance.gameInProcessing) {
            return;
        }

        this.isPressed = true;
    }

    onPressEnd(event: EventTouch) {
        this.resetState();
    }

    onPressCancel(event: EventTouch) {
        this.resetState();
    }

    resetState() {
        this.isPressed = false;
    }
    update(deltaTime: number) {
        if (this.horizontalType <= 0 && GameController.instance.limitLeft) {
            return;
        }
        if (this.horizontalType > 0 && GameController.instance.limitRight) {
            return;
        }
        if (this.isPressed) {
            const distanceToMove = this.moveSpeed * deltaTime;
            const currentPosition = this.player.getPosition();

            const newPosition = new Vec3(
                currentPosition.x + distanceToMove,
                currentPosition.y,
                currentPosition.z
            );
            this.player.setPosition(newPosition);
        }
    }
}

