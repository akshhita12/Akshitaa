
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '../hooks/useTheme';

interface Canvas3DProps {
  className?: string;
}

const Canvas3D: React.FC<Canvas3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    
    // Background color based on theme
    scene.background = new THREE.Color(theme === 'dark' ? '#000000' : '#ffffff');
    // Make background transparent instead of using setAlpha which doesn't exist
    scene.background = null; // Set to null for a transparent background
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(theme === 'dark' ? 0x00ffff : 0x0088ff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const secondPointLight = new THREE.PointLight(theme === 'dark' ? 0xff00ff : 0xff8800, 0.8);
    secondPointLight.position.set(-5, -5, 5);
    scene.add(secondPointLight);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a sphere-like distribution
      const radius = 10 * Math.cbrt(Math.random()); // Cube root for even distribution
      const theta = Math.random() * Math.PI * 2; // Random angle around y-axis
      const phi = Math.acos((Math.random() * 2) - 1); // Random angle from y-axis
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta); // x
      posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta); // y
      posArray[i+2] = radius * Math.cos(phi); // z
      
      // Random scale for each particle
      scaleArray[i/3] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: theme === 'dark' ? 0x00ffff : 0x0088ff,
      transparent: true,
      opacity: 0.8,
      vertexColors: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    
    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create floating 3D shapes
    const tetraGeometry = new THREE.TetrahedronGeometry(0.3);
    const octaGeometry = new THREE.OctahedronGeometry(0.4);
    const icosaGeometry = new THREE.IcosahedronGeometry(0.5);
    
    const wireframeMaterial = new THREE.MeshPhongMaterial({
      color: theme === 'dark' ? 0xff00ff : 0xff8800,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    
    const tetraMesh = new THREE.Mesh(tetraGeometry, wireframeMaterial);
    tetraMesh.position.set(3, 2, -2);
    scene.add(tetraMesh);
    
    const octaMesh = new THREE.Mesh(octaGeometry, wireframeMaterial);
    octaMesh.position.set(-3, -2, -1);
    scene.add(octaMesh);
    
    const icosaMesh = new THREE.Mesh(icosaGeometry, wireframeMaterial);
    icosaMesh.position.set(2, -3, -3);
    scene.add(icosaMesh);
    
    // Animation
    const clock = new THREE.Clock();
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate particles
      particlesMesh.rotation.y = elapsedTime * 0.05;
      
      // Rotate geometric shapes
      tetraMesh.rotation.x = elapsedTime * 0.2;
      tetraMesh.rotation.y = elapsedTime * 0.3;
      
      octaMesh.rotation.x = -elapsedTime * 0.3;
      octaMesh.rotation.z = elapsedTime * 0.2;
      
      icosaMesh.rotation.y = elapsedTime * 0.2;
      icosaMesh.rotation.z = -elapsedTime * 0.1;
      
      // Responsive to mouse movement
      particlesMesh.rotation.x += mouseY * 0.0005;
      particlesMesh.rotation.y += mouseX * 0.0005;
      
      tetraMesh.position.x = 3 + Math.sin(elapsedTime * 0.5) * 0.5;
      tetraMesh.position.y = 2 + Math.cos(elapsedTime * 0.3) * 0.5;
      
      octaMesh.position.x = -3 + Math.cos(elapsedTime * 0.3) * 0.5;
      octaMesh.position.y = -2 + Math.sin(elapsedTime * 0.5) * 0.5;
      
      icosaMesh.position.x = 2 + Math.sin(elapsedTime * 0.4) * 0.3;
      icosaMesh.position.y = -3 + Math.cos(elapsedTime * 0.6) * 0.3;
      
      // Render
      renderer.render(scene, camera);
      
      // Call animate again on the next frame
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      
      // Dispose of geometries and materials
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      tetraGeometry.dispose();
      octaGeometry.dispose();
      icosaGeometry.dispose();
      wireframeMaterial.dispose();
      
      // Remove meshes
      scene.remove(particlesMesh, tetraMesh, octaMesh, icosaMesh);
    };
  }, [theme]);
  
  return <div ref={mountRef} className={`absolute inset-0 -z-10 ${className}`} />;
};

export default Canvas3D;
