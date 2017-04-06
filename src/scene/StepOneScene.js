import * as THREE from 'three';
import Camera from '../camera/Camera';

/**
 * ステップ１シーンクラスです。
 */
export default class StepOneScene extends THREE.Scene {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // カメラ
    this._camera = Camera.instance;

    // 環境光源
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.add(ambientLight);

    // 床
    var gridHelper = new THREE.GridHelper(100, 10);
    this.add(gridHelper);
  }

  /**
   * 更新します。
   */
  update() {
    this._camera.update(this._zensuke);
  }
}
