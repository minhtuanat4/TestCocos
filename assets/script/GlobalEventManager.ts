

import { _decorator, Component, EventTarget } from 'cc';
const { ccclass } = _decorator;

@ccclass('GlobalEventManager')
export class GlobalEventManager extends Component {
    public static eventBus: EventTarget = new EventTarget();

    onLoad() {
        // Make this node persistent across scenes if needed
        // game.addPersistRootNode(this.node); 
    }
}