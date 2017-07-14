import * as THREE from 'three';
import Camera from '../camera/Camera';
import Truck from '../object/Truck';
import Course from '../object/Course';

export default class StepTwoScene extends THREE.Scene {

  constructor() {
    super();

    this._handleAngle = 0;
    this._frame = 0;
    this._deltaStock = 0;

    // カメラ
    this._camera = Camera.instance;
    this._camera.position.y = 10;
    this._camera.position.x = 10;
    this._camera.position.z = 30;

    // 環境光源
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.add(ambientLight);

    // 平行光源
    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.add(directionalLight);

    // 床
    let gridHelper = new THREE.GridHelper(50, 30);
    gridHelper.position.y = -10;
    this.add(gridHelper);

    // コース
    this._course = new Course();
    this.add(this._course);
    this._courseLength = this._course.points.length;

    // トロッコ
    this._truck = new Truck();
    this._truck.scale.multiplyScalar(0.5)
    this._truck.position.copy(this._course.points[0]); // 初期地点
    this.add(this._truck);
  }

  update(time,delta) {
    this._camera.update();
    this._deltaStock += delta;
    if (this._deltaStock > 30/1000) {
      this._frame++;
      this._deltaStock = 0;
    }

    // フレーム数が360以上であれば0に戻す
    if(this._frame >= this._courseLength - 1) {
      this._frame = 0;
    }

    // コースの法線を取得
    let normal = this._getNormal(
      this._course.points[this._frame],
      this._course.points[this._frame + 1]
    );

    // トラックの位置を修正
    this._truck.position.copy(this._course.points[this._frame]);
    // トロッコの上向きベクトルを更新
    this._truck.up.set(normal.x, normal.y, normal.z);
    // 正面を向く（上向きベクトルの変更を反映させる）
    this._truck.lookAt(this._course.points[this._frame + 1]);
  }

  /**
   * ポイントから法線を算出します。
   */
  _getNormal(currentPoint, nextPoint) {
    let frontVec = nextPoint.clone().sub(currentPoint).normalize(); // x
    let sideVec = new THREE.Vector3(0, 0, 1); // z
    let normalVec = frontVec.cross(sideVec); // y

    return normalVec;
  }
}
