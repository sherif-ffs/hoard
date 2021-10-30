import styles from './Tab.module.scss';
import classNames from 'classnames';
const Tab = (props: any) => {
  const { tabCopy, onClick, inactive } = props;
  return (
    <button className={styles.pushable} onClick={onClick}>
      <span
        className={classNames(styles.edge, { [styles.inactive]: inactive })}
      ></span>
      <span
        className={classNames(styles.front, { [styles.inactive]: inactive })}
      >
        {tabCopy}
      </span>
    </button>
  );
};

export default Tab;
