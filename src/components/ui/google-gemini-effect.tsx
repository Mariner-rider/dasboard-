"use client";
import { cn } from "@/lib/utils";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * RivinityFlow — scroll-driven signature animation.
 *
 * Wave lines enter from the left, synchronize, then morph into the
 * uploaded Rivinity logo. The logo geometry is NEVER recreated: the
 * two <path d="…"> strings below are copied verbatim from the user's
 * uploaded SVG (rivinity_logo_page4.svg). We sample those exact paths
 * via getPointAtLength for the morph targets, and cross-fade to the
 * real inline <path> elements at the identity frame so the final frame
 * is pixel-identical to the uploaded SVG.
 */

const VIEW_W = 1200;
const VIEW_H = 520;
const CENTER: Pt = [VIEW_W / 2, VIEW_H / 2];
const SAMPLES = 96;

// -------- Source SVG (uploaded, immutable) --------
// Copied verbatim from user-uploads://rivinity_logo_page4.svg.
// Each path has its own matrix(1,0,0,-1,tx,ty) transform that flips Y.
const LOGO_GRADIENT_ID = "rivinity-logo-gradient";
// Four-stop gradient matching the wave line palette.
const LOGO_GRADIENT_STOPS: { offset: string; color: string }[] = [
  { offset: "0%", color: "#FD881F" },   // orange
  { offset: "35%", color: "#F5A9D0" },  // pink
  { offset: "70%", color: "#D8A5F2" },  // soft violet
  { offset: "100%", color: "#BFA7F8" }, // lavender
];
const RAW_PATHS: { d: string; tx: number; ty: number }[] = [
  {
    tx: 429.7005,
    ty: 266.52943,
    d: "M0 0C25.641-11.594 49.438-26.789 70.795-45.206 91.933-27.181 115.464-12.309 140.792-.966 122.576 29.845 98.81 56.443 70.111 78.129 41.755 56.687 18.183 30.418 0 0M-136.614 2.983C-144.579-31.64-145.776-66.907-140.174-101.908-114.401-94.709-87.733-91.061-60.87-91.061-59.846-91.061-58.821-91.067-57.798-91.076-53.24-63.636-44.813-37.02-32.73-11.897-61.709-1.795-92.038 3.324-122.918 3.324-127.462 3.324-132.063 3.209-136.614 2.983M200.2-91.958C227.655-91.958 254.936-95.788 281.324-103.345 287.168-68.367 286.207-33.089 278.458 1.581 273.298 1.872 268.075 2.02 262.913 2.02 232.38 2.02 202.292-3.004 173.452-12.916 185.372-37.963 193.676-64.537 198.15-91.963 198.834-91.96 199.518-91.958 200.2-91.958M-246.805-187.389C-230.66-219.05-208.93-246.86-182.181-270.098-166.483-247.178-147.589-226.6-125.983-208.889-140.151-184.849-150.791-159.01-157.635-132.028-190.76-144.615-220.744-163.232-246.805-187.389M266.427-210.198C287.875-228.025 306.622-248.734 322.198-271.802 349.117-248.703 371.029-221.045 387.367-189.545 361.466-165.209 331.602-146.401 298.563-133.611 291.524-160.566 280.721-186.312 266.427-210.198M-209.006-404.069C-176.337-417.974-141.827-425.326-106.374-425.936-109.057-398.225-107.781-370.312-102.577-342.905-128.821-333.621-153.569-320.652-176.194-304.329-193.49-335.218-204.525-368.756-209.006-404.069M242.124-344.083C247.123-371.523 248.215-399.446 245.375-427.147 280.774-426.746 315.317-419.616 348.111-405.94 343.901-370.789 333.095-337.132 315.984-306.022 293.235-322.161 268.404-334.957 242.124-344.083M13.135-402.826C15.867-408.672 18.829-414.395 21.937-419.839 34.639-442.46 50.552-463.126 69.256-481.306 88.028-463.362 104.092-442.799 117.026-420.155 120.118-414.815 123.124-409.118 125.962-403.215L126.798-401.477 128.551-402.284C134.441-404.993 140.39-407.474 146.236-409.659 170.622-418.86 196.113-424.491 222.036-426.405 224.892-400.578 223.99-374.478 219.353-348.793 218.272-342.612 216.916-336.329 215.324-330.107L214.845-328.233 216.711-327.728C222.944-326.036 229.113-324.112 235.046-322.012 259.634-313.415 282.773-301.359 303.855-286.168 289.498-264.568 272.064-245.159 252.009-228.447 247.126-224.346 242.03-220.384 236.853-216.665L235.281-215.534 236.391-213.948C239.981-208.805 243.482-203.371 246.795-197.795 260.115-175.443 270.115-151.335 276.528-126.108 251.681-118.848 225.988-115.167 200.131-115.167L198.882-115.171C192.555-115.202 186.119-115.453 179.75-115.92L177.83-116.062 177.652-114.144C177.085-108.012 176.278-101.797 175.186-95.142 170.921-69.553 163.059-44.769 151.816-21.452 128.049-31.935 105.999-45.733 86.252-62.483 81.057-66.875 76.418-71.094 72.071-75.384L70.689-76.748 69.31-75.378C64.489-70.59 59.873-66.34 55.198-62.389 35.19-45.211 12.907-31.119-11.071-20.475-22.468-43.824-30.452-68.674-34.807-94.366-35.861-100.555-36.714-106.947-37.34-113.368L-37.528-115.292-39.456-115.133C-45.827-114.604-52.266-114.32-58.599-114.288L-61.105-114.276C-86.277-114.276-111.304-117.784-135.531-124.705-129.296-149.888-119.451-174.071-106.254-196.611-103.23-201.829-99.877-207.123-96.001-212.802L-94.91-214.4-96.495-215.513C-101.553-219.066-106.669-222.994-111.695-227.186-131.823-243.706-149.403-262.995-163.979-284.551-142.969-299.912-119.892-312.129-95.357-320.878-89.457-323.01-83.32-324.965-77.108-326.691L-75.246-327.208-75.734-329.078C-77.405-335.469-78.802-341.753-79.888-347.756-84.705-373.435-85.79-399.538-83.121-425.376-57.116-423.613-31.586-418.147-7.206-409.12-1.491-407.026 4.317-404.654 10.556-401.866L12.316-401.08ZM-79.775-448.367C-73.201-483.209-60.13-515.995-40.897-545.877-6.886-535.517 24.3-518.991 51.851-496.732 32.006-477.206 15.056-455.012 1.429-430.703-24.667-440.404-51.969-446.344-79.775-448.367M86.639-496.847C114.048-519.323 145.125-536.061 179.058-546.629 198.353-517.083 211.691-484.316 218.564-449.39 190.84-447.185 163.584-441.053 137.485-431.151 123.755-455.34 106.664-477.422 86.639-496.847M187.61-573.147 187.37-573.086C180.878-571.432 174.184-569.472 167.472-567.255 131.354-555.352 98.3-536.941 69.203-512.519 39.935-536.745 6.745-554.948-29.467-566.63-36.126-568.753-42.839-570.662-49.427-572.302L-50.467-572.561-51.385-571.694-51.527-571.511C-55.52-565.944-59.388-560.144-63.025-554.274-83.1-521.861-96.604-486.51-103.176-449.181-141.132-448.972-178.273-441.611-213.601-427.29-220.11-424.621-226.471-421.776-232.516-418.829L-233.618-418.292V-417.066C-233.112-410.084-232.355-403.144-231.363-396.263-225.933-358.53-213.591-322.765-194.672-289.926-223.626-265.367-247.364-235.883-265.245-202.269-268.512-196.056-271.56-189.779-274.308-183.603L-274.476-183.224V-182.005L-273.915-181.402C-268.922-176.309-263.881-171.48-258.933-167.054-230.581-141.634-198.146-122.138-162.509-109.091-168.943-71.619-168.198-33.773-160.294 3.418-158.7 10.726-157.062 17.294-155.288 23.504L-155.155 23.964-154.326 24.846-153.567 24.951C-146.531 25.66-139.57 26.129-132.877 26.344-129.578 26.455-126.28 26.509-122.979 26.509-88.273 26.509-54.213 20.557-21.721 8.816-2.596 41.686 22.28 70.23 52.234 93.669 57.687 97.911 63.322 102.013 68.99 105.866L69.49 106.206H70.697L71.23 105.866C76.995 101.946 82.634 97.832 87.988 93.638 118.25 69.956 143.327 41.086 162.546 7.806 194.837 19.368 228.611 25.229 262.959 25.229 266.94 25.229 270.926 25.15 274.907 24.989 281.989 24.662 288.933 24.141 295.559 23.437L296.216 23.368 297.095 22.541 297.274 21.985C299.077 15.534 300.719 8.743 302.154 1.801 309.807-35.459 310.299-73.293 303.622-110.68 339.172-123.981 371.481-143.695 399.668-169.298 404.635-173.831 409.63-178.688 414.523-183.739L415.075-184.308V-185.531L414.897-185.952C411.902-192.501 408.8-198.757 405.679-204.544 387.656-237.947 363.738-267.264 334.574-291.706 353.273-324.719 365.374-360.582 370.548-398.323 371.454-405.062 372.157-411.998 372.638-418.948L372.702-419.873 371.803-420.72 371.492-420.883C365.198-423.889 358.802-426.681 352.483-429.185 317.224-443.232 280.081-450.356 242.101-450.356 242.099-450.356 242.03-450.354 242.03-450.354 235.17-487.66 221.415-522.927 201.131-555.199 197.437-561.026 193.515-566.791 189.472-572.34L188.884-573.147Z",
  },
  {
    tx: 462.4212,
    ty: 601.4557,
    d: "M0 0C1.081-.402 2.161-.772 3.273-1.142 4.526-1.646 5.629-2.077 6.766-2.476L7.237-2.64 7.572-3.012C10.916-6.714 14.581-10.494 18.465-14.248 19.32-15.131 20.124-15.94 20.96-16.654 26.193-21.675 31.538-26.388 36.94-30.747 42.397-26.394 47.804-21.709 53.031-16.81L55.537-14.395C59.124-10.985 62.699-7.348 66.501-3.246L66.804-2.909C67.587-2.064 68.388-1.171 69.157-.278L69.867 .55 70.944 .383C72.138 .199 73.332 .013 74.554-.107H74.688L75.006-.18C80.17-.891 85.501-1.458 90.846-1.866L94.054-2.085C99.704-2.435 105.464-2.614 111.178-2.614 112.565-2.614 113.954-2.602 115.345-2.583 116.73 4.282 117.863 11.349 118.716 18.446 118.857 19.483 118.968 20.511 119.078 21.521L119.124 21.95C119.681 27.118 120.091 32.385 120.342 37.603 120.432 39.095 120.463 40.235 120.492 41.374L120.522 42.473 121.48 43.236C122.486 43.817 123.492 44.426 124.468 45.066L124.621 45.215 124.851 45.309C129.3 48.091 133.762 51.105 138.116 54.267 139.012 54.876 139.857 55.482 140.702 56.145 146.272 60.203 151.852 64.646 157.351 69.404 153.889 75.759 150.172 81.964 146.288 87.865 145.713 88.787 145.106 89.666 144.502 90.544 141.595 94.933 138.56 99.197 135.445 103.27L135.253 103.521 135.226 103.594C134.312 104.816 133.544 105.807 132.751 106.771L132.059 107.608 133.693 112.575C135.339 117.888 136.759 122.942 137.993 127.941 138.277 128.988 138.52 129.988 138.733 131.017 140.336 137.69 141.714 144.632 142.847 151.726 136.523 154.207 129.84 156.521 122.958 158.616 121.938 158.924 120.917 159.235 119.896 159.512 115 160.973 109.896 162.308 104.68 163.49L99.369 164.649 97.476 169.35 99.133 170.472 97.321 169.719C95.313 174.554 93.138 179.367 90.856 184.027 90.339 185.094 89.904 185.992 89.44 186.862 86.393 193.005 83 199.194 79.317 205.32 72.776 203.114 66.175 200.595 59.676 197.816 58.678 197.41 57.739 197.019 56.8 196.563 52.086 194.529 47.352 192.281 42.65 189.85L42.441 189.742 42.213 189.687C41.082 189.068 39.866 188.443 38.649 187.788L37.706 187.282 36.771 187.799C35.604 188.443 34.439 189.089 33.242 189.671L33.025 189.729 32.813 189.888C28.061 192.377 23.345 194.655 18.797 196.661 17.796 197.144 16.827 197.567 15.857 197.962 9.722 200.65 3.148 203.212-3.742 205.598-7.381 199.66-10.822 193.501-13.982 187.276-14.349 186.6-14.664 185.977-14.978 185.356L-15.497 184.335C-17.886 179.493-20.073 174.713-21.977 170.156L-22.016 169.999-22.14 169.798C-22.671 168.552-23.2 167.307-23.698 166.06L-24.096 165.063-25.152 164.862C-26.446 164.615-27.739 164.337-29.032 164.031L-29.256 163.977H-29.486C-34.39 162.867-39.484 161.586-44.623 160.118L-47.762 159.229C-54.539 157.209-61.387 154.879-68.107 152.306-67.022 145.274-65.652 138.267-64.029 131.452-63.862 130.651-63.677 129.907-63.495 129.173L-63.276 128.281C-61.998 123.113-60.548 117.941-58.967 112.919L-57.428 108.037-58.084 107.227C-58.856 106.269-59.597 105.313-60.337 104.324L-60.609 103.987C-63.717 99.961-66.71 95.813-69.758 91.306-70.467 90.339-71.067 89.404-71.672 88.438-75.549 82.621-79.254 76.528-82.726 70.266-77.472 65.642-71.933 61.149-66.242 56.896-65.378 56.248-64.518 55.602-63.627 54.985-59.222 51.764-54.799 48.739-50.435 45.963L-50.147 45.782C-49.139 45.108-48.101 44.468-47.062 43.857L-46.097 43.288V42.167C-46.097 41.004-46.037 39.871-45.978 38.71L-45.966 38.501-45.995 38.199C-45.754 32.901-45.376 27.666-44.847 22.504-44.752 21.333-44.631 20.168-44.476 19.005-43.669 11.824-42.585 4.779-41.249-1.997-39.141-2.046-37.039-2.071-34.939-2.071-29.9-2.071-24.874-1.928-19.998-1.644-18.81-1.581-17.63-1.518-16.449-1.426-11.514-1.1-6.446-.6-.933 .107L-.454 .169ZM35.731-58.996C30.483-55.246 25.214-51.17 19.626-46.537 10.966-39.325 2.75-31.655-4.809-23.723-14.89-24.761-25.074-25.286-35.098-25.286L-38.289-25.269C-45.261-25.206-52.1-24.895-58.611-24.349L-60.002-24.234-60.346-22.88C-62.09-16.043-63.541-9.354-64.66-2.997-66.664 7.936-68.061 19.109-68.808 30.216-78.066 36.476-87.005 43.295-95.389 50.5-100.329 54.677-105.234 59.178-110.377 64.253L-111.369 65.232-110.772 66.491C-107.961 72.418-104.87 78.311-101.323 84.504-95.872 94.132-89.756 103.59-83.136 112.622-86.213 123.4-88.693 134.393-90.505 145.314-91.64 151.887-92.536 158.664-93.169 165.443L-93.297 166.834-92.025 167.41C-86.022 170.137-79.865 172.676-73.207 175.174-62.692 179.081-51.785 182.436-40.768 185.151-36.275 195.157-31.111 205.073-25.411 214.632-21.995 220.422-18.293 226.193-14.415 231.777L-13.619 232.923-12.276 232.547C-5.589 230.683 .941 228.592 7.135 226.331 17.66 222.576 27.963 218.213 37.76 213.362 47.651 218.171 58.005 222.472 68.553 226.153 74.941 228.408 81.477 230.457 87.974 232.237L89.321 232.605 90.113 231.453C93.945 225.862 97.616 220.06 101.019 214.207 106.679 204.55 111.779 194.592 116.188 184.605 126.903 181.888 137.596 178.537 147.985 174.638 154.335 172.245 160.647 169.61 166.749 166.811L168.02 166.226 167.884 164.835C167.205 157.88 166.297 151.076 165.188 144.611 163.327 133.655 160.838 122.736 157.79 112.142 164.379 103.065 170.509 93.458 176.017 83.571 179.269 77.844 182.415 71.762 185.364 65.51L185.962 64.244 184.96 63.267C180.064 58.499 174.977 53.891 169.838 49.572 161.268 42.324 152.279 35.578 143.109 29.509 142.298 18.408 140.842 7.237 138.773-3.715 137.575-10.132 136.083-16.796 134.337-23.518L133.985-24.878 132.584-24.982C125.93-25.476 119.085-25.742 112.239-25.773L110.651-25.777C99.94-25.777 89.223-25.175 78.787-23.985 71.193-31.885 62.902-39.515 54.135-46.673 48.929-50.988 43.497-55.141 37.999-59.005L36.861-59.804Z",
  },
];

// How many wave lines morph into each SVG path (must sum to COUNT).
const WAVES_PER_PATH = [11, 6];
const COUNT = WAVES_PER_PATH.reduce((a, b) => a + b, 0);
const FIT_SIZE = 360;

// Palette — Rivinity accents.
const COLORS = [
  "hsl(22, 95%, 60%)",   // orange
  "hsl(280, 78%, 66%)",  // purple
  "hsl(330, 85%, 68%)",  // pink
  "hsl(258, 88%, 74%)",  // soft violet
];

type Pt = [number, number];

// -------- Sample the immutable SVG paths --------
// Returns (a) morph-target polylines in effect space, and (b) a transform
// that maps svg-space → effect-space for the overlay group.
function sampleUploadedSvg(): {
  targets: Pt[][];
  fit: { scale: number; tx: number; ty: number };
} {
  if (typeof document === "undefined") {
    return { targets: [], fit: { scale: 1, tx: 0, ty: 0 } };
  }
  const svgNS = "http://www.w3.org/2000/svg";
  const holder = document.createElementNS(svgNS, "svg");
  holder.setAttribute("width", "0");
  holder.setAttribute("height", "0");
  holder.style.position = "absolute";
  holder.style.visibility = "hidden";
  document.body.appendChild(holder);

  const rawSubs: Pt[][] = [];
  RAW_PATHS.forEach((rp, pi) => {
    const p = document.createElementNS(svgNS, "path");
    p.setAttribute("d", rp.d);
    holder.appendChild(p);
    const total = p.getTotalLength();
    const K = WAVES_PER_PATH[pi];
    for (let k = 0; k < K; k++) {
      const startL = (k / K) * total;
      const endL = ((k + 1) / K) * total;
      const pts: Pt[] = new Array(SAMPLES);
      for (let i = 0; i < SAMPLES; i++) {
        const l = startL + (endL - startL) * (i / (SAMPLES - 1));
        const pt = p.getPointAtLength(l);
        // Apply the path's own matrix(1,0,0,-1,tx,ty) transform.
        pts[i] = [pt.x + rp.tx, rp.ty - pt.y];
      }
      rawSubs.push(pts);
    }
  });
  document.body.removeChild(holder);

  // Fit bounding box → centered FIT_SIZE box around CENTER.
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const sub of rawSubs) {
    for (const [x, y] of sub) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  const w = maxX - minX;
  const h = maxY - minY;
  const scale = FIT_SIZE / Math.max(w, h);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const tx = CENTER[0] - cx * scale;
  const ty = CENTER[1] - cy * scale;

  const targets = rawSubs.map((sub) =>
    sub.map(([x, y]) => [x * scale + tx, y * scale + ty] as Pt),
  );
  return { targets, fit: { scale, tx, ty } };
}

// -------- Wave geometry --------
function buildWave(
  index: number,
  count: number,
  entry: number,
  calm: number,
): Pt[] {
  const midline = VIEW_H / 2;
  const rowOffset = (index - (count - 1) / 2) * 11;
  const baseAmp = 40 + (index % 4) * 14;
  const amp = baseAmp * (1 - calm) + 6 * calm;
  const freq = 1.2 + (index % 5) * 0.32;
  const phase = index * 0.73;
  const shift = entry * VIEW_W * 1.1;
  const pts: Pt[] = new Array(SAMPLES);
  for (let i = 0; i < SAMPLES; i++) {
    const t = i / (SAMPLES - 1);
    const x = -80 + t * (VIEW_W + 160) + shift;
    const env = Math.sin(Math.PI * t);
    const y =
      midline +
      rowOffset * (1 - calm * 0.35) +
      amp * env * Math.sin(t * Math.PI * 2 * freq + phase);
    pts[i] = [x, y];
  }
  return pts;
}

// -------- Utilities --------
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
const easeInOut = (v: number) => {
  const t = clamp01(v);
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

function lerpPts(a: Pt[], b: Pt[], t: number): Pt[] {
  const out: Pt[] = new Array(a.length);
  for (let i = 0; i < a.length; i++) {
    out[i] = [
      a[i][0] + (b[i][0] - a[i][0]) * t,
      a[i][1] + (b[i][1] - a[i][1]) * t,
    ];
  }
  return out;
}

// Catmull-Rom → cubic Bezier.
function toPath(pts: Pt[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d;
}

interface FlowProps {
  progress: MotionValue<number>;
}

const RivinityFlowSVG: React.FC<FlowProps> = ({ progress }) => {
  const [{ targets, fit }, setSampled] = useState<{
    targets: Pt[][];
    fit: { scale: number; tx: number; ty: number };
  }>(() => ({ targets: [], fit: { scale: 1, tx: 0, ty: 0 } }));

  useEffect(() => {
    setSampled(sampleUploadedSvg());
  }, []);

  const initialWavePaths = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) =>
        toPath(buildWave(i, COUNT, -1, 0)),
      ),
    [],
  );
  const [paths, setPaths] = useState<string[]>(initialWavePaths);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [strokeOpacity, setStrokeOpacity] = useState(1);
  const frameRef = useRef<number | null>(null);
  const latestProgressRef = useRef(0);
  const lastRunRef = useRef(0);
  const prefersReducedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      prefersReducedRef.current = mq.matches;
      if (mq.matches && frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Strict throttle: coalesce all scroll updates into at most one
  // recompute per MIN_INTERVAL_MS via rAF buffering. Prevents the
  // preview from freezing on fast/continuous scroll.
  const MIN_INTERVAL_MS = 32; // ~30fps
  useMotionValueEvent(progress, "change", (v) => {
    latestProgressRef.current = v;
    // Reduced-motion: never run scroll-driven updates.
    if (prefersReducedRef.current) return;
    if (frameRef.current !== null) return;

    const schedule = () => {
      frameRef.current = window.requestAnimationFrame(() => {
        const now =
          typeof performance !== "undefined" ? performance.now() : Date.now();
        const since = now - lastRunRef.current;
        if (since < MIN_INTERVAL_MS) {
          // Not enough time elapsed — re-queue instead of running now.
          schedule();
          return;
        }
        frameRef.current = null;
        lastRunRef.current = now;
        if (prefersReducedRef.current) return;
        const p = clamp01(latestProgressRef.current);

      const entryT = smooth(p / 0.25);
      const calmIn = smooth((p - 0.20) / 0.20);
      const exitT = smooth((p - 0.82) / 0.18);

      let morph = 0;
      if (p < 0.25) morph = 0;
      else if (p < 0.45) morph = easeInOut((p - 0.25) / 0.20) * 0.55;
      else if (p < 0.60) morph = 0.55 + easeInOut((p - 0.45) / 0.15) * 0.37;
      else if (p < 0.70) morph = 0.92 + easeInOut((p - 0.60) / 0.10) * 0.08;
      else if (p <= 0.78) morph = 1;
      else if (p < 0.95) morph = 1 - easeInOut((p - 0.78) / 0.17);
      else morph = 0;

      const entry = -1 * (1 - entryT) + exitT * 1;
      let calm = Math.min(1, calmIn);
      if (p > 0.78) calm = Math.max(0, 1 - easeInOut((p - 0.78) / 0.17));

      const hasTargets = targets.length === COUNT;
      const next: string[] = new Array(COUNT);
      for (let i = 0; i < COUNT; i++) {
        const wave = buildWave(i, COUNT, entry, calm);
        const pts =
          morph > 0 && hasTargets ? lerpPts(wave, targets[i], morph) : wave;
        next[i] = toPath(pts);
      }
      setPaths(next);

      // Cross-fade: at morph ≥ 0.9, reveal the pixel-identical inline SVG
      // and fade the wave strokes out so the final frame is the uploaded logo.
      const overlay = hasTargets ? smooth((morph - 0.9) / 0.1) : 0;
      setOverlayOpacity(overlay);
      setStrokeOpacity(1 - overlay);
      });
    };
    schedule();
  });

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      className="block"
      aria-hidden="true"
    >
      {paths.map((d, i) => {
        const color = COLORS[i % COLORS.length];
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={strokeOpacity}
            style={{ willChange: "d, opacity" }}
          />
        );
      })}

      {/* Gradient matching the wave line palette. */}
      <defs>
        <linearGradient id={LOGO_GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="100%">
          {LOGO_GRADIENT_STOPS.map((s) => (
            <stop key={s.offset} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
      </defs>

      {/* Immutable uploaded SVG — final identity frame. */}
      <g
        transform={`translate(${fit.tx.toFixed(3)} ${fit.ty.toFixed(3)}) scale(${fit.scale.toFixed(6)})`}
        opacity={overlayOpacity}
        style={{ willChange: "opacity" }}
      >
        {RAW_PATHS.map((rp, i) => (
          <path
            key={i}
            d={rp.d}
            transform={`matrix(1,0,0,-1,${rp.tx},${rp.ty})`}
            fill={`url(#${LOGO_GRADIENT_ID})`}
          />
        ))}
      </g>
    </svg>
  );
};

export const GoogleGeminiEffect = ({
  pathLengths,
  title,
  description,
  className,
}: {
  pathLengths: MotionValue<number>[];
  title?: string;
  description?: string;
  className?: string;
}) => {
  const master = pathLengths[0];

  return (
    <div className={cn("sticky top-24 px-5", className)}>
      {(() => {
        const full = title || "Born from motions.";
        // Match the rest of the landing headings: last word gets the
        // tri-color gradient, everything before stays foreground.
        const parts = full.trim().split(/\s+/);
        const tail = parts.pop() ?? full;
        const head = parts.join(" ");
        return (
          <p className="text-3xl md:text-6xl lg:text-7xl font-semibold pb-2 text-center tracking-tight text-foreground">
            {head && <>{head}{" "}</>}
            <span className="gradient-accent-text">{tail}</span>
          </p>
        );
      })()}
      <p className="text-sm md:text-lg font-normal text-center text-foreground/60 mt-4 max-w-xl mx-auto">
        {description ||
          "Flowing intelligence organizes itself into the Rivinity identity — then returns to motion."}
      </p>

      <div className="w-full mt-10 h-[65vh] md:h-[75vh] relative">
        <RivinityFlowSVG progress={master} />
      </div>
    </div>
  );
};
export const RivinityEffect = GoogleGeminiEffect;

export default GoogleGeminiEffect;
