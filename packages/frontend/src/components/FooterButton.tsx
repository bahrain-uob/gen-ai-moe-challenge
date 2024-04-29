export default function FooterButton({
    onSelectPart,
    location,
    name,
    partNum,
  }: {
    onSelectPart: (part: string) => void;
    location: string;
    name: string;
    partNum: string;
  }) {
    const handleClick = () => {
      onSelectPart(location);
    };
    const isActive = location === partNum;
    console.log(partNum);
    return (
      <button
        onClick={handleClick}
        className={`button-footer ${isActive ? 'active' : ''}`}
      >
        {name}
      </button>
    );
  }
  