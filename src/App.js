import * as THREE from 'three';
import StepOneScene from './scene/StepOneScene';
import Camera from './camera/Camera';
import TWEEN from 'tween.js';

/**
 * メインアプリクラスです。
 */
export default class App {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {

    this._update = this._update.bind(this);
    this._resize = this._resize.bind(this);

    // DOM
    this._wrapper = document.getElementById('app');
    console.info(this._wrapper);

    // シーン
    this._scene = new StepOneScene();

    // カメラ
    this._camera = Camera.instance;

    // レンダラー
    this._renderer = new THREE.WebGLRenderer({antialias: false});
    this._renderer.setClearColor(0x000000);
    this._renderer.setPixelRatio(1);
    this._wrapper.appendChild(this._renderer.domElement);

    this._resize();
    window.addEventListener('resize', this._resize);

    // フレーム毎の更新
    this._update();
  }

  /**
   * フレーム毎の更新です。
   */
  _update() {
    requestAnimationFrame(this._update);
    // TWEENの更新
    TWEEN.update();
    // シーンの更新
    this._scene.update();
    // 描画
    this._renderer.render(this._scene, this._camera);
  }

  /**
   * リサイズをかけます。
   */
  _resize() {
    let width = this._wrapper.clientWidth;
    let height = this._wrapper.clientHeight;
    this._renderer.domElement.setAttribute('width', String(width));
    this._renderer.domElement.setAttribute('height', String(height));
    this._renderer.setSize(width, height);
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
  }
}


window.addEventListener('load', () => {
  let app = new App();
});
