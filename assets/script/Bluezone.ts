import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, RigidBody2D } from 'cc';
import { GlobalEventManager } from './GlobalEventManager';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

@ccclass('Bluezone')
export class Bluezone extends Component {
    private collider: Collider2D = null;



    protected onLoad(): void {

    }
    start() {

        this.collider = this.node.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this.collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        // GlobalEventManager.eventBus.on('onFinishGame', this.onFinishGame, this);
    }
    // onFinishGame() {

    // }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        console.log("Tag:" + otherCollider.tag);

        if (otherCollider.tag == 2) {
            // Target 
            console.log("onBeginContact =============================: " + otherCollider.node.name);
            // console.log("List ==============================",);
            otherCollider.node.getComponent(RigidBody2D).allowSleep = true;
            GameController.instance.insideBlueZones.set(otherCollider.node.uuid, otherCollider.node);

        }
    }


    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when the contact between two colliders just about to end.
        if (otherCollider.tag == 2) {
            // Target 
            console.log("onEndContact =============================: " + otherCollider.node.name);
            otherCollider.node.getComponent(RigidBody2D).allowSleep = false;
            GameController.instance.insideBlueZones.delete(otherCollider.node.uuid);
        }
    }


    update(deltaTime: number) {

    }
}

