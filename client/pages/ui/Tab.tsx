import classNames from 'classnames';
import styles from './Tab.module.scss';

const Tab = (props: any) => {
  const { tabCopy, onClick, inactive } = props;
  return (
    <button
      className={classNames(styles.wrapper, { [styles.inactive]: inactive })}
      onClick={onClick}
    >
      {tabCopy}
    </button>
  );
};

export default Tab;
