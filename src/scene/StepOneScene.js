import * as THREE from 'three';
import Camera from '../camera/Camera';
import FlashLight from '../object/FlashLight';
import ParticleEmitter from '../object/ParticleEmitter';

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

    // 環境光源
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.add(ambientLight);

    // 床
    let gridHelper = new THREE.GridHelper(30, 30);
    gridHelper.position.y = -10;
    this.add(gridHelper);

    // 懐中電灯
    this._flashLight = new FlashLight();
    this.add(this._flashLight);

    // パーティクルエミッター
    this._particleEmiiter = new ParticleEmitter();
    this.add(this._particleEmiiter);
  }

  /**
   * 更新します。
   */
  update() {
    this._camera.update();

    // 角度をインクリメント
    this._handleAngle++;
    let handleRadian = this._handleAngle * Math.PI / 180;

    this._flashLight.rotation.x = handleRadian;
    this._flashLight.rotation.z = handleRadian * 0.5;
    this._flashLight.rotation.y = handleRadian;

  }
}
