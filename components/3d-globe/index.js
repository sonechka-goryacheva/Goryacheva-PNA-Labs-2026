import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Globe3DComponent {
    constructor(containerId, modelPath) {
        this.containerId = containerId;
        this.modelPath = modelPath;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.animationId = null;
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const width = container.clientWidth;
        const height = 400;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(0, 0, 3.5);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        container.appendChild(this.renderer.domElement);

        // Яркое освещение
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(5, 10, 7);
        this.scene.add(mainLight);
        
        const fillLight = new THREE.DirectionalLight(0xffcc88, 0.6);
        fillLight.position.set(-3, 2, 4);
        this.scene.add(fillLight);
        
        const backLight = new THREE.DirectionalLight(0x88aaff, 0.5);
        backLight.position.set(-2, 1, -5);
        this.scene.add(backLight);
        
        const bottomLight = new THREE.PointLight(0x88aaff, 0.3);
        bottomLight.position.set(0, -2, 0);
        this.scene.add(bottomLight);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = false;
        this.controls.enableZoom = true;
        this.controls.enablePan = false;
        this.controls.zoomSpeed = 1.2;
        this.controls.rotateSpeed = 1.0;
        this.controls.target.set(0, 0, 0);

        this.loadModel();
        this.animate();

        window.addEventListener('resize', () => this.handleResize());
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load(this.modelPath, 
            (gltf) => {
                this.model = gltf.scene;
                
                const box = new THREE.Box3().setFromObject(this.model);
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 1.8 / maxDim;
                this.model.scale.set(scale, scale, scale);
                
                const minY = box.min.y;
                const offsetY = -minY * scale - 0.8;
                this.model.position.y = offsetY;
                
                this.scene.add(this.model);
            },
            (progress) => {
                console.log('Loading model:', Math.round(progress.loaded / progress.total * 100) + '%');
            },
            (error) => {
                console.error('Error loading model:', error);
                const container = document.getElementById(this.containerId);
                if (container) {
                    container.innerHTML = '<div style="color: #ff6666; text-align: center; padding: 50px;">Ошибка загрузки модели. Проверьте путь к файлу earth.glb</div>';
                }
            }
        );
    }

    setView(position) {
        if (!this.camera || !this.controls) return;
        
        const views = {
            front: { x: 0, y: 0, z: 3.5 },
            back: { x: 0, y: 0, z: -3.5 },
            left: { x: -3.5, y: 0, z: 0 },
            right: { x: 3.5, y: 0, z: 0 }
        };
        
        const view = views[position];
        if (view) {
            this.camera.position.set(view.x, view.y, view.z);
            this.controls.target.set(0, 0, 0);
            this.controls.update();
        }
    }
    
    resetView() {
        if (!this.camera || !this.controls) return;
        this.camera.position.set(0, 0, 3.5);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        if (this.controls) {
            this.controls.update();
        }
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    handleResize() {
        const container = document.getElementById(this.containerId);
        if (!container || !this.camera || !this.renderer) return;
        
        const width = container.clientWidth;
        const height = 400;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
        const container = document.getElementById(this.containerId);
        if (container && this.renderer) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
    }
}