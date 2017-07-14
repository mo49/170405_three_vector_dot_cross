import * as THREE from 'three';

export default class Cube extends THREE.Object3D {

  static ROTATION_SPEED = 100;
  _angle = 0;

  constructor(opts={}) {
    super();

    const cube = new THREE.Mesh(
      new THREE.CubeGeometry(10, 10, 10),
      new THREE.MeshLambertMaterial({ color: 0xFBBC05 })
    );
    this.add(cube);

    this.position.set(
      opts.x || Math.random()*20,
      opts.y || Math.random()*20,
      opts.z || Math.random()*20
    )
  }

  update(time,delta) {
    // 角度をインクリメント
    this._angle += delta * Cube.ROTATION_SPEED;
    let radian = this._angle * Math.PI / 180;

    this.rotation.set(
      radian,
      radian * 0.5,
      radian * 0.3
    );
  }
}
