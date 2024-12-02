export default function BackButton({ to, label }) {
    return (
      <div className="mb-4">
        ← <a href={to}>{label}</a>
      </div>
     
    );
  }
  