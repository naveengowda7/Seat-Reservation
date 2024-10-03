import React, { useState, useMemo } from "react";
import "./Grid.css";

const Grid = ({ cols, rows, seating, handleOnClick, selectedSeats }) => {
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
            onClick={() => handleOnClick(i, j, seating)}
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
