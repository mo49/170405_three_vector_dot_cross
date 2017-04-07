import * as THREE from 'three';

/**
 * コースクラスです。
 */
export default class Course extends THREE.Object3D {

  /** 頂点情報 */
  get points() { return this._points; }

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    this._points = [];
    let radius = 5;
    for(let index = 0; index < 362; index++) {
      let rad = index * Math.PI / 180;

      let sin = Math.sin(rad * 3);

      let x = radius * Math.cos(rad) * 2 + sin * 2;
      let y = radius * Math.sin(rad) + sin * 3;
      this._points.push(new THREE.Vector3(x, y, 0));
    }

    var material = new THREE.LineBasicMaterial({
      color: 0xff0000
    });

    var geometry = new THREE.Geometry();
    geometry.vertices = this._points;

    var line = new THREE.Line(geometry, material);
    this.add(line);
  }
}
