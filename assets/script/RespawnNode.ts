import { _decorator, Component, instantiate, Node, Prefab, RigidBody2D, Size, UITransform, Vec2, Vec3 } from 'cc';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

@ccclass('RespawnNode')
export class RespawnNode extends Component {
    @property([Prefab])
    public prefabs: Prefab[] = [];

    // @property(Prefab)
    // enemyPrefab: Prefab = null;

    @property(Node)
    spawnParent: Node = null;

    @property
    respawnDelay: number = 0.1; // seconds

    count: number = 0;
    randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    shuffle<T>(arr: T[]): T[] {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    spawnEnemy() {
        if (!this.prefabs || this.prefabs.length === 0) return;
        // If user asks for more than available and you want uniqueness, clamp or error:
        // if (this.count > this.prefabs.length) {
        //     console.warn(`Requested ${count} unique prefabs but only ${this.prefabs.length} types available. Clamping to available.`);
        //     count = this.prefabs.length;
        // }



        if (this.count > 25) {
            return;
        }


        let index = this.randomInt(0, this.prefabs.length - 1);
        console.log(" index {+} " + index);
        const prefab = this.prefabs[index];
        const node = instantiate(prefab);
        node.setPosition(new Vec3(0, 0));
        if (Math.random() < 0.5) {
            node.setScale(new Vec3(0.27, 0.27, 0))
        }
        node.getComponent(RigidBody2D).linearVelocity = new Vec2(5, 0);

        this.spawnParent.addChild(node);
        GameController.instance.spawnedNodes.push(node);
        this.count++;
        // Destroy after some time (optional)
        // enemy.destroy();
        // then respawn:
        this.scheduleOnce(() => {
            this.spawnEnemy();
        }, this.respawnDelay);
    }

    start() {
        // Start the first spawn
        this.spawnEnemy();
    }
}


