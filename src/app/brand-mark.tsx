// The "rc" logo drawn as blocks, matching public/images/rustcode-logo.png.
export function BrandMark({
  className = "brand-mark",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 8.5 5"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <g className="brand-mark-r">
        <rect x="0" y="1" width="1.05" height="4" />
        <rect x="1.05" y="0" width="2.8" height="1" />
      </g>
      <g className="brand-mark-c">
        <rect x="4.4" y="1" width="1" height="3" />
        <rect x="5.4" y="0" width="3.1" height="1" />
        <rect x="5.4" y="4" width="3.1" height="1" />
      </g>
    </svg>
  );
}
