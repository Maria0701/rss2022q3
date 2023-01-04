import './btn.css'

interface IBtnElt {
  eltClass: string;
  btnText: string;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function Btn ({eltClass, onClick, btnText, isDisabled}: IBtnElt) {
  return (
    <button
        className= {`btn btn--main ${eltClass}`}
        onClick = {onClick}
        disabled={isDisabled}
        >
        {btnText}
    </button>
  )
};
