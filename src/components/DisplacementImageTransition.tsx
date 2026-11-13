import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { isReducedMotion } from '../utils/motionVariants';

interface DisplacementImageTransitionProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  onLoaded?: () => void;
}

const VERTEX_SHADER_SRC = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    v_uv.y = 1.0 - v_uv.y; // Flip Y for WebGL texture coords
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision mediump float;
  uniform sampler2D u_from;
  uniform sampler2D u_to;
  uniform float u_progress;
  varying vec2 v_uv;

  void main() {
    vec2 uv = v_uv;
    // Bell curve amplitude peaking at progress = 0.5
    float wave = sin(u_progress * 3.14159265);
    // Controlled sinusoidal displacement
    float displacement = sin(uv.y * 16.0 + u_progress * 4.0) * 0.024 * wave;

    vec2 uvFrom = uv + vec2(displacement * (1.0 - u_progress), 0.0);
    vec2 uvTo = uv - vec2(displacement * u_progress, 0.0);

    vec4 colFrom = texture2D(u_from, clamp(uvFrom, 0.0, 1.0));
    vec4 colTo = texture2D(u_to, clamp(uvTo, 0.0, 1.0));

    // Smoothstep interpolation
    gl_FragColor = mix(colFrom, colTo, smoothstep(0.0, 1.0, u_progress));
  }
`;

export const DisplacementImageTransition: React.FC<DisplacementImageTransitionProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  onLoaded,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [prevSrc, setPrevSrc] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [useWebGL, setUseWebGL] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Detect reduced motion or lack of WebGL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isReducedMotion()) {
        setUseWebGL(false);
      }
    }
  }, []);

  // When src changes, trigger transition
  useEffect(() => {
    if (src !== currentSrc) {
      setPrevSrc(currentSrc);
      setCurrentSrc(src);
      setIsTransitioning(true);
    }
  }, [src, currentSrc]);

  // Handle WebGL shader transition
  useEffect(() => {
    if (!isTransitioning || !prevSrc || !useWebGL) return;

    const canvas = canvasRef.current;
    if (!canvas) {
      setIsTransitioning(false);
      return;
    }

    let gl = glRef.current;
    if (!gl) {
      try {
        gl = canvas.getContext('webgl', {
          alpha: true,
          premultipliedAlpha: false,
          preserveDrawingBuffer: false,
        });
        if (!gl) {
          setUseWebGL(false);
          setIsTransitioning(false);
          return;
        }
        glRef.current = gl;

        // Context loss safety
        canvas.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          glRef.current = null;
          setUseWebGL(false);
          setIsTransitioning(false);
        });
      } catch {
        setUseWebGL(false);
        setIsTransitioning(false);
        return;
      }
    }

    // Compile shaders & link program if not already built
    if (!programRef.current) {
      const compileShader = (type: number, source: string) => {
        const shader = gl!.createShader(type);
        if (!shader) return null;
        gl!.shaderSource(shader, source);
        gl!.compileShader(shader);
        if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
          gl!.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
      const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
      if (!vs || !fs) {
        setUseWebGL(false);
        setIsTransitioning(false);
        return;
      }

      const program = gl.createProgram();
      if (!program) {
        setUseWebGL(false);
        setIsTransitioning(false);
        return;
      }
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        setUseWebGL(false);
        setIsTransitioning(false);
        return;
      }
      programRef.current = program;

      // Setup quad buffer
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

      const aPosition = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    }

    const program = programRef.current;
    if (!program) return;

    gl.useProgram(program);

    // Create textures helper
    const createTexture = (image: HTMLImageElement, unit: number) => {
      const texture = gl!.createTexture();
      gl!.activeTexture(unit === 0 ? gl!.TEXTURE0 : gl!.TEXTURE1);
      gl!.bindTexture(gl!.TEXTURE_2D, texture);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, image);
      return texture;
    };

    // Load both images
    const imgFrom = new Image();
    const imgTo = new Image();
    let loadedCount = 0;

    const onImageLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) {
        // Size canvas
        const rect = canvas.getBoundingClientRect();
        canvas.width = Math.min(rect.width * 1.5, 1200);
        canvas.height = Math.min(rect.height * 1.5, 800);
        gl!.viewport(0, 0, canvas.width, canvas.height);

        const texFrom = createTexture(imgFrom, 0);
        const texTo = createTexture(imgTo, 1);

        const uFromLoc = gl!.getUniformLocation(program, 'u_from');
        const uToLoc = gl!.getUniformLocation(program, 'u_to');
        const uProgLoc = gl!.getUniformLocation(program, 'u_progress');

        gl!.uniform1i(uFromLoc, 0);
        gl!.uniform1i(uToLoc, 1);

        const duration = 520; // 520ms transition duration
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(1.0, elapsed / duration);

          gl!.uniform1f(uProgLoc, progress);
          gl!.drawArrays(gl!.TRIANGLES, 0, 6);

          if (progress < 1.0) {
            animFrameRef.current = requestAnimationFrame(animate);
          } else {
            // Clean up textures and conclude transition
            if (texFrom) gl!.deleteTexture(texFrom);
            if (texTo) gl!.deleteTexture(texTo);
            setIsTransitioning(false);
            setPrevSrc(null);
            onLoaded?.();
          }
        };

        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    imgFrom.crossOrigin = 'anonymous';
    imgTo.crossOrigin = 'anonymous';
    imgFrom.onload = onImageLoaded;
    imgTo.onload = onImageLoaded;
    imgFrom.onerror = () => {
      setIsTransitioning(false);
    };
    imgTo.onerror = () => {
      setIsTransitioning(false);
    };
    imgFrom.src = prevSrc;
    imgTo.src = currentSrc;

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isTransitioning, prevSrc, currentSrc, useWebGL, onLoaded]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Sharp Static Image (Displayed whenever not in active WebGL shader transition) */}
      <img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          isTransitioning && useWebGL ? 'opacity-0' : 'opacity-100'
        } ${imgClassName}`}
      />

      {/* WebGL Wave Displacement Shader Viewport (Active strictly during transitions) */}
      {isTransitioning && useWebGL && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />
      )}

      {/* Clean Framer Motion Fallback (Used when reduced motion is requested or WebGL is disabled) */}
      {!useWebGL && (
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentSrc}
            src={currentSrc}
            alt={alt}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 w-full h-full object-contain ${imgClassName}`}
          />
        </AnimatePresence>
      )}
    </div>
  );
};

