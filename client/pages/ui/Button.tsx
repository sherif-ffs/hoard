import styles from './Button.module.scss';

const Button = (props: any) => {
  const { buttonCopy, onClick, version } = props;
  return (
    <button className={styles.button} {...{ onClick }}>
      {buttonCopy}
    </button>
  );
};

export default Button;
