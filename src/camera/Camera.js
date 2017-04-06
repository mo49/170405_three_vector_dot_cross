import * as THREE from 'three';

/**
 * カメラのクラスです。
 */
export default class Camera extends THREE.PerspectiveCamera {

  /** インスタンスを取得します。 */
  static get instance() {
    return Camera._instance || new Camera();
  }

  /**
   * コンストラクターです。
   * @constructor
   */
  constructor() {
    super(45, window.innerWidth / window.innerHeight, 1, 500);
    Camera._instance = this;

    this.position.y = 40;
    this.position.z = 60;
  }

  /**
   * 毎フレームの更新をかけます。
   */
  update() {
    this.lookAt(new THREE.Vector3(0, 0, 0));
  }
}