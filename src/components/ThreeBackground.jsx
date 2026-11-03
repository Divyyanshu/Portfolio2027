import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// ---------------------------------------------------------------------
// Colors. Each device has its own color in each theme.
//   light: laptop = green (same as before), desktop = blue, phone = orange
//   dark : laptop = red,  desktop = amber,  phone = magenta
// ---------------------------------------------------------------------
const PALETTE = {
  dark: {
    fog: 0x0e0707,
    body: 0xfff0ec,
    fill: 0x140a0a,
    points: 0xff6a57,
    pointsOpacity: 0.7,
    glow: "radial-gradient(1200px 600px at 80% 0%, rgba(255,77,61,0.14), transparent 60%), radial-gradient(900px 500px at 0% 100%, rgba(255,240,236,0.05), transparent 60%)",
    laptop: {
      accent: 0xff4d3d,
      bg: "#150808",
      kw: "#ff5a48",
      str: "#ffd3c9",
      text: "#c98f86",
      dim: "#6b3b36",
    },
    desktop: {
      accent: 0xffb02e,
      bg: "#150f05",
      kw: "#ffb02e",
      str: "#ffe9c2",
      text: "#c9a46a",
      dim: "#6b5424",
    },
    phone: {
      accent: 0xff4fd8,
      bg: "#150615",
      kw: "#ff6ae0",
      str: "#ffd0f4",
      text: "#c987bd",
      dim: "#6b3262",
    },
  },
  light: {
    fog: 0xf3efe4,
    body: 0x14130f,
    fill: 0xe9e4d4,
    points: 0x5c7800,
    pointsOpacity: 0.55,
    glow: "radial-gradient(1200px 600px at 80% 0%, rgba(198,255,61,0.35), transparent 60%), radial-gradient(900px 500px at 0% 100%, rgba(92,120,0,0.08), transparent 60%)",
    laptop: {
      accent: 0x5c7800,
      bg: "#f7f4ea",
      kw: "#4a6400",
      str: "#14130f",
      text: "#55583f",
      dim: "#b3b79a",
    },
    desktop: {
      accent: 0x0a6c8f,
      bg: "#f1f6f8",
      kw: "#0a6c8f",
      str: "#10222a",
      text: "#47616b",
      dim: "#a4bcc5",
    },
    phone: {
      accent: 0xc2570c,
      bg: "#faf3ec",
      kw: "#b24c08",
      str: "#2a1608",
      text: "#6b4a33",
      dim: "#d3b9a4",
    },
  },
};

// ---------------------------------------------------------------------
// Code shown on each screen
// ---------------------------------------------------------------------
const CODE_LAPTOP = [
  "import { build } from './engine';",
  "",
  "const dev = new Engineer('you');",
  "",
  "async function ship(feature) {",
  "  const code = await dev.write(feature);",
  "  if (!code.passes()) {",
  "    return dev.debug(code);",
  "  }",
  "  await build(code);",
  "  console.log('deployed');",
  "}",
  "",
  "export default function App() {",
  "  const [n, setN] = useState(0);",
  "  return <Scene speed={n} />;",
  "}",
  "",
];
const CODE_DESKTOP = [
  "$ git checkout -b new-feature",
  "$ npm run dev",
  "  ready in 312 ms",
  "",
  "def train(model, data):",
  "    for epoch in range(10):",
  "        loss = model.fit(data)",
  "        print(epoch, loss)",
  "    return model",
  "",
  "class Server:",
  "    def start(self):",
  "        self.listen(8080)",
  "        print('server up')",
  "",
];
const CODE_PHONE = [
  "@Composable",
  "fun Home() {",
  "  val n = remember {",
  "    mutableStateOf(0)",
  "  }",
  "  Button(onClick = {",
  "    n.value++",
  "  }) {",
  '    Text("Taps")',
  "  }",
  "}",
  "",
];
const KEYWORDS = new Set([
  "import",
  "from",
  "const",
  "async",
  "function",
  "await",
  "if",
  "return",
  "export",
  "default",
  "new",
  "useState",
  "def",
  "for",
  "in",
  "range",
  "class",
  "print",
  "fun",
  "val",
  "remember",
  "Button",
  "Text",
  "@Composable",
]);

const isDarkNow = () => document.documentElement.classList.contains("dark");

// Draws scrolling code onto a 2D canvas.
function drawCode(ctx, W, H, lines, c, t, o) {
  ctx.fillStyle = c.bg;
  ctx.fillRect(0, 0, W, H);

  if (o.dots) {
    ctx.fillStyle = c.dim;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(20 + i * 18, o.top / 2, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, o.top, W, H - o.top);
  ctx.clip();

  ctx.font = `${o.font}px ui-monospace, Menlo, Consolas, monospace`;
  ctx.textBaseline = "middle";
  const total = lines.length * o.lh;
  const scroll = o.still ? 0 : (t * o.speed) % total;
  const x0 = o.pad + (o.gutter ? 38 : 0);

  for (let i = 0; i < lines.length * 2; i++) {
    const y = o.top + o.lh / 2 + i * o.lh - scroll;
    if (y < o.top - o.lh || y > H + o.lh) continue;
    const idx = i % lines.length;
    if (o.gutter) {
      ctx.fillStyle = c.dim;
      ctx.fillText(String(idx + 1).padStart(2, " "), o.pad, y);
    }
    let x = x0;
    for (const tok of lines[idx].split(/(\s+|[(){}[\];.,<>=])/)) {
      if (!tok) continue;
      if (KEYWORDS.has(tok)) ctx.fillStyle = c.kw;
      else if (/^['"`]/.test(tok) || /['"`]$/.test(tok)) ctx.fillStyle = c.str;
      else ctx.fillStyle = c.text;
      ctx.fillText(tok, x, y);
      x += ctx.measureText(tok).width;
    }
  }
  ctx.restore();

  if (o.still || Math.floor(t * 2) % 2 === 0) {
    ctx.fillStyle = c.kw;
    ctx.fillRect(W - 34, H - 30, 10, 18);
  }
}

export default function ThreeBackground() {
  const mountRef = useRef(null);
  const [dark, setDark] = useState(isDarkNow);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = () => window.innerWidth < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(PALETTE.dark.fog, 0.03);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile(),
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // --- small helpers ------------------------------------------------
    const disposables = [];
    const track = (o) => {
      disposables.push(o);
      return o;
    };
    const makeMats = () => ({
      line: track(
        new THREE.LineBasicMaterial({ transparent: true, opacity: 0.8 }),
      ),
      body: track(
        new THREE.LineBasicMaterial({ transparent: true, opacity: 0.4 }),
      ),
      key: track(
        new THREE.MeshBasicMaterial({
          wireframe: true,
          transparent: true,
          opacity: 0.55,
        }),
      ),
      fill: track(
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.92 }),
      ),
    });
    const solidBox = (w, h, d, mat) =>
      new THREE.Mesh(track(new THREE.BoxGeometry(w, h, d)), mat);
    const edgesBox = (w, h, d, mat) => {
      const g = track(new THREE.BoxGeometry(w, h, d));
      return new THREE.LineSegments(track(new THREE.EdgesGeometry(g)), mat);
    };
    const keyGrid = (cols, rows, px, pz, kw, kd, zStart, y, mat) => {
      const g = track(new THREE.BoxGeometry(kw, 0.05, kd));
      const mesh = track(new THREE.InstancedMesh(g, mat, cols * rows));
      const m = new THREE.Matrix4();
      let i = 0;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          m.setPosition((c - (cols - 1) / 2) * px, y, zStart + r * pz);
          mesh.setMatrixAt(i++, m);
        }
      return mesh;
    };
    const makeScreen = (pw, ph, cw, ch, lines, opts) => {
      const canvas = document.createElement("canvas");
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext("2d");
      const tex = track(new THREE.CanvasTexture(canvas));
      tex.colorSpace = THREE.SRGBColorSpace;
      const mat = track(new THREE.MeshBasicMaterial({ map: tex, fog: false }));
      const mesh = new THREE.Mesh(track(new THREE.PlaneGeometry(pw, ph)), mat);
      let colors = null;
      const draw = (t) => {
        if (!colors) return;
        drawCode(ctx, cw, ch, lines, colors, t, {
          ...opts,
          still: reduceMotion,
        });
        tex.needsUpdate = true;
      };
      return {
        mesh,
        draw,
        setColors: (c) => {
          colors = c;
          draw(0);
        },
      };
    };

    const devices = [];
    const addDevice = (key, build, extra) => {
      const mats = makeMats();
      const group = new THREE.Group();
      const inner = new THREE.Group();
      group.add(inner);
      const { centerY, screen } = build(inner, mats);
      inner.position.y = -centerY;
      scene.add(group);
      devices.push({ key, group, mats, screen, ...extra });
    };

    // --- DESKTOP (monitor + stand + keyboard) ---------------------------
    addDevice(
      "desktop",
      (g, mats) => {
        const MW = 3.8,
          MH = 2.3;
        const base = solidBox(1.4, 0.06, 0.8, mats.fill);
        base.position.set(0, 0.03, -0.1);
        g.add(base);
        const baseE = edgesBox(1.4, 0.06, 0.8, mats.line);
        baseE.position.copy(base.position);
        g.add(baseE);

        const neck = solidBox(0.28, 0.75, 0.12, mats.fill);
        neck.position.set(0, 0.435, -0.1);
        g.add(neck);
        const neckE = edgesBox(0.28, 0.75, 0.12, mats.line);
        neckE.position.copy(neck.position);
        g.add(neckE);

        const my = 0.8 + MH / 2;
        const mon = solidBox(MW, MH, 0.12, mats.fill);
        mon.position.set(0, my, -0.1);
        g.add(mon);
        const monE = edgesBox(MW, MH, 0.12, mats.line);
        monE.position.copy(mon.position);
        g.add(monE);

        const screen = makeScreen(MW - 0.2, MH - 0.2, 720, 420, CODE_DESKTOP, {
          font: 18,
          lh: 28,
          top: 40,
          pad: 18,
          gutter: false,
          dots: true,
          speed: 20,
        });
        screen.mesh.position.set(0, my, -0.1 + 0.065);
        g.add(screen.mesh);

        const kb = edgesBox(2.4, 0.06, 0.85, mats.body);
        kb.position.set(0, 0.03, 1.05);
        g.add(kb);
        const keys = keyGrid(
          11,
          4,
          0.2,
          0.2,
          0.15,
          0.15,
          0.78,
          0.075,
          mats.key,
        );
        g.add(keys);

        return { centerY: 1.55, screen };
      },
      { yaw: -0.35, pitch: 0.12, z: -2 },
    );

    // --- LAPTOP -----------------------------------------------------------
    addDevice(
      "laptop",
      (g, mats) => {
        const BW = 3.4,
          BD = 2.3,
          LH = 2.2;
        g.add(solidBox(BW, 0.14, BD, mats.fill));
        g.add(edgesBox(BW, 0.14, BD, mats.line));
        g.add(keyGrid(12, 5, 0.26, 0.26, 0.2, 0.2, -0.8, 0.095, mats.key));

        const space = edgesBox(1.5, 0.05, 0.2, mats.body);
        space.position.set(0, 0.095, 0.5);
        g.add(space);
        const pad = edgesBox(1.1, 0.01, 0.55, mats.body);
        pad.position.set(0, 0.075, 0.9);
        g.add(pad);

        const hinge = new THREE.Group();
        hinge.position.set(0, 0.07, -BD / 2);
        hinge.rotation.x = -0.28;
        g.add(hinge);
        const lid = solidBox(BW, LH, 0.09, mats.fill);
        lid.position.y = LH / 2;
        hinge.add(lid);
        const lidE = edgesBox(BW, LH, 0.09, mats.line);
        lidE.position.y = LH / 2;
        hinge.add(lidE);

        const screen = makeScreen(BW - 0.22, LH - 0.22, 640, 400, CODE_LAPTOP, {
          font: 17,
          lh: 26,
          top: 40,
          pad: 14,
          gutter: true,
          dots: true,
          speed: 22,
        });
        screen.mesh.position.set(0, LH / 2, 0.048);
        hinge.add(screen.mesh);

        return { centerY: 1.0, screen };
      },
      { yaw: -0.55, pitch: 0.22, z: -1 },
    );

    // --- PHONE --------------------------------------------------------------
    addDevice(
      "phone",
      (g, mats) => {
        const PW = 1.15,
          PH = 2.3;
        g.add(solidBox(PW, PH, 0.1, mats.fill));
        g.add(edgesBox(PW, PH, 0.1, mats.line));

        const screen = makeScreen(PW - 0.16, PH - 0.3, 300, 600, CODE_PHONE, {
          font: 15,
          lh: 24,
          top: 36,
          pad: 14,
          gutter: false,
          dots: false,
          speed: 18,
        });
        screen.mesh.position.set(0, -0.02, 0.052);
        g.add(screen.mesh);

        const notch = edgesBox(0.3, 0.05, 0.02, mats.body);
        notch.position.set(0, PH / 2 - 0.1, 0.06);
        g.add(notch);
        const bar = edgesBox(0.4, 0.02, 0.01, mats.body);
        bar.position.set(0, -PH / 2 + 0.07, 0.06);
        g.add(bar);

        return { centerY: 0, screen };
      },
      { yaw: 0.4, pitch: 0.1, z: -1.5, roll: 0.08 },
    );

    const byKey = Object.fromEntries(devices.map((d) => [d.key, d]));

    // --- particles ---------------------------------------------------------
    const COUNT = isMobile() ? 500 : 1400;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT * 3; i++)
      positions[i] = (Math.random() - 0.5) * 36;
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.045,
      transparent: true,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // --- layout: three parallel lanes ----------------------------------------
    const layout = { lanes: [0, 0, 0], scale: 1, ampY: 2, ampX: 1 };
    const computeLayout = () => {
      const halfH =
        Math.tan((camera.fov / 2) * (Math.PI / 180)) *
        (camera.position.z + 1.5);
      const halfW = halfH * camera.aspect;
      if (isMobile()) {
        layout.lanes = [-0.55 * halfW, 0.55 * halfW, 0]; // desktop left, laptop right, phone center
        layout.scale = 0.38;
        layout.ampX = 0.12 * halfW;
      } else {
        // [desktop, laptop, phone] -> desktop LEFT, laptop RIGHT, phone CENTER
        layout.lanes = [-0.62 * halfW, 0.62 * halfW, 0];
        layout.scale = Math.min(0.9, Math.max(0.55, halfW / 12));
        layout.ampX = 0.1 * halfW;
      }
      layout.ampY = halfH * 0.36;
    };
    computeLayout();

    // --- theme ------------------------------------------------------------------
    const applyTheme = () => {
      const darkNow = isDarkNow();
      const p = darkNow ? PALETTE.dark : PALETTE.light;
      scene.fog.color.set(p.fog);
      pMat.color.set(p.points);
      pMat.opacity = p.pointsOpacity;
      devices.forEach((d) => {
        const c = p[d.key];
        d.mats.line.color.set(c.accent);
        d.mats.key.color.set(c.accent);
        d.mats.body.color.set(p.body);
        d.mats.fill.color.set(p.fill);
        d.screen.setColors(c);
      });
      setDark(darkNow);
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // --- interaction -----------------------------------------------------------
    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    let scrollY = 0;
    let scrollMax = 0;
    const measureScroll = () => {
      scrollY = window.scrollY;
      scrollMax = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
    };
    measureScroll();
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      computeLayout();
      measureScroll();
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", measureScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // start devices at their first positions (no jump on load)
    const place = (p0) => {
      const { desktop, laptop, phone } = byKey;
      desktop.group.position.set(
        layout.lanes[0],
        -layout.ampY + 2 * layout.ampY * p0,
        desktop.z,
      );
      laptop.group.position.set(
        layout.lanes[1],
        layout.ampY - 2 * layout.ampY * p0,
        laptop.z,
      );
      phone.group.position.set(layout.lanes[2], 0, phone.z);
    };
    place(0);

    // --- loop ----------------------------------------------------------------------
    let raf;
    let lastDraw = 0;
    const clock = new THREE.Clock();
    const ease = 0.06;
    const render = () => {
      const t = clock.getElapsedTime();
      // 0 at the top of the page, 1 at the bottom
      const prog = scrollMax > 0 ? Math.min(1, scrollY / scrollMax) : 0;
      const bob = reduceMotion ? 0 : Math.sin(t * 0.8) * 0.1;

      const { desktop, laptop, phone } = byKey;

      // desktop goes UP while scrolling down
      const dy = -layout.ampY + 2 * layout.ampY * prog + bob;
      desktop.group.position.x +=
        (layout.lanes[0] - desktop.group.position.x) * ease;
      desktop.group.position.y += (dy - desktop.group.position.y) * ease;

      // laptop goes DOWN while scrolling down
      const ly = layout.ampY - 2 * layout.ampY * prog - bob;
      laptop.group.position.x +=
        (layout.lanes[1] - laptop.group.position.x) * ease;
      laptop.group.position.y += (ly - laptop.group.position.y) * ease;

      // phone moves LEFT / RIGHT while scrolling
      const px = layout.lanes[2] + Math.sin(scrollY * 0.004) * layout.ampX;
      phone.group.position.x += (px - phone.group.position.x) * ease;
      phone.group.position.y += (bob * 1.5 - phone.group.position.y) * ease;

      devices.forEach((d, i) => {
        d.group.scale.setScalar(layout.scale * (d.key === "phone" ? 1.2 : 1));
        const sway = reduceMotion ? 0 : Math.sin(t * 0.3 + i * 1.7) * 0.15;
        d.group.rotation.y = d.yaw + sway + mouse.x * 0.3;
        d.group.rotation.x = d.pitch + mouse.y * 0.12;
        d.group.rotation.z = d.roll || 0;
      });

      points.rotation.y = reduceMotion ? 0 : t * 0.012;
      points.rotation.x = reduceMotion ? 0 : t * 0.006;

      // redraw code screens ~12 fps
      if (t - lastDraw > 0.08) {
        devices.forEach((d) => d.screen.draw(t));
        lastDraw = t;
      }

      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 0.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", measureScroll);
      window.removeEventListener("resize", onResize);
      disposables.forEach((d) => d.dispose && d.dispose());
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 transition-[background] duration-300"
      style={{ background: (dark ? PALETTE.dark : PALETTE.light).glow }}
    />
  );
}
