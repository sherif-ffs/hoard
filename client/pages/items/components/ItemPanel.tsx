import classNames from 'classnames';
import Link from 'next/link';

import { ItemInterface } from '../../Interfaces/ItemInterface';
import { API_URL } from '../../constants/ApiEndpoint';
import SaveSVG from '../../components/ui/icons/SaveSVG';
import CloseSVG from '../../components/ui/icons/CloseSVG';
import styles from './ItemPanel.module.scss';

interface Props {
  item: ItemInterface;
  itemPanelIsOpen: boolean;
  handleCloseItemPanel: () => void;
}
const ItemDetailsSheet = (props: Props) => {
  const { item, itemPanelIsOpen, handleCloseItemPanel } = props;
  console.log('item: ', item);

  const { imageID, name, url, userId, author, tags } = item && item;
  return (
    <div
      className={classNames(styles.wrapper, { [styles.open]: itemPanelIsOpen })}
    >
      <div className={styles.content}>
        <span className={styles.closeIcon} onClick={handleCloseItemPanel}>
          <CloseSVG height={30} width={30} color="#050505" />
        </span>
        <header>
          <div className={styles.left}>
            <Link href={url}>
              <a target="_blank">
                <h1>{name}</h1>
              </a>
            </Link>
            <Link href={`/profile/${userId}`}>
              <h3>Uploaded By: {author}</h3>
            </Link>
          </div>
          <div className={styles.right}>
            <button
              // onClick={() => setCollectionsPanelIsOpen(true)}
              className={styles.saveButton}
            >
              <SaveSVG height={30} width={30} color="#050505" />
            </button>
          </div>

          {/* 
      title of item(link to item)              save button
      author  (link to users profile)          tags 
      featured in X collections
    */}
        </header>
        <ul className={styles.tags}>
          {tags &&
            !!tags.length &&
            tags.map((tag, i) => (
              <li key={i} className={styles.tag}>
                {tag}
              </li>
            ))}
        </ul>
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
      </div>
    </div>
  );
};

export default ItemDetailsSheet;
