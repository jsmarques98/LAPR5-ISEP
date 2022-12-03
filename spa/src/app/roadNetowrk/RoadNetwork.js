import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.146.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.146.0/examples/jsm/loaders/GLTFLoader.js';

import Roundabout from './Roundabout.js';
import LinkElement from './LinkElement.js';
import Road from './Road.js';



export default class RoadNetwork {
    warehouses = [];
    K_LIGACAO = 1.1 ;
    K_CIRCULO = 2.1;
    Wi = 0.5;
    Ri = 2;
    INFINITESIMO=0.01;


    constructor(warehouseInformationList) {

        //SCENE
        this.scene = new THREE.Scene();
        const skybox = ['skybox/lf.jpg','skybox/rt.jpg','skybox/up.jpg','skybox/dn.jpg','skybox/ft.jpg','skybox/bk.jpg'];
        this.scene.background = new THREE.CubeTextureLoader().load(skybox);

        //RENDERER
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enable = false;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;



        //LIGHT
        const spotLight = new THREE.AmbientLight(0xffffff,1);
        // spotLight.castShadow = true;
        // spotLight.position.set(100, 250, 100);
        // spotLight.angle = THREE.MathUtils.degToRad(30);
        // spotLight.shadow.camera.near = 30;
        // spotLight.shadow.camera.far = 100;
        // spotLight.shadow.camera.top = 50;
        // spotLight.shadow.camera.bottom = 1;
        
        // spotLight.shadow.camera.rotateY(-Math.PI*0.5)
        // spotLight.shadow.camera.up=1000;
        
        this.scene.add(spotLight);
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(0, 80, 0);

        this.scene.add(this.camera);
        this.camera.add( spotLight );

        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.enableDamping = true;
        this.orbitControls.dampingFactor = 0.2;
        this.orbitControls.maxPolarAngle = Math.PI / 2;
        this.orbitControls.target.set(0, 5, 0);
        this.orbitControls.update();



         //spotLight.target.position.set( 0, 0, 0 );
         //spotLight.position.copy( this.camera.position );



        
        



        this.initializeFloor();
        this.initializeRoundabouts(warehouseInformationList);
        this.initializeRoads();

       
        window.addEventListener('resize', event => this.windowResize(event));
        document.body.appendChild(this.renderer.domElement);

    }

    initializeFloor(){

        let floorGeometry = new THREE.PlaneGeometry(150, 150, 200,200);
        floorGeometry.rotateX(-Math.PI * 0.5);

        let floorMaterial = new THREE.MeshPhongMaterial({color: 0xa6a6a6,side: THREE.DoubleSide});

        var loader = new THREE.TextureLoader();
        loader.load( 'grass.jpg', 
        function ( texture ) {   
            texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(20,20); 
            floorMaterial.map = texture;
            floorMaterial.needsUpdate = true;
        });

        let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);

        floorMesh.receiveShadow = true;
        floorMesh.position.y = -3.5;
        this.scene.add(floorMesh);
    }

    initializeRoundabouts(warehouseInformationList) {
        warehouseInformationList.forEach(obj => {
            const warehouse = new Roundabout(obj,this.Ri,this.INFINITESIMO);
            this.warehouses.push(warehouse);
            this.scene.add(warehouse.object);
        });
    }

    initializeRoads() {

        for (let i = 0; i < this.warehouses.length; i++) {
            const originRoudabout = this.warehouses[i];
            const originRoudaboutCoordinates = originRoudabout.coordenadas;
            

            for (let j = 0; j < this.warehouses[i].conections.length; j++) {
                const destinRoudabout = this.warehouses[this.warehouses[i].conections[j]];
                const destinRoudaboutCoordinates = destinRoudabout.coordenadas;


                let originLinkElemAngle = Math.atan2((originRoudaboutCoordinates.z - destinRoudabout.coordenadas.z), (originRoudaboutCoordinates.x - destinRoudabout.coordenadas.x));
			    let destinLinkElemAngle = Math.atan2((destinRoudaboutCoordinates.z - originRoudaboutCoordinates.z), (destinRoudabout.coordenadas.x - originRoudaboutCoordinates.x));
			    
                
                let originLinkElement = new LinkElement(originRoudaboutCoordinates, this.Ri, destinLinkElemAngle, this.Wi, this.K_LIGACAO);
			    let destinLinkElement = new LinkElement(destinRoudaboutCoordinates, this.Ri, originLinkElemAngle, this.Wi, this.K_LIGACAO);
			    this.scene.add(originLinkElement.linkElement);
			    this.scene.add(destinLinkElement.linkElement);

                let road = new Road(originRoudaboutCoordinates, destinRoudaboutCoordinates, destinLinkElemAngle, this.Ri, this.Wi, this.K_LIGACAO);


                this.scene.add(road.object);
            }
        }
    }



    update() {
        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);
    }

    windowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}