  // JavaScript for Virtual Try-On
  async function setupWebcam() {
    const video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function detectFace(video) {
    const canvas = document.getElementById('overlayCanvas');
    const context = canvas.getContext('2d');
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models'); // Load models from face-api.js
    const result = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions());
    return result;
}

async function renderGlassesOnFace(face) {
    const canvas = document.getElementById('overlayCanvas');
    const context = canvas.getContext('2d');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.width, canvas.height);

    const scene = new THREE.Scene();

    const loader = new THREE.GLTFLoader();
    loader.load('C:\website\model\sample.gltf', (gltf) => {
        const glassesModel = gltf.scene.children[0];
        scene.add(glassesModel);

        // Position and scale the glasses model based on the detected face
        // You'll need to adjust these values based on your 3D model and the detected face
        glassesModel.position.set(0, 0, -100);
        glassesModel.scale.set(10, 10, 10);
    });

    const camera = new THREE.PerspectiveCamera(
        75, canvas.width / canvas.height, 0.1, 1000
    );
    camera.position.z = 100;

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

async function main() {
    await setupWebcam();
    const video = document.getElementById('video');
    const face = await detectFace(video);
    if (face) {
        await renderGlassesOnFace(face);
    }
}

main();
