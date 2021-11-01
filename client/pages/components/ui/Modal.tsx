import styles from './Modal.module.scss';

interface Props {
  isOpen: boolean;
  children: any;
}
const Modal = (props: Props) => {
  const { isOpen, children } = props;

  return isOpen ? <div className={styles.modal}>{children}</div> : null;
};

export default Modal;
