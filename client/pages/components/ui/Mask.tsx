import styles from './Mask.module.scss';

interface Props {
  children: any;
}
const Mask = (props: Props) => (
  <div className={styles.mask}>{props.children}</div>
);

export default Mask;
