  import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
  import gsap from 'gsap';
  import vertexShader from './Shaders/vertex.glsl';
  import fragmentShader from './Shaders/fragment.glsl';

  import atmosphereVertexShader from './Shaders/atmosphereVertex.glsl';
  import atmosphereFragmentShader from './Shaders/atmosphereFragment.glsl';

  const canvasContainer = document.querySelector('#canvasContainer')

  const scene = new THREE.Scene()
  // field of view, aspect ratio, near, far, (clipping planes).
  const camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer( { antialias: true, canvas: document.querySelector('canvas')})

  renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // creating a sphere with (radius, width segments, height) -- width segments is measure of poly.
  const sphere = new THREE.Mesh
  (
    new THREE.SphereGeometry(7, 50, 50), new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms: 
      { 
        globeTexture: 
          {
            value: new THREE.TextureLoader().load('./img/terminus.png')
          }
      }
    })
  )

  // creating the atmosphere
  const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.ShaderMaterial({ vertexShader: atmosphereVertexShader, fragmentShader: atmosphereFragmentShader,
  blending: THREE.AdditiveBlending, side: THREE.BackSide})) // blends the atmosphere object with the globe's backside
  atmosphere.scale.set(1.8, 1.8, 1.8, 1.8) 

  scene.add(atmosphere)

  // grouping's purpose is so that our mouse's interaction with the globe's constant y-rotation remains unchanged.
  const group = new THREE.Group()
  group.add(sphere)
  scene.add(group)

  // bufferGeometry: A representation of mesh, line, or point geometry. 
  // we're representing stars as individual points on 3D space. PointsMaterial is the default material for points.
  const starGeometry = new THREE.BufferGeometry() 
  const starMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF })
  
  // x and y positions of the stars are randomly generated (numbers between -1000 & 1000)
  // z's magic number indicates how close or further away stars are from us. The lower, the closer.
  const starVertices = [] 
  for (let i = 0; i < 1000; i++)
  {
    const x = (Math.random() - 0.5) * 2000
    const y = (Math.random() - 0.5) * 1000
    const z = -Math.random() - 500
    starVertices.push(x, y, z) //creating a matrix of the star's positions!
  }


  // 3 represents x,y,z axis data of an individual star
  // buffer geometry has many attributes but we are only concerned about position here.
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

  const stars = new THREE.Points(starGeometry, starMaterial)
  scene.add(stars)

  camera.position.z = 20; //zoom out of origin to see the contents.

  const mouse = { x: undefined, y: undefined } 

  function animate()
  {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    sphere.rotation.y += 0.002
    gsap.to(group.rotation, //using gsap to control the globe's reaction to the eventListener and not make the rotations instantaneous.
      {
        ///the group's axiis are visually inverted, so the group's y rotation is actually its x. etc
        x: -mouse.y * 0.3,
        y: mouse.x * 0.5, 
        duration: 2 //the delay that I'm talking about :)
      })
  }
  animate()

  //calculates any values between -1 and 1 to indicate our mouse's x and y position according to the screen's width and height. 
  addEventListener('mousemove', () => 
  {
    mouse.x = (event.clientX / innerWidth) * 2 - 1
    mouse.y = (event.clientY / innerHeight) * 2 - 1
  })