import { _decorator, Button, Component, Node } from 'cc';
import { GameController } from './GameController';
import { GlobalEventManager } from './GlobalEventManager';
const { ccclass, property } = _decorator;

@ccclass('RestartButton')
export class RestartButton extends Component {
    start() {
        this.registerClick();
        // GlobalEventManager.eventBus.on('onFinishGame', this.onFinishGame, this);

    }
    registerClick() {
        this.node.on(Button.EventType.CLICK, this.onClick, this);
    }
    // onFinishGame() {
    //     this.node.active = true;
    //     console.log('ReStart ReStart onFinishGame');
    // }

    public onClick() {
        console.log('ReStart ReStart Game');
        this.node.active = false;
        this.scheduleOnce(() => {
            GameController.instance.restartGame();
        }, 1);
    }
}

