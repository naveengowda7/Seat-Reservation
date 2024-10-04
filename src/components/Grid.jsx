import React, { useMemo } from "react";
import "./Grid.css";

const Grid = ({
  cols,
  rows,
  seating,
  handleOnClick,
  selectedSeats,
  toggleModal,
}) => {
  const handleBtnClicked = (i, j) => {
    if (Object.keys(selectedSeats).length === 5) {
      toggleModal();
      return;
    }
    handleOnClick(i, j, seating);
  };

  const grid = useMemo(() => {
    const grids = [];
    for (let i = 1; i <= rows; i++) {
      const row = [];
      row.push(<div key={`header-${i}`}>{i}</div>);
      for (let j = 1; j <= cols; j++) {
        const isSelected = selectedSeats[`${seating}-${i}-${j}`];
        row.push(
          <div
            key={`seat-${i}-${j}`}
            className={`seat ${isSelected ? "selected" : ""}`}
            onClick={() => handleBtnClicked(i, j)}
          >
            {j}
          </div>
        );
      }
      grids.push(
        <div key={`row-${i}`} className="row">
          {row}
        </div>
      );
    }
    return grids;
  }, [cols, rows, seating, selectedSeats]);

  return (
    <div className="grid-container">
      <h3>{seating}</h3>
      {grid}
    </div>
  );
};

export default Grid;
