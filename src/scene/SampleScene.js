import * as THREE from 'three';
import Camera from '../camera/Camera';
import Cube from '../object/Cube';

export default class SampleScene extends THREE.Scene {

  _camera;
  _cube;

  constructor(opts={}) {
    super();

    // カメラ
    this._camera = Camera.instance;
    this._camera.position.set(100,50,10);

    // 環境光源
    // let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    let directionaLight = new THREE.DirectionalLight(0xffffff, 0.5);
    // directionaLight.position.set(0,100,30);
    this.add(directionaLight);

    // 箱
    this._cube = new Cube();
    this.add(this._cube);

    // helper
    let gridHelper = new THREE.GridHelper(100,2); // size, step
    this.add(gridHelper);
    // let axisHelper = new THREE.AxisHelper(200,50);
    // this.add(axisHelper);
    // let lightHelper = new THREE.DirectionalLightHelper(this.light,20);
    // this.add(lightHelper);

  }

  update(time,delta) {
    this._camera.update();
    this._cube.update(time,delta);
  }

}
