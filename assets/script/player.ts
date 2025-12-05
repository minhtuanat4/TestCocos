import { _decorator, CCFloat, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, RigidBody2D, tween, v3, Vec2, Vec3 } from 'cc';
import { GlobalEventManager } from './GlobalEventManager';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    private collider: Collider2D = null;


    @property(Node)
    private handLeft: Node = null;

    @property(Node)
    private handRight: Node = null;

    @property(CCFloat)
    private moveSpeed: number = 1000;

    protected onLoad(): void {

    }
    minAngleLeft: number = -20;
    maxAngleLeft: number = 42;

    minAngleRight: number = -42;
    maxAngleRight: number = 20;

    duration: number = 0.3

    isDown: boolean = false;

    isUp: boolean = false;


    isGrab: boolean = false;

    start() {
        GlobalEventManager.eventBus.on('onStartCliked', this.onStartClicked, this);
        GlobalEventManager.eventBus.on('onRestartGame', this.onRestartGame, this);
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this.collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }
    onRestartGame() {
        this.revertGrab()
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if (otherCollider.tag == 2) {
            // Target 
            // console.log("Hit object:" + otherCollider.node.name);
            this.isDown = false;
            if (!this.isGrab) {
                this.grab()
            }
        }

        if (otherCollider.tag == 4 && this.isUp) {
            // Limit Height
            this._finishGame();
            console.log("_resetGame");
        }

        if (otherCollider.tag == 2.9) {
            console.log("start left");
            GameController.instance.limitLeft = true;
        }
        if (otherCollider.tag == 3.1) {
            console.log("start right");
            GameController.instance.limitRight = true;
        }

    }
    _finishGame() {
        this.isDown = false;
        this.isUp = false;
        GameController.instance.isFinishGame = true;
        GlobalEventManager.eventBus.emit('onFinishGame');
    }
    grab() {
        this.isGrab = true;
        tween(this.handLeft)
            .to(this.duration, { eulerAngles: v3(0, 0, this.maxAngleLeft) })
            .start();
        tween(this.handRight)
            .to(this.duration, { eulerAngles: v3(0, 0, this.minAngleRight) })
            .call(() => {
                // Turn back to initial position after grab done 
                this.isUp = true;
            })
            .start();


    }

    revertGrab() {
        tween(this.handLeft)
            .to(0.1, { eulerAngles: v3(0, 0, this.minAngleLeft) })
            .start();
        tween(this.handRight)
            .to(0.1, { eulerAngles: v3(0, 0, this.maxAngleRight) })
            .call(() => {
                this.isGrab = false;
            })
            .start();

    }

    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when the contact between two colliders just about to end.
        if (otherCollider.tag == 2.9) {
            console.log("end left");
            GameController.instance.limitLeft = false;
        }
        if (otherCollider.tag == 3.1) {
            console.log("end right");
            GameController.instance.limitRight = false;
        }
    }

    update(deltaTime: number) {
        const currentPosition = this.node.getPosition();
        if (this.isDown) {
            const distanceToMove = this.moveSpeed * deltaTime;
            // this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(
            //     this.node.getComponent(RigidBody2D).linearVelocity.x,
            //     -this.moveSpeed * deltaTime * 0.4,
            // );
            // this.handLeft.getComponent(RigidBody2D).linearVelocity = new Vec2(
            //     this.handLeft.getComponent(RigidBody2D).linearVelocity.x,
            //     -this.moveSpeed * deltaTime * 0.4,
            // );
            // this.handRight.getComponent(RigidBody2D).linearVelocity = new Vec2(
            //     this.handRight.getComponent(RigidBody2D).linearVelocity.x,
            //     -this.moveSpeed * deltaTime * 0.4,
            // );
            const newPosition = new Vec3(
                currentPosition.x,
                currentPosition.y - distanceToMove,
                0
            );
            this.node.y = currentPosition.y - distanceToMove;
        }
        if (this.isUp) {
            const distanceToMove = this.moveSpeed * deltaTime;
            const newPosition = new Vec3(
                currentPosition.x,
                currentPosition.y + distanceToMove,
                0
            );
            this.node.y = currentPosition.y + distanceToMove;
        }

    }
    onStartClicked(eventData: any) {
        console.log('Custom event received!', eventData);
        this.isDown = true;
    }
}

