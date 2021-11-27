import styles from './SVG.module.scss';

interface Props {
  color?: string;
  height?: number;
  width?: number;
}

const AddSVG = (props: Props) => (
  <svg
    width={props.width}
    height={props.height}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill={props.color} />
  </svg>
);

export default AddSVG;
