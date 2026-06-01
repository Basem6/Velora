export default function VeloraLogo({ width = 40, height = 40 }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Outer circle */}
            <circle cx="20" cy="20" r="19" stroke="#C8A882" strokeWidth="1.5" />
            
            {/* V shape - stylized */}
            <path
                d="M 12 14 L 20 28 L 28 14"
                stroke="#C8A882"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            
            {/* Accent dot */}
            <circle cx="20" cy="10" r="1.5" fill="#C8A882" />
        </svg>
    );
}
