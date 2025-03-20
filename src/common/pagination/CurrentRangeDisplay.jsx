const CurrentRangeDisplay = ({ startItem, endItem, totalItems }) => {
  return (
    <div className="text-neutral-900">
      Showing{" "}
      <span className="font-semibold">
        {startItem}-{endItem}
      </span>{" "}
      of <span className="font-semibold">{totalItems}</span> items
    </div>
  );
};

export default CurrentRangeDisplay;
