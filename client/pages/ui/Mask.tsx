import styles from './Mask.module.scss';
import classNames from 'classnames';

interface Props {
  children: any;
  isOpen: boolean;
}
const Mask = (props: Props) => {
  const { isOpen } = props;
  return (
    <div className={classNames(styles.mask, { [styles.open]: isOpen })}>
      {props.children}
    </div>
  );
};

export default Mask;
