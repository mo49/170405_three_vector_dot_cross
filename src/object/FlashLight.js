import * as THREE from 'three';

/**
 * 懐中電灯クラスです。
 */
export default class FlashLight extends THREE.Object3D {

  /** フロントベクトル */
  get frontVector() { return this._frontVector; }

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // 正面ベクトル
    this._baseFrontVector = new THREE.Vector3(0, 1, 0);
    this._frontVector = this._baseFrontVector.clone();

    // 持ち手部分
    let handle = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1, 1, 3, 10),
      new THREE.MeshBasicMaterial({
        color: 0xCCCCCC
      })
    );
    this.add(handle);

    // 頭
    let head = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1.5, 1, 1.5, 10),
      new THREE.MeshBasicMaterial({
        color: 0xAAAAAA
      })
    );
    this.add(head);
    head.position.y = 2;

    // ビーム
    var loader = new THREE.TextureLoader();
    let beamTexture = loader.load('imgs/beam.png');
    let beam = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(15, 0.5, 20, 10, 10, true),
      new THREE.MeshBasicMaterial({
        color: 0xFFFF55,
        opacity: 0.5,
        transparent: true,
        map: beamTexture,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      })
    );
    beam.position.y = 12;
    this.add(beam);
  }

  /**
   * フレーム毎のアップデートをします。
   */
  update(phi, theta) {
    this.rotation.z = -(phi - (90 * Math.PI / 180));
    this.rotation.y = theta;

    let x = -Math.cos(phi) * Math.cos(theta);
    let y = Math.sin(phi);
    let z = Math.cos(phi) * Math.sin(theta);

    this._frontVector = new THREE.Vector3(x, y, z);
  }
}
