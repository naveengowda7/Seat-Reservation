import { useState } from "react";
import Grid from "./components/Grid";

const App = () => {
  const [selectedSeats, setSelectedSeats] = useState({});

  const handleSeatClicks = (row, col, type) => {
    const key = `${type}-${row}-${col}`;
    setSelectedSeats((prevSeats) => {
      const newSeats = { ...prevSeats };
      if (newSeats[key]) {
        delete newSeats[key];
      } else {
        newSeats[key] = true;
      }
      return newSeats;
    });
  };

  return (
    <div className="seat-section">
      <Grid
        cols={4}
        rows={4}
        seating={"silver"}
        handleOnClick={handleSeatClicks}
        selectedSeats={selectedSeats}
      />
      <Grid
        cols={4}
        rows={4}
        seating={"black"}
        handleOnClick={handleSeatClicks}
        selectedSeats={selectedSeats}
      />
      <Grid
        cols={4}
        rows={4}
        seating={"premium"}
        handleOnClick={handleSeatClicks}
        selectedSeats={selectedSeats}
      />
    </div>
  );
};

export default App;
