import React, { useState, useEffect, useRef, type HTMLAttributes } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  common: string;
  binomial?: string;
  url?: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by?: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [dragging, setDragging] = useState(false);
    const rotationRef = useRef(0);
    const scrollRef = useRef(false);
    const scrollBaseRef = useRef(0);
    const manualOffsetRef = useRef(0);
    const scrollTimeoutRef = useRef<number | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const dragStartRef = useRef({ x: 0, base: 0, active: false });
    const lastPointerRef = useRef({ x: 0, t: 0 });
    const velocityRef = useRef(0);
    const inertiaRef = useRef(0);
    const suppressClickRef = useRef(false);

    const updateRotation = (next: number) => {
      rotationRef.current = next;
      setRotation(next);
    };

    const syncManualOffset = () => {
      manualOffsetRef.current = rotationRef.current - scrollBaseRef.current;
    };

    useEffect(() => {
      const handleScroll = () => {
        scrollRef.current = true;
        if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        scrollBaseRef.current = scrollProgress * 360;
        updateRotation(scrollBaseRef.current + manualOffsetRef.current);

        scrollTimeoutRef.current = window.setTimeout(() => {
          scrollRef.current = false;
        }, 150);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
      };
    }, []);

    useEffect(() => {
      const autoRotate = () => {
        if (inertiaRef.current !== 0) {
          updateRotation(rotationRef.current + inertiaRef.current);
          syncManualOffset();
          inertiaRef.current *= 0.93;
          if (Math.abs(inertiaRef.current) < 0.03) inertiaRef.current = 0;
        } else if (!scrollRef.current && !dragStartRef.current.active) {
          updateRotation(rotationRef.current + autoRotateSpeed);
          syncManualOffset();
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [autoRotateSpeed]);

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      dragStartRef.current = { x: event.clientX, base: rotationRef.current, active: true };
      lastPointerRef.current = { x: event.clientX, t: Date.now() };
      velocityRef.current = 0;
      inertiaRef.current = 0;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragStartRef.current.active) return;
      const now = Date.now();
      const dx = event.clientX - lastPointerRef.current.x;
      const dt = now - lastPointerRef.current.t;
      if (dt > 0) velocityRef.current = velocityRef.current * 0.7 + (dx / dt) * 0.3;
      lastPointerRef.current = { x: event.clientX, t: now };
      const delta = event.clientX - dragStartRef.current.x;
      updateRotation(dragStartRef.current.base + delta * 0.25);
      syncManualOffset();
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragStartRef.current.active) return;
      const moved = Math.abs(event.clientX - dragStartRef.current.x);
      dragStartRef.current.active = false;
      setDragging(false);
      if (moved > 6) suppressClickRef.current = true;
      if (Math.abs(velocityRef.current) > 0.2) {
        inertiaRef.current = velocityRef.current * 2.2;
      }
    };

    const handleCardClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!suppressClickRef.current) return;
      event.preventDefault();
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    };

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative w-full h-full flex items-center justify-center select-none",
          dragging ? "cursor-grabbing" : "cursor-grab",
          className,
        )}
        style={{ perspective: "2000px", touchAction: "pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{ transform: `rotateY(${rotation}deg)`, transformStyle: "preserve-3d" }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const relativeAngle = (itemAngle + (rotation % 360) + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const zIndex = Math.round(100 + (180 - normalizedAngle));
            const isMobile = typeof window !== "undefined" && window.innerWidth <= 767;
            const opacity = isMobile
              ? normalizedAngle > 90
                ? 0
                : 1
              : normalizedAngle > 120
                ? Math.max(0.2, 1 - (normalizedAngle - 120) / 60)
                : 1;
            const faceFlip = normalizedAngle > 90 ? "rotateY(180deg)" : "none";

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                className="circular-gallery-item absolute w-[240px] h-[270px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: "50%",
                  top: "50%",
                  marginLeft: "-120px",
                  marginTop: "-135px",
                  opacity,
                  zIndex,
                }}
              >
                <div
                  className="relative w-full h-full rounded-3xl shadow-2xl overflow-hidden border-2 border-[#b8f230]"
                  style={{ transform: faceFlip }}
                >
                    <img
                      src={item.photo.url}
                      alt={item.photo.text}
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-cover select-none"
                      style={{ objectPosition: item.photo.pos || "center" }}
                      onDragStart={(event) => event.preventDefault()}
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <h2 className="text-xl font-bold">{item.common}</h2>
                    </div>
                  </div>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${item.common} project`}
                      draggable={false}
                      onDragStart={(event) => event.preventDefault()}
                      onClick={handleCardClick}
                      onPointerDown={(e) => e.stopPropagation()}
                      className="circular-gallery-link absolute bottom-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#b8f230] text-[#20221f] shadow-lg transition-transform duration-300 hover:scale-110"
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };