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
    this._camera.update();

    // 角度をインクリメント
    this._handleAngle += 2.5;
    let handleRadian = this._handleAngle * Math.PI / 180;

    // ライトを更新
    this._flashLight.update(handleRadian);

    // パーティクルを更新
    this._particleEmiiter.update(this._flashLight.frontVector, this._flashLight.aperture);
  }
}
