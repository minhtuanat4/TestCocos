import { _decorator, Button, Component, Node } from 'cc';
import { GameController } from './GameController';
import { GlobalEventManager } from './GlobalEventManager';
const { ccclass, property } = _decorator;

@ccclass('StartButton')
export class StartButton extends Component {
    start() {
        this.registerClick();
    }
    registerClick() {
        this.node.on(Button.EventType.CLICK, this.onClick, this);
    }

    public onClick() {
        if (GameController.instance.isStartGame) {
            return;
        } else {
            GameController.instance.isStartGame = true;
            GameController.instance.startCountDown();
            console.log('Start Game Button');
        }
    }
}

