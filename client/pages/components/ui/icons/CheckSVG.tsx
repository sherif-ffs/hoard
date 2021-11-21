import styles from './SVG.module.scss';

interface Props {
  color: string;
  height?: string;
  width?: string;
}
const CheckSVG = (props: Props) => (
  <svg
    className={styles.wrapper}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.00003 16.17L4.83003 12L3.41003 13.41L9.00003 19L21 7.00003L19.59 5.59003L9.00003 16.17Z"
      fill={props.color}
    />
  </svg>
);

export default CheckSVG;
