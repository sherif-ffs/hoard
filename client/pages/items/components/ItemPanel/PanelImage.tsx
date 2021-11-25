import Link from 'next/link';
import { API_URL } from '../../../constants/ApiEndpoint';

import styles from './PanelImage.module.scss';

interface Props {
  url: string;
  imageID: string;
}
const PanelImage = (props: Props) => {
  const { url, imageID } = props;
  return (
    <div className={styles.imageWrapper}>
      {imageID ? (
        <Link href={url}>
          <a target="_blank">
            <img
              src={`${API_URL}/items/images/${imageID}`}
              loading="lazy"
              className={styles.image}
            ></img>
          </a>
        </Link>
      ) : null}
    </div>
  );
};

export default PanelImage;
