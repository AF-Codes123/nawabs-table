const words = ['KARAHI', 'TIKKA', 'BIRYANI', 'NAAN', 'SEEKH KABAB', 'GULAB JAMUN', 'CHAI'];

export default function TruckStrip() {
  const row = words.map((w, i) => (
    <span key={i} className="strip-item">
      {w} <b>✿</b>
    </span>
  ));

  return (
    <div className="truck-strip">
      <div className="strip-track">
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}