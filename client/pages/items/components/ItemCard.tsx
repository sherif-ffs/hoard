import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

import { deleteItem } from '../api/ItemApi';
import { API_URL } from '../../constants/ApiEndpoint';
import { ItemInterface } from '../../Interfaces/ItemInterface';
import { useItemContext } from '../../contexts/ItemsContext';
import SaveSVG from '../../components/ui/icons/SaveSVG';
import { shimmer, toBase64 } from '../../utils';
import PlaceHolderImage from '../../../public/placeholder_image.png';
import styles from './ItemCard.module.scss';

type Props = {
  item: ItemInterface;
  isMyItem: boolean;
};

const Item = (props: Props) => {
  const { name, _id, imageID } = props.item;
  const { handleSetSelectedItem, handleSetItemToCollect } = useItemContext();

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  //   const shimmer = (w: number, h: number) => `
  // <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  //   <defs>
  //     <linearGradient id="g">
  //       <stop stop-color="#333" offset="20%" />
  //       <stop stop-color="#222" offset="50%" />
  //       <stop stop-color="#333" offset="70%" />
  //     </linearGradient>
  //   </defs>
  //   <rect width="${w}" height="${h}" fill="#333" />
  //   <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  //   <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  // </svg>`;

  //   const toBase64 = (str: string) =>
  //     typeof window === 'undefined'
  //       ? Buffer.from(str).toString('base64')
  //       : window.btoa(str);

  const handleDeleteItem = async () => {
    const res = await deleteItem(_id);
    const response = await res.json();
    const { status, data } = response;
    if (status === 'ok') {
      alert('Item deleted successfully');
      return;
    }
    alert(data);
  };
  return (
    <div className={styles.wrapper} ref={ref}>
      {imageID ? (
        <div
          onClick={() => handleSetSelectedItem(props.item)}
          className={styles.imgWrapper}
        >
          <Image
            src={`${API_URL}/items/images/${imageID}`}
            placeholder="blur"
            layout="fill"
            quality={100}
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(200, 200)
            )}`}
          />
        </div>
      ) : null}
      <div className={styles.content}>
        <div className={styles.actions}>
          <h1 onClick={() => handleSetSelectedItem(props.item)}>{name}</h1>
          <button
            onClick={() => handleSetItemToCollect(props.item)}
            className={styles.saveButton}
          >
            <SaveSVG height={27} width={27} color="#050505" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
