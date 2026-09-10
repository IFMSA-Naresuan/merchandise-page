export default function LearningMotif({
  className = "",
  decorative = false,
  label = "Medical learning becomes community health impact",
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* The open page shares its spine with the curved medical form. */}
      <path
        className="motif-line"
        d="M94 116C143 106 188 119 233 153C272 113 312 94 361 96V265C313 265 272 283 233 321C188 287 143 274 94 288V116Z"
        stroke="#2b4265"
        strokeWidth="11"
      />
      <path
        className="motif-line"
        d="M233 153V320C233 384 284 435 348 435C412 435 464 384 464 320V267"
        stroke="#2b4265"
        strokeWidth="11"
      />

      {/* One stem opens outward into a connected community. */}
      <path
        className="motif-line"
        d="M464 267V151M464 267C464 219 431 224 409 197M464 267C464 223 514 232 545 199"
        stroke="#178276"
        strokeWidth="11"
      />
      <circle
        className="motif-node"
        cx="464"
        cy="130"
        r="21"
        fill="#178276"
      />
      <circle
        className="motif-node"
        cx="397"
        cy="182"
        r="18"
        stroke="#178276"
        strokeWidth="10"
      />
      <circle
        className="motif-node"
        cx="557"
        cy="184"
        r="18"
        stroke="#178276"
        strokeWidth="10"
      />
    </svg>
  );
}
