import React, { useCallback, useRef, useState } from "react";
import "./BeforeAfter.scss";
import { FiChevronsLeft, FiChevronsRight, FiMaximize2 } from "react-icons/fi";
import { trackGoal } from "../../utils/metrika";

const BeforeAfter = ({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  caption,
  onExpand,
  isLarge = false,
}) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const trackedRef = useRef(false);

  const updatePosition = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(2, Math.min(98, raw));
    setPosition(clamped);
  }, []);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (!trackedRef.current) {
      trackedRef.current = true;
      trackGoal("view_portfolio_ba", { case: caption });
    }
    setIsDragging(true);
    if (e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (_) {}
    }
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    e.stopPropagation();
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(2, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(98, p + 4));
    }
  };

  return (
    <div className={`ba-card ${isLarge ? "ba-card--large" : ""}`}>
      <div
        ref={containerRef}
        className={`ba-viewport swiper-no-swiping ${isDragging ? "is-dragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <img
          src={afterSrc}
          alt={afterAlt}
          className="ba-img ba-img--after"
          loading={isLarge ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />

        <div
          className="ba-before-layer"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={beforeSrc}
            alt={beforeAlt}
            className="ba-img ba-img--before"
            loading={isLarge ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
          />
        </div>

        <span className="ba-badge ba-badge--before">До</span>
        <span className="ba-badge ba-badge--after">После</span>

        <div
          className="ba-divider"
          style={{ left: `${position}%` }}
          role="slider"
          tabIndex={0}
          aria-label="Сравнение до и после лечения"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onKeyDown={handleKeyDown}
        >
          <div className="ba-handle">
            <FiChevronsLeft />
            <FiChevronsRight />
          </div>
        </div>
      </div>

      {caption && (
        <div className="ba-caption">
          <span>{caption}</span>
          {onExpand && (
            <button
              type="button"
              className="ba-expand-btn"
              onClick={(e) => {
                e.stopPropagation();
                onExpand();
              }}
              aria-label={`Развернуть пример: ${caption}`}
              title="Открыть в крупном формате"
            >
              <FiMaximize2 />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BeforeAfter;
