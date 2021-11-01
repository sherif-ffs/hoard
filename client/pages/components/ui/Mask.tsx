import styles from './Mask.module.scss';

interface Props {
  children: any;
  isOpen: boolean;
}
const Mask = (props: Props) => {
  const { isOpen } = props;
  return isOpen ? <div className={styles.mask}>{props.children}</div> : null;
};

export default Mask;
