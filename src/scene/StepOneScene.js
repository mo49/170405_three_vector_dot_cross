import * as THREE from 'three';
import Camera from '../camera/Camera';
import FlashLight from '../object/FlashLight';
import ParticleEmitter from '../object/ParticleEmitter';
import Cube from '../object/Cube';

export default class StepOneScene extends THREE.Scene {

  /** カメラ */
  _camera;
  /** 懐中電灯 */
  _flashLight;
  /** パーティクルエミッター */
  _particleEmitter;

  constructor() {
    super();

    // カメラ
    this._camera = Camera.instance;
    this._camera.position.set(100,50,10);

    // 環境光源
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.add(ambientLight);

    // 懐中電灯
    this._flashLight = new FlashLight();
    this.add(this._flashLight);

    // パーティクルエミッター
    this._particleEmitter = new ParticleEmitter();
    this.add(this._particleEmitter);
  }

  update(time,delta) {
    // カメラを更新
    this._camera.update();

    // ライトを更新
    this._flashLight.update(time,delta);

    // パーティクルを更新
    this._particleEmitter.update(
      this._flashLight.frontVector,
      this._flashLight.aperture
    );
  }
}
