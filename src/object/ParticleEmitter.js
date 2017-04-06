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
      0xffff00,
      0xffffdd,
      0xffffff
    ];

    for(let index = 0; index < 3000; index++) {
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

    // 半径10の球の表面にランダムに配置
    let phi = Math.random() * 180;
    let theta = Math.random() * 180;
    let radius = 50;

    sprite.position.x = radius * Math.cos(phi) * Math.cos(theta) * -1;
    sprite.position.y = radius * Math.sin(phi);
    sprite.position.z = radius * Math.cos(phi) * Math.sin(theta);

    // ランダムに大きさを変更
    sprite.scale.multiplyScalar(Math.random() * 5 + 1);

    return sprite;
  }

  /**
   * フレーム毎の更新です。
   */
  update(lightFrontVector) {
    let target = lightFrontVector.clone();
    _.each(this._particleStore, (particle) => {
      let dot = particle.position.clone().normalize().dot(target);
      particle.material.opacity = (dot - 0.8) / 0.2 * Math.random();
    });
  }
}
