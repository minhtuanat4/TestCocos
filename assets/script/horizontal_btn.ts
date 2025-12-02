import { _decorator, Button, CCFloat, Component, EventTouch, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('Horizontal Btn')
export class Player_Horizontal extends Component {

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

