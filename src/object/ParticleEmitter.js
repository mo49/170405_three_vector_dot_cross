import * as THREE from 'three';
import {_} from 'lodash';

export default class ParticleEmitter extends THREE.Object3D {

  /** パーティクルの数 */
  static PARTICLE_NUM = 3000;
  /** カラーリスト */
  static COLOR_LIST = [
    0xffff00,
    0xffffdd,
    0xffffff
  ];
  /** 球の半径 */
  static RADIUS = 50;

  /** パーティクルの入れ物 */
  _particleStore = [];
  /** テクスチャー */
  _texture = null;

  constructor() {
    super();

    // テクスチャ
    let loader = new THREE.TextureLoader();
    this._texture = loader.load('imgs/particle.png');

    // 数分のパーティクルを生成
    for(let index = 0; index < ParticleEmitter.PARTICLE_NUM; index++) {
      let particle = this._createParticle();
      this.add(particle);
      // ストアに追加
      this._particleStore.push(particle);
    }
  }

  _createParticle() {
    // ランダムに色を設定
    let rand = Math.floor(Math.random() * 3);
    let color = ParticleEmitter.COLOR_LIST[rand];

    // マテリアル
    let material = new THREE.SpriteMaterial({
      color: color,
      map: this._texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.3
    });

    // スプライト
    let sprite = new THREE.Sprite(material);

    // 球の表面にランダムに配置
    let phi = ((Math.random() * 180) - 90) * Math.PI / 180;
    let theta = (Math.random() * 360) * Math.PI / 180;
    let radius = ParticleEmitter.RADIUS;
    sprite.position.x = radius * Math.cos(phi) * Math.cos(theta) * -1;
    sprite.position.y = radius * Math.sin(phi);
    sprite.position.z = radius * Math.cos(phi) * Math.sin(theta);

    // ランダムに大きさを変更
    sprite.scale.multiplyScalar(Math.random() * 5 + 1);

    return sprite;
  }

  update(lightFrontVector, aperture) {
    let target = lightFrontVector.clone();
    // 全てのパーティクルに対して照らされているか判定
    _.each(this._particleStore, (particle) => {
      // 絞り値から透明度の割合を算出
      // 「懐中電灯の正面ベクトル」と「パーティクルの位置ベクトル」の方向が
      // 近ければ近いほどパーティクルの不透明度が1に近づいていく
      let dot = particle.position.clone().normalize().dot(target);
      // 内積は計算結果がベクトルではなく数値になる
      // 表示される範囲が広すぎるため少し狭める 0.8 ~ 1.0
      let opacity = (dot - (1 - aperture)) / aperture;
      // ちらつかせます
      opacity *= Math.random();
      // 透明度を設定
      particle.material.opacity = opacity;
    });
  }
}
