import * as THREE from 'three';

export default class Cube extends THREE.Object3D {

  static ROTATION_SPEED = 100;
  _angle = 0;

  constructor() {
    super();

    const cube = new THREE.Mesh(
      new THREE.CubeGeometry(10, 10, 10),
      new THREE.MeshLambertMaterial({ color: 0xFBBC05 })
    );
    cube.position.set(
      Math.random()*20,
      Math.random()*20,
      Math.random()*20,
    )
    this.add(cube);
  }

  update(time,delta) {
    // 角度をインクリメント
    this._angle += delta * Cube.ROTATION_SPEED;
    let radian = this._angle * Math.PI / 180;

    this.rotation.x = radian * 0.5;
    this.rotation.z = radian;
  }
}
