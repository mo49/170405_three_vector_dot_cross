import * as THREE from 'three';
import {_} from 'lodash';

/**
 * パーティクルエミッタークラスです。
 */
export default class ParticleEmitter extends THREE.Object3D {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // パーティクルの入れ物
    this._particleStore = [];

    for(let index = 0; index < 100; index++) {
      let particle = this._createParticle();
      this.add(particle);
      this._particleStore.push(particle);
    }
  }

  /**
   * 粒を生成します。
   */
  _createParticle() {
    var material = new THREE.SpriteMaterial({
      color: 0x007eff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.3
    });

    var sprite = new THREE.Sprite(material);
    sprite.position.x = Math.random() * 60 - 30;
    sprite.position.y = Math.random() * 60 - 30;
    sprite.position.z = Math.random() * 60 - 30;
    sprite.scale.multiplyScalar(0.5);

    return sprite;
  }

  /**
   * フレーム毎の更新です。
   */
  update() {
    _.each(this._particleStore, (particle) => {
      // particle.material.opacity = Math.random();
    });
  }
}
