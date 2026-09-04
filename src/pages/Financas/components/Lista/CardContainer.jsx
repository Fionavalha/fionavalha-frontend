export default function CardContainer({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-3 w-full ${className}`}
    >
      {children}
    </div>
  );
}
