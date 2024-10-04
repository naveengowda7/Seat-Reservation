import { useState } from "react";
import Grid from "./components/Grid";
import Modal from "./components/modals/Modal";

const App = () => {
  const [selectedSeats, setSelectedSeats] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);
  const [groupedSeats, setGroupedSeats] = useState({});

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const toggleModalSubmit = () => {
    setSubmitModalOpen(!isSubmitModalOpen);
  };

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

  const handleSubmit = () => {
    const grouped = {};

    Object.keys(selectedSeats).forEach((seatKey) => {
      const [category, row, col] = seatKey.split("-");

      if (!grouped[category]) {
        grouped[category] = [];
      }

      grouped[category].push(`${row}-${col}`);
    });

    setGroupedSeats(grouped);

    toggleModalSubmit();
  };

  return (
    <>
      <div className="seat-section">
        <Grid
          cols={4}
          rows={4}
          seating={"silver"}
          handleOnClick={handleSeatClicks}
          selectedSeats={selectedSeats}
          toggleModal={toggleModal}
        />
        <Grid
          cols={4}
          rows={4}
          seating={"black"}
          handleOnClick={handleSeatClicks}
          selectedSeats={selectedSeats}
          toggleModal={toggleModal}
        />
        <Grid
          cols={4}
          rows={4}
          seating={"premium"}
          handleOnClick={handleSeatClicks}
          selectedSeats={selectedSeats}
          toggleModal={toggleModal}
        />
      </div>

      <div className="submit-btn">
        <button
          type="button"
          className={`${Object.keys(selectedSeats).length ? "" : "submit-not"}`}
          onClick={handleSubmit}
        >
          Book Ticket
        </button>
      </div>

      <div>
        <Modal isVisible={isModalOpen} onClose={toggleModal} isDanger={true}>
          <h2>You cannot select more than 5 seats!</h2>
          <button onClick={toggleModal}>Close</button>
        </Modal>

        <Modal
          isVisible={isSubmitModalOpen}
          onClose={toggleModalSubmit}
          isDanger={false}
        >
          <h2>Selected Seats</h2>
          <div>
            {Object.keys(groupedSeats).map((seatClass) => (
              <div key={seatClass}>
                <h3>{seatClass}</h3>
                <p>{groupedSeats[seatClass].join(", ")}</p>
              </div>
            ))}
          </div>
          <button onClick={toggleModalSubmit}>Close</button>
        </Modal>
      </div>
    </>
  );
};

export default App;
