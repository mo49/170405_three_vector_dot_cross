import * as THREE from 'three';
import Camera from '../camera/Camera';
import Truck from '../object/Truck';

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

    this._handleAngle = 0;

    // カメラ
    this._camera = Camera.instance;
    this._camera.position.y = 10;
    this._camera.position.x = 10;
    this._camera.position.z = 30;

    // 環境光源
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.add(ambientLight);

    // 平行光源
    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.add(directionalLight);

    // 床
    let gridHelper = new THREE.GridHelper(50, 30);
    gridHelper.position.y = -10;
    this.add(gridHelper);

    // トロッコ
    this._truck = new Truck();
    this.add(this._truck);
  }

  /**
   * 更新します。
   */
  update() {
    this._camera.update();
  }
}
