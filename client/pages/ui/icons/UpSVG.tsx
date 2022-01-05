import styles from './SVG.module.scss';

interface Props {
  color: string;
  height?: number;
  width?: number;
}
const CloseSVG = (props: Props) => (
  <svg
    className={styles.wrapper}
    width="25"
    height="25"
    viewBox="0 0 15 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 5L5 0L10 5H0Z" fill={props.color} />
  </svg>
);

export default CloseSVG;
