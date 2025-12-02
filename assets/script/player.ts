import { _decorator, CCFloat, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('player')
export class player extends Component {


    onLoad() {

    }

    // onBackward(data: boolean) {
    //     this.isBackward = true;
    //     this.isPressed = data;
    // }
    // onForward(data: boolean) {
    //     this.isBackward = false;
    //     this.isPressed = data;
    // }


    // update(deltaTime: number) {
    //     if (this.isPressed) {
    //         const distanceToMove = this.isBackward ? - this.moveSpeed : this.moveSpeed * deltaTime;
    //         const currentPosition = this.node.getPosition();

    //         const newPosition = new Vec3(
    //             currentPosition.x + distanceToMove,
    //             currentPosition.y,
    //             currentPosition.z
    //         );
    //         this.node.setPosition(newPosition);
    //     }

    // }
}

