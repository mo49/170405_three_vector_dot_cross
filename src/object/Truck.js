import * as THREE from 'three';

/**
 * トロッコクラスです。
 */
export default class Truck extends THREE.Object3D {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // 本体
    let body = new THREE.Mesh(
      new THREE.BoxGeometry(6, 3, 3),
      new THREE.MeshPhongMaterial({
        color: 0xCCCCCC
      })
    );
    this.add(body);

    // 車輪１
    let wheel1 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1, 1, 4, 10),
      new THREE.MeshPhongMaterial({
        color: 0xFFFF00
      })
    );
    wheel1.rotation.x = 90 * Math.PI / 180;
    wheel1.position.y = -2;
    wheel1.position.x = -2;
    this.add(wheel1);

    // 車輪２
    let wheel2 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1, 1, 4, 10),
      new THREE.MeshPhongMaterial({
        color: 0xFFFF00
      })
    );
    wheel2.rotation.x = 90 * Math.PI / 180;
    wheel2.position.y = -2;
    wheel2.position.x = 2;
    this.add(wheel2);
  }

  /**
   * フレーム毎の更新をします。
   */
  update() {

  }
}
