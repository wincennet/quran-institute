export default function DaysPicker({ label, options, selected, onToggle }) {
  return (
    <div>
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-dark">{label}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              aria-pressed={isSelected}
              className={`text-sm font-medium rounded-full px-4 py-1.5 border transition-colors ${
                isSelected
                  ? "bg-gold text-cream-light border-gold"
                  : "text-brown-light border-gold/30 hover:border-gold"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
