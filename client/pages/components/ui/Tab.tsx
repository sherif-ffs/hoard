import classNames from 'classnames';
import styles from './Tab.module.scss';

const Tab = (props: any) => {
  const { tabCopy, onClick, inactive } = props;
  return (
    // <button className={styles.pushable} onClick={onClick}>
    //   <span
    //     className={classNames(styles.edge, { [styles.inactive]: inactive })}
    //   ></span>
    //   <span
    //     className={classNames(styles.front, { [styles.inactive]: inactive })}
    //   >
    //     {tabCopy}
    //   </span>
    // </button>
    <button
      className={classNames(styles.wrapper, { [styles.inactive]: inactive })}
      onClick={onClick}
    >
      {tabCopy}
    </button>
  );
};

export default Tab;
