export default function DaysPicker({ label, options, selected, onToggle, max }) {
  const atLimit = max !== undefined && selected.length >= max;

  return (
    <div>
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-dark">{label}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          const isBlocked = atLimit && !isSelected;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              disabled={isBlocked}
              aria-pressed={isSelected}
              className={`text-sm font-medium rounded-full px-4 py-1.5 border transition-colors ${
                isSelected
                  ? "bg-gold text-cream-light border-gold"
                  : isBlocked
                    ? "text-brown-light/50 border-gold/15 cursor-not-allowed"
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
