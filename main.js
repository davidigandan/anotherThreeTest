import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSG } from 'three-csg-ts';


// Setup scene, camera, renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xFFFFFF );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z=60;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Contorls
const controls = new OrbitControls(camera, renderer.domElement);

// Create cylinder mesh
const topEndCylinderGeometry= new THREE.CylinderGeometry( 2.5, 2.5, 8, 32 );
const topEndCylinderMaterial = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
const topEndCylinder = new THREE.Mesh( topEndCylinderGeometry, topEndCylinderMaterial );
topEndCylinder.position.set(0,11,0); //topendcylinder height is 5, so position must be half hight plus height of body
topEndCylinder.updateMatrix();
scene.add(topEndCylinder);

// Create cube
const topEndCubeGeometry = new THREE.BoxGeometry(Math.sqrt(50), Math.sqrt(50), Math.sqrt(50));
const topEndCubeMaterial = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
const topEndCube = new THREE.Mesh( topEndCubeGeometry, topEndCubeMaterial);
topEndCube.position.set(2.5,15,0); //position on top right of cylinder
topEndCube.rotation.z = -Math.PI/4; //rotate cube -45 degrees. 
topEndCube.updateMatrix(); //store the rotation
scene.add(topEndCube);

// Perform subtraction by finding intersection
const topTip = CSG.intersect(topEndCylinder, topEndCube);
topTip.material = new THREE.MeshBasicMaterial({color: "orange"});

const slicedCylinder = CSG.subtract(topEndCylinder, topTip);
slicedCylinder.material = new THREE.MeshBasicMaterial({color: "orange"});
slicedCylinder.position.set(-5, 5, 4);
slicedCylinder.updateMatrix();
scene.add(slicedCylinder);

// Show sliced off tip
const clonedTopTip = topTip.clone();
clonedTopTip.position.set(5, 5, 4);
clonedTopTip.updateMatrix();
scene.add(clonedTopTip);

scene.add( new THREE.AxesHelper( 20 ));


function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render( scene, camera );
}
animate();
