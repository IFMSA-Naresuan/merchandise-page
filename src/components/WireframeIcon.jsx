import WireframeBlock from "./WireframeBlock.jsx";

export default function WireframeIcon({ label, size }) {
  return (
    <WireframeBlock
      label={label}
      dimensions={`${size}×${size}`}
      className={`rounded-full bg-white ${size === 44 ? "size-11" : "size-6"}`}
    />
  );
}
