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


    this._arrowHelper = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 0),
      20, 0xFF0000
    );
    this.add(this._arrowHelper);
  }

  /**
   * 更新します。
   */
  update() {
    this._camera.update();

    // 角度をインクリメント
    this._handleAngle++;
    let handleRadian = this._handleAngle * Math.PI / 180;

    // ライトを更新
    this._flashLight.update(handleRadian, -handleRadian);
    this._arrowHelper.setDirection(this._flashLight.frontVector);

    // パーティクルを更新
    this._particleEmiiter.update();
  }
}
