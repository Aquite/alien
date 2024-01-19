const TButton = ({ text, press }) => {
  return (
    <span className="TButton" onClick={() => press}>
      {text}
    </span>
  );
};

export default TButton;
