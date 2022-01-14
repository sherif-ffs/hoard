import Spinner from './Spinner';

import styles from './Loading.module.scss';

interface Props {
  copy: string;
}
const Loading = (props: Props) => {
  const { copy } = props;

  return (
    <div className={styles.spinnerWrapper}>
      <div>
        <Spinner />
        <span>{copy}</span>
      </div>
    </div>
  );
};

export default Loading;
