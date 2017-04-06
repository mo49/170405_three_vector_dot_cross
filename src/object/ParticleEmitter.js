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
    // テクスチャ
    var loader = new THREE.TextureLoader();
    this._texture = loader.load('imgs/particle.png');
    /** カラー配列 */
    this._colorList = [
      0x88ccff,
      0xffffdd,
      0x44eeff
    ];

    for(let index = 0; index < 500; index++) {
      let particle = this._createParticle();
      this.add(particle);
      this._particleStore.push(particle);
    }
  }

  /**
   * 粒を生成します。
   */
  _createParticle() {
    let rand = Math.floor(Math.random() * 3)
    let color = this._colorList[rand];

    var material = new THREE.SpriteMaterial({
      color: color,
      map: this._texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.3
    });

    var sprite = new THREE.Sprite(material);
    sprite.position.x = Math.random() * 100 - 50;
    sprite.position.y = Math.random() * 100 - 50;
    sprite.position.z = Math.random() * 100 - 50;
    sprite.scale.multiplyScalar(Math.random() * 3);

    return sprite;
  }

  /**
   * フレーム毎の更新です。
   */
  update(lightFrontVector) {
    let target = lightFrontVector.clone();
    _.each(this._particleStore, (particle) => {
      let dot = particle.position.clone().normalize().dot(target);
      particle.material.opacity = (dot - 0.5) / 0.5;
    });
  }
}
