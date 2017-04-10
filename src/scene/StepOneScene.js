import * as THREE from 'three';
import Camera from '../camera/Camera';
import FlashLight from '../object/FlashLight';
import ParticleEmitter from '../object/ParticleEmitter';

/**
 * ステップ１シーンクラスです。
 */
export default class StepOneScene extends THREE.Scene {

  /** カメラ */
  _camera;
  /** 懐中電灯 */
  _flashLight;
  /** パーティクルエミッター */
  _particleEmiiter;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // カメラ
    this._camera = Camera.instance;
    this._camera.position.x = 10;
    this._camera.position.y = 50;
    this._camera.position.z = 10;

    // 環境光源
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.add(ambientLight);

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
    // カメラを更新
    this._camera.update();

    // ライトを更新
    this._flashLight.update();

    // パーティクルを更新
    this._particleEmiiter.update(
      this._flashLight.frontVector,
      this._flashLight.aperture
    );
  }
}
