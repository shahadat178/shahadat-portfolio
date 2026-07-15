"use client";

import { useEffect, useRef } from "react";

import styles from "@/components/cursor/PortfolioCursor.module.css";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const DHAKA_TIME_ZONE = "Asia/Dhaka";
const FOLLOW_RATE = 0.62;
const CLOCK_SIZE = 45;
const HAND_SPACING = CLOCK_SIZE / 6.5;
const BULLET = "\u2022";

const CLOCK_NUMBERS = [
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "1",
  "2",
] as const;

const HOUR_HAND = [BULLET, BULLET, BULLET] as const;
const MINUTE_HAND = [BULLET, BULLET, BULLET, BULLET] as const;
const SECOND_HAND = [BULLET, BULLET, BULLET, BULLET, BULLET] as const;

type ClockPalette = {
  date: string;
  face: string;
  seconds: string;
  minutes: string;
  hours: string;
};

type DhakaDate = {
  weekday: string;
  day: string;
  month: string;
  year: string;
};

type DhakaTime = {
  hours: number;
  minutes: number;
  seconds: number;
};

function getThemePalette(): ClockPalette {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const accent = rootStyles.getPropertyValue("--lg-accent").trim() || "#526dff";
  const text =
    rootStyles.getPropertyValue("--lg-text-strong").trim() || "#071b43";

  return {
    date: accent,
    face: text,
    seconds: "#ff4d67",
    minutes: text,
    hours: text,
  };
}

function getDhakaDate(date: Date): DhakaDate {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: DHAKA_TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);

  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value || "";

  return {
    weekday: value("weekday").toUpperCase(),
    day: value("day"),
    month: value("month").toUpperCase(),
    year: value("year"),
  };
}

function getDhakaTime(date: Date): DhakaTime {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: DHAKA_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const number = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value || 0);

  return {
    hours: number("hour"),
    minutes: number("minute"),
    seconds: number("second"),
  };
}

export function OrbitTimeCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const finePointer = window.matchMedia(FINE_POINTER_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const date = getDhakaDate(new Date());
    const dateCharacters = (
      ` ${date.weekday} ${date.day} ${date.month} ${date.year}`
    ).split("");
    const particleCount =
      dateCharacters.length +
      CLOCK_NUMBERS.length +
      HOUR_HAND.length +
      MINUTE_HAND.length +
      SECOND_HAND.length +
      1;
    const delayedX = new Array<number>(particleCount).fill(0);
    const delayedY = new Array<number>(particleCount).fill(0);
    const positionX = new Array<number>(particleCount).fill(0);
    const positionY = new Array<number>(particleCount).fill(0);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pointerX = width / 2;
    let pointerY = height / 2;
    let palette = getThemePalette();
    let animationFrame = 0;
    let latestTime = getDhakaTime(new Date());
    let nextClockReadAt = 0;
    let hasPointerPosition = false;

    const canRender = () => finePointer.matches && !reducedMotion.matches;

    const resizeCanvas = () => {
      const density = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(density, 0, 0, density, 0, 0);
      context.font = '600 10px "Segoe UI", Arial, sans-serif';
      context.textAlign = "center";
      context.textBaseline = "middle";
    };

    const updatePositions = () => {
      const edgeBuffer = 80;

      positionY[0] = Math.round(
        (delayedY[0] += (pointerY - delayedY[0]) * FOLLOW_RATE)
      );
      positionX[0] = Math.round(
        (delayedX[0] += (pointerX - delayedX[0]) * FOLLOW_RATE)
      );

      for (let index = 1; index < particleCount; index += 1) {
        positionY[index] = Math.round(
          (delayedY[index] +=
            (positionY[index - 1] - delayedY[index]) * FOLLOW_RATE)
        );
        positionX[index] = Math.round(
          (delayedX[index] +=
            (positionX[index - 1] - delayedX[index]) * FOLLOW_RATE)
        );

        if (delayedY[index - 1] >= height - edgeBuffer) {
          delayedY[index - 1] = height - edgeBuffer;
        }

        if (delayedX[index - 1] >= width - edgeBuffer) {
          delayedX[index - 1] = width - edgeBuffer;
        }
      }
    };

    const drawCharacter = (
      character: string,
      x: number,
      y: number,
      color: string
    ) => {
      context.fillStyle = color;
      context.fillText(character, x, y);
    };

    const drawClock = (now: number) => {
      context.clearRect(0, 0, width, height);

      if (now >= nextClockReadAt) {
        latestTime = getDhakaTime(new Date());
        nextClockReadAt = now + 250;
      }

      const secondAngle = (Math.PI * (latestTime.seconds - 15)) / 30;
      const minuteAngle = (Math.PI * (latestTime.minutes - 15)) / 30;
      const hourAngle =
        (Math.PI * (latestTime.hours - 3)) / 6 +
        (Math.PI * latestTime.minutes) / 360;
      const faceStep = 360 / CLOCK_NUMBERS.length;
      const dateStep = 360 / dateCharacters.length;

      dateCharacters.forEach((character, index) => {
        const angle = -secondAngle + (index * dateStep * Math.PI) / 180;
        drawCharacter(
          character,
          delayedX[index] + CLOCK_SIZE * 1.5 * Math.cos(angle),
          delayedY[index] + CLOCK_SIZE * 1.5 * Math.sin(angle),
          palette.date
        );
      });

      CLOCK_NUMBERS.forEach((number, index) => {
        const particleIndex = dateCharacters.length + index;
        const angle = (index * faceStep * Math.PI) / 180;
        drawCharacter(
          number,
          delayedX[particleIndex] + CLOCK_SIZE * Math.cos(angle),
          delayedY[particleIndex] + CLOCK_SIZE * Math.sin(angle),
          palette.face
        );
      });

      HOUR_HAND.forEach((character, index) => {
        const particleIndex = dateCharacters.length + CLOCK_NUMBERS.length + index;
        drawCharacter(
          character,
          delayedX[particleIndex] + index * HAND_SPACING * Math.cos(hourAngle),
          delayedY[particleIndex] + index * HAND_SPACING * Math.sin(hourAngle),
          palette.hours
        );
      });

      MINUTE_HAND.forEach((character, index) => {
        const particleIndex =
          dateCharacters.length +
          CLOCK_NUMBERS.length +
          HOUR_HAND.length +
          index;
        drawCharacter(
          character,
          delayedX[particleIndex] + index * HAND_SPACING * Math.cos(minuteAngle),
          delayedY[particleIndex] + index * HAND_SPACING * Math.sin(minuteAngle),
          palette.minutes
        );
      });

      SECOND_HAND.forEach((character, index) => {
        const particleIndex =
          dateCharacters.length +
          CLOCK_NUMBERS.length +
          HOUR_HAND.length +
          MINUTE_HAND.length +
          index;
        drawCharacter(
          character,
          delayedX[particleIndex] + index * HAND_SPACING * Math.cos(secondAngle),
          delayedY[particleIndex] + index * HAND_SPACING * Math.sin(secondAngle),
          palette.seconds
        );
      });
    };

    const loop = (now: number) => {
      updatePositions();
      drawClock(now);
      animationFrame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (!canRender() || animationFrame !== 0) {
        return;
      }

      canvas.dataset.visible = "true";
      animationFrame = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      canvas.dataset.visible = "false";

      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }

      context.clearRect(0, 0, width, height);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!canRender() || event.pointerType !== "mouse") {
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!hasPointerPosition) {
        delayedX.fill(pointerX);
        delayedY.fill(pointerY);
        positionX.fill(pointerX);
        positionY.fill(pointerY);
        hasPointerPosition = true;
      }

      canvas.dataset.visible = "true";
      start();
    };

    const handleCapabilityChange = () => {
      if (canRender()) {
        start();
      } else {
        stop();
      }
    };

    const themeObserver = new MutationObserver(() => {
      palette = getThemePalette();
    });

    resizeCanvas();
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [
        "data-glass-theme",
        "data-glass-mode",
        "data-appearance-transition",
        "data-theme-transition",
        "class",
        "style",
      ],
    });
    delayedX.fill(pointerX);
    delayedY.fill(pointerY);
    positionX.fill(pointerX);
    positionY.fill(pointerY);
    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("focus", start);
    window.addEventListener("blur", stop);
    finePointer.addEventListener("change", handleCapabilityChange);
    reducedMotion.addEventListener("change", handleCapabilityChange);
    start();

    return () => {
      stop();
      themeObserver.disconnect();
      document.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("focus", start);
      window.removeEventListener("blur", stop);
      finePointer.removeEventListener("change", handleCapabilityChange);
      reducedMotion.removeEventListener("change", handleCapabilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.clockCanvas}
      data-visible="false"
      aria-hidden="true"
    />
  );
}
