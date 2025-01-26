import React from "react";

const CircleOfFifths = () => {
  const majorKeys = ["C", "G", "D", "A", "E", "B", "F#", "C#"];
  const minorKeys = ["Am", "Em", "Bm", "F#m", "C#m", "G#m", "D#m", "A#m"];

  return (
    <div style={{ textAlign: "center", margin: "50px" }}>
      <h1>Circle of Fifths</h1>

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          top: "50%",
          left: "50%",
          borderRadius: "50%",
          border: "1px solid black",
        }}
      >

        {majorKeys.map((key, index) => (
          <div
            key={key}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `rotate(${index * 45}deg) translate(0, -120px)`,
              transformOrigin: "0 100%",
            }}
          >
            <div
              style={{
                transform: `rotate(-${index * 45}deg)`, 
                fontWeight: "bold",
              }}
            >
              {key}
            </div>
          </div>
        ))}

        {minorKeys.map((key, index) => (
          <div
            key={key}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `rotate(${index * 45}deg) translate(0, -80px)`,
              transformOrigin: "0 100%",
            }}
          >
            <div
              style={{
                transform: `rotate(-${index * 45}deg)`, 
                fontSize: "14px",
              }}
            >
              {key}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f0f0f0",
          padding: "15px",
          marginTop: "20px",
          width: "80%",
          maxWidth: "600px",
          margin: "auto",
          textAlign: "left",
        }}
      >
        <h2>
          <strong>There is an easy rhyme that can help you find your next key centers:</strong>
        </h2>
        <p>
          <strong>Father</strong>
          <br />
          <strong>Charles</strong>
          <br />
          <strong>Goes</strong>
          <br />
          <strong>Down</strong>
          <br />
          <strong>And</strong>
          <br />
          <strong>Ends</strong>
          <br />
          <strong>Battle</strong>
        </p>
        <p>
          If C is your first note with 0 sharps or flats, your C major key will be C D E F G A B C.
          Note that your 5th note is G. That means G will be the first key with a sharp, and using
          the rhyme you can see it will be "Father", which means G major has one sharp, and that is F#:
          G major = G A B C D E F# G. You can use this method to find all the scales for the keys using
          the circle of fifths and this convenient rhyme.
        </p>
      </div>
    </div>
  );
};

export default CircleOfFifths;
