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
      let x = radius * Math.cos(rad) * 2;
      let y = radius * Math.sin(rad);
      this._points.push(new THREE.Vector3(x, y, 0));
    }

    console.info(this._points);

    var material = new THREE.LineBasicMaterial({
      color: 0xff0000
    });

    var geometry = new THREE.Geometry();
    geometry.vertices = this._points;

    var line = new THREE.Line(geometry, material);
    this.add(line);

    // let geometry = new THREE.BufferGeometry();
    //
    // // 平面用の頂点を定義
    // // d - c
    // // |   |
    // // a - b
    // var vertexPositions = [
    //   [-1.0, -1.0, 1.0], // a
    //   [ 1.0, -1.0, 1.0], // b
    //   [ 1.0,  1.0, 1.0], // c
    //   [-1.0,  1.0, 1.0]  // d
    // ];
    //
    // // Typed Arrayで頂点データを保持
    // var vertices = new Float32Array(vertexPositions.length * 3);
    // for (var i = 0; i < vertexPositions.length; i++) {
    //   vertices[i * 3 + 0] = vertexPositions[i][0];
    //   vertices[i * 3 + 1] = vertexPositions[i][1];
    //   vertices[i * 3 + 2] = vertexPositions[i][2];
    // }
    //
    // // 頂点インデックスを生成
    // var indices = new Uint16Array([
    //   0, 1, 2,
    //   2, 3, 0
    // ]);
    //
    // // attributesを追加
    // geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // geometry.addAttribute('index',    new THREE.BufferAttribute(indices,  1));
    //
    // let material = new THREE.MeshBasicMaterial({
    //   color: 0xFF0000
    // });
    //
    // let mesh = new THREE.Mesh(geometry, material);
    // this.add(mesh);
  }
}
