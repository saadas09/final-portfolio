import { useEffect, useRef, useState } from 'react';
import { useMotion } from './MotionProvider';

export default function ChromeSculpture({ mode }) {
  const host = useRef(null);
  const control = useRef({ mode, enabled: true, turn: 0, tilt: 0 });
  const { enabled } = useMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    control.current.mode = mode;
  }, [mode]);
  useEffect(() => {
    control.current.enabled = enabled;
  }, [enabled]);
  useEffect(() => {
    let cancelled = false,
      dispose = () => {};
    Promise.all([import('three'), import('three/addons/environments/RoomEnvironment.js')])
      .then(([THREE, { RoomEnvironment }]) => {
        if (cancelled) return;
        const element = host.current;
        let renderer;
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'low-power',
          });
        } catch {
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.45;
        element.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
        camera.position.z = 9.4;
        const pmrem = new THREE.PMREMGenerator(renderer);
        const room = new RoomEnvironment();
        const env = pmrem.fromScene(room, 0.04);
        scene.environment = env.texture;
        room.dispose();
        pmrem.dispose();
        const material = new THREE.MeshPhysicalMaterial({
          color: 0xcbd5d0,
          metalness: 1,
          roughness: 0.17,
          clearcoat: 1,
          clearcoatRoughness: 0.13,
          iridescence: 0.32,
          iridescenceIOR: 1.3,
        });
        const geometries = [
          new THREE.TorusKnotGeometry(1.32, 0.47, 220, 36, 2, 3),
          new THREE.TorusKnotGeometry(1.23, 0.34, 220, 32, 3, 4),
          new THREE.TorusGeometry(1.35, 0.61, 48, 140),
        ];
        const mesh = new THREE.Mesh(geometries[0], material);
        mesh.rotation.set(0.35, 0.3, -0.4);
        scene.add(mesh);
        const key = new THREE.DirectionalLight(0xd8ff94, 4);
        key.position.set(-3, 2, 4);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xc3b3ff, 5);
        rim.position.set(3, -1, 2);
        scene.add(rim);
        let dirty = true;
        let previousSignature = '';
        let scale = 1;
        let swayX = 0,
          swayY = 0,
          targetX = 0,
          targetY = 0;
        const hero = element.closest('.hero');
        const parallax = (event) => {
          if (event.pointerType === 'touch' || !control.current.enabled) return;
          const bounds = hero.getBoundingClientRect();
          targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.24;
          targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.18;
        };
        const resetParallax = () => {
          targetX = 0;
          targetY = 0;
        };
        hero.addEventListener('pointermove', parallax);
        hero.addEventListener('pointerleave', resetParallax);
        const resize = new ResizeObserver(() => {
          const w = element.clientWidth,
            h = element.clientHeight;
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          dirty = true;
        });
        resize.observe(element);
        let visible = true,
          frame,
          last = 0,
          angle = 0,
          currentMode = -1,
          pointer = null;
        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
        });
        observer.observe(element);
        const down = (event) => {
          if (event.pointerType === 'touch') return;
          pointer = { x: event.clientX, y: event.clientY };
          element.setPointerCapture(event.pointerId);
        };
        const move = (event) => {
          if (!pointer) return;
          control.current.turn += (event.clientX - pointer.x) * 0.008;
          control.current.tilt += (event.clientY - pointer.y) * 0.008;
          pointer = { x: event.clientX, y: event.clientY };
        };
        const up = () => {
          pointer = null;
        };
        element.addEventListener('pointerdown', down);
        element.addEventListener('pointermove', move);
        element.addEventListener('pointerup', up);
        element.addEventListener('pointercancel', up);
        let first = true;
        const draw = (time) => {
          frame = requestAnimationFrame(draw);
          const delta = Math.min((time - last) / 1000, 0.04);
          last = time;
          if (!visible || document.hidden) return;
          const state = control.current;
          const signature = `${state.mode}/${state.turn}/${state.tilt}/${state.enabled}`;
          if (!state.enabled && !dirty && signature === previousSignature) return;
          previousSignature = signature;
          dirty = false;
          if (state.enabled) angle += delta * 0.16;
          if (currentMode !== state.mode) {
            currentMode = state.mode;
            mesh.geometry = geometries[currentMode];
            material.color.setHex([0xcbd5d0, 0xbdb1d6, 0xc5d8a8][currentMode]);
            scale = state.enabled && !first ? 0.75 : 1;
          }
          scale = state.enabled ? scale + (1 - scale) * Math.min(delta * 8, 1) : 1;
          mesh.scale.setScalar(scale);
          swayX += ((state.enabled ? targetX : 0) - swayX) * 0.05;
          swayY += ((state.enabled ? targetY : 0) - swayY) * 0.05;
          mesh.rotation.y = angle + state.turn + 0.3 + swayX;
          mesh.rotation.x = 0.4 + state.tilt + swayY;
          mesh.rotation.z = -0.4 + (state.enabled ? Math.sin(angle * 0.8) * 0.12 : 0);
          mesh.position.y = state.enabled ? Math.sin(angle * 1.5) * 0.09 : 0;
          renderer.render(scene, camera);
          if (first) {
            first = false;
            setReady(true);
          }
        };
        frame = requestAnimationFrame(draw);
        dispose = () => {
          cancelAnimationFrame(frame);
          resize.disconnect();
          observer.disconnect();
          element.removeEventListener('pointerdown', down);
          element.removeEventListener('pointermove', move);
          element.removeEventListener('pointerup', up);
          element.removeEventListener('pointercancel', up);
          hero.removeEventListener('pointermove', parallax);
          hero.removeEventListener('pointerleave', resetParallax);
          geometries.forEach((g) => g.dispose());
          material.dispose();
          env.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {
        /* The CSS sculpture remains visible when WebGL is unavailable. */
      });
    return () => {
      cancelled = true;
      dispose();
    };
  }, []);
  return (
    <div
      className={`sculpture ${ready ? 'is-ready' : ''}`}
      role="group"
      aria-label="Interactive metallic sculpture"
    >
      <div className="sculpture-fallback" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div
        ref={host}
        className="sculpture-canvas"
        tabIndex={0}
        role="img"
        aria-label="Chrome sculpture. Drag with a mouse or use arrow keys to rotate."
        onKeyDown={(event) => {
          if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
            event.preventDefault();
            if (event.key === 'ArrowLeft') control.current.turn -= 0.16;
            if (event.key === 'ArrowRight') control.current.turn += 0.16;
            if (event.key === 'ArrowUp') control.current.tilt -= 0.16;
            if (event.key === 'ArrowDown') control.current.tilt += 0.16;
          }
        }}
      />
    </div>
  );
}
