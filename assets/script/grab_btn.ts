import { _decorator, BoxCollider2D, Button, CCFloat, Collider2D, Component, Contact2DType, IPhysics2DContact, Label, log, Node, tween, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('grab_btn')
export class grab_btn extends Component {

    @property(Node)
    private handLeft: Node = null;

    @property(Node)
    private handRight: Node = null;

    @property(Node)
    private blueRange: Node = null;

    @property(Node)
    private headZone: Node = null;

    @property(Node)
    private player: Node = null;

    @property(Label)
    private label: Label = null

    private time: number = 15;


    private maxHieght: number = 0;
    @property(CCFloat)
    private moveSpeed: number = 500;


    minAngleLeft: number = 0;
    maxAngleLeft: number = 30;

    minAngleRight: number = -30;
    maxAngleRight: number = 0;

    duration: number = 0.3

    startGrab: boolean = false;

    releaseGrab: boolean = false;

    isDown: boolean = false;

    isUp: boolean = false;

    blueRangeCollier: Collider2D = null;

    isStartGame: boolean = false;




    protected onLoad(): void {
        this.maxHieght = this.player.getPosition().y;
        console.log('onLoad called — component attached and script loaded');
        this.blueRangeCollier = this.blueRange.getComponent(Collider2D);
        const headZoneCollider = this.headZone.getComponent(Collider2D);
        if (this.blueRangeCollier) {
            this.blueRangeCollier.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this.blueRangeCollier.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        if (headZoneCollider) {
            headZoneCollider.on(Contact2DType.BEGIN_CONTACT, this.headZoneBeginContact, this);
            headZoneCollider.on(Contact2DType.END_CONTACT, this.headZoneEndContact, this);
        }
    }

    start() {
        this.registerClick();
        this.startCountDown();
    }

    registerClick() {
        this.node.on(Button.EventType.CLICK, this.onClick, this);
    }

    onClick() {
        if (this.time > 0) {
            this.isStartGame = true;
            this.isDown = true;
            this.endTimer();
        }
    }
    callBackCountTime() {
        this.time--;
        this.label.string = this.time.toString();
        if (this.time <= 0) {
            if (this.isStartGame) {
                return;
            }
            this.isStartGame = true;
            this.isDown = true;
            this.endTimer();
        }

    };
    endTimer() {

        this.unschedule(this.callBackCountTime);
        this.time = 0;
        this.label.string = "Clicked ";
    }

    startCountDown() {

        this.label.string = this.time.toString();
        this.schedule(this.callBackCountTime, 1);
    }
    restartCountDown() {
        this.time = 15;
        this.label.string = this.time.toString();
        this.schedule(this.callBackCountTime, 1);
    }


    headZoneBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        this._resetGame();
    }
    headZoneEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

    }


    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact

        this.blueRangeCollier.enabled = false;
        this.isDown = false; this.startGrab = true;
        this.grab()
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when the contact between two colliders just about to end.
        console.log('onEndContact');
    }


    update(deltaTime: number) {
        console.log('deltaTime');

        if (!this.isStartGame) {
            return;
        }
        const currentPosition = this.player.getPosition();
        if (this.isDown) {
            const distanceToMove = this.moveSpeed * deltaTime;

            const newPosition = new Vec3(
                currentPosition.x,
                currentPosition.y - distanceToMove,
                currentPosition.z
            );
            this.player.setPosition(newPosition);
        }
        if (this.isUp) {
            const distanceToMove = this.moveSpeed * deltaTime;
            const newPosition = new Vec3(
                currentPosition.x,
                Math.min(currentPosition.y + distanceToMove, this.maxHieght),
                currentPosition.z
            );
            this.player.setPosition(newPosition);
        }

        // if (currentPosition.y > this.maxHieght) {
        //     this._resetGame();

        // }

        // if (this.startGrab) {
        //     this.grab();
        // }
        // if (this.releaseGrab) {
        //     this.revertGrab();
        // }

    }

    grab() {
        this.startGrab = false;
        tween(this.handLeft)
            .to(this.duration, { eulerAngles: v3(0, 0, this.maxAngleLeft) })
            .union()
            .start();
        tween(this.handRight)
            .to(this.duration, { eulerAngles: v3(0, 0, this.minAngleRight) })

            .union()
            .start();

        this.scheduleOnce(function () {
            this.isUp = true;
        }, this.duration);
    }
    revertGrab() {
        tween(this.handLeft)
            .to(this.duration, { eulerAngles: v3(0, 0, this.minAngleLeft) })
            .union()
            .start();
        tween(this.handRight)
            .to(this.duration, { eulerAngles: v3(0, 0, this.maxAngleRight) })

            .union()
            .start();
    }
    _resetGame() {
        // this.isStartGame = false;
        this.isDown = false;
        this.isUp = false;
        this.revertGrab();
        this.restartCountDown();

    }
}

