import { useRef } from 'react';
import classNames from 'classnames';

import styles from './Mask.module.scss';

interface Props {
  children: any;
  isOpen: boolean;
  close: () => void;
}
const Mask = (props: Props) => {
  const { isOpen, close } = props;
  const ref = useRef();
  const handleClose = (e: Event) => {
    if (ref.current === e.target) {
      close();
    }
  };
  return (
    <div
      ref={ref}
      className={classNames(styles.mask, { [styles.open]: isOpen })}
      onClick={(e: Event) => handleClose(e)}
    >
      <div onClick={undefined}>{props.children}</div>
    </div>
  );
};

export default Mask;
