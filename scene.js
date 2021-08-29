let scene, camera, renderer, movingLight;
let cloudParticles = [];

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;
    let ambient = new THREE.AmbientLight(0x50a832);
    scene.add(ambient);
    let directionalLight = new THREE.DirectionalLight(0xff8c19);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);
    let blueLight = new THREE.PointLight(0x3632a8, 50, 450, 1.7);
    blueLight.position.set(200, 300, 100);
    scene.add(blueLight);
    let redLight = new THREE.PointLight(0xd8547e, 50, 450, 1.7);
    redLight.position.set(100, 300, 100);
    scene.add(redLight);
    let purpleLight = new THREE.PointLight(0xa83277, 50, 450, 1.7);
    purpleLight.position.set(300, 300, 200);
    scene.add(purpleLight);
    movingLight = new THREE.PointLight(0x50a832, 50, 450, 1.7);
    movingLight.position.set(500, 500, 200);
    scene.add(movingLight);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.fog = new THREE.FogExp2(0x32a86d, 0.002);
    renderer.setClearColor(scene.fog.color);
    document.body.appendChild(renderer.domElement);
    let loader = new THREE.TextureLoader();
    loader.load("sport-smoke.png", function(texture) {
        cloudGeo = new THREE.PlaneBufferGeometry(350, 350);
        cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });
        for (let p = -50; p < 50; p++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.set(
                Math.random() * 800 - 400,
                500,
                Math.random() * 500 - 500
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random() * 2 * Math.PI;
            cloud.material.opacity = 0.55;
            cloudParticles.push(cloud);
            scene.add(cloud);
        }
    });
    render();
}

function render() {
    renderer.render(scene, camera);
    cloudParticles.forEach(p => {
        p.rotation.z -= 0.005;
    });
    movingLight.position.set(
        Math.random() * 600 - 600,
        Math.random() * 600 - 600,
        200
    );
    let color = new THREE.Color();
    color.r = Math.random();
    color.g = Math.random();
    color.b = Math.random();
    movingLight.color = color;
    requestAnimationFrame(render);
}
init();