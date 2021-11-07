import React, { useEffect, useState } from 'react';
import { createItem } from '../api/ItemApi';
import { TagOption, TagOptions } from '../../constants/Tags';
import MultiSelect from '../../components/ui/MultiSelect';
import Button from '../../components/ui/Button';
import styles from './CreateContentForm.module.scss';
import { useAppContext } from '../../components/AppWrapper';

type Props = {
  email: string;
  name: string;
  _id: string;
  collections: any;
};

const CreateItemForm = (props: Props) => {
  const { setCreateModalIsOpen } = useAppContext();
  const { email, _id, collections } = props;
  const [itemName, setItemName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [tags, setTags] = useState<String[]>([]);
  const [collectionOptions, setCollectionOptions] = useState([]);
  const [collectionData, setCollectionData] = useState<Object[]>([]);
  const handleCollectionChange = (
    collections: Array<{ label: string; value: string }>
  ) => {
    const collectionData = collections.map((item) => ({
      title: item.label,
      id: item.value,
    }));
    setCollectionData(collectionData);
  };
  const handleSelectTags = (items: Array<TagOption>) => {
    const itemValues = items.map((item) => item.value);
    setTags(itemValues);
  };

  useEffect(() => {
    if (collections && !!collections.length) {
      const options = collections.map((collection: any) => ({
        label: collection.title,
        value: collection._id,
      }));
      setCollectionOptions(options);
    }
  }, [collections]);

  const resetForm = () => {
    setItemName('');
    setUrl('');
    setDescription('');
    setTags([]);
    setVisibility('public');
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const item = {
      name: itemName,
      author: email,
      userId: _id,
      description,
      url,
      tags: tags,
      isPrivate: visibility === 'private',
      likes: 0,
      collections: collectionData,
    };
    const result = await createItem(item);
    const data = await result.json();
    const { status } = data;
    if (status === 'ok') {
      alert('Item Created Successfully');
      resetForm();
      return;
    }

    alert('Something went wrong');
    return;
  };
  return (
    <form className={styles.form}>
      <div className={styles.inputWrapper}>
        <label>Add to Collection</label>
        <MultiSelect
          placeholder="select collection"
          handleChange={handleCollectionChange}
          options={collectionOptions}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label>Add to Collection</label>
        <MultiSelect
          placeholder="add tags..."
          handleChange={handleSelectTags}
          options={TagOptions}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label>Item Name</label>
        <input
          className={styles.input}
          type="text"
          placeholder="name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label>Url *</label>
        <input
          className={styles.input}
          type="text"
          placeholder="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className={styles.radioWrapper}>
        <input
          type="radio"
          className={styles.radio}
          onChange={() => setVisibility('public')}
          name="public"
          checked={visibility === 'public'}
        />
        <label>Public</label>
      </div>
      <div className={styles.radioWrapper}>
        <input
          type="radio"
          className={styles.radio}
          onChange={() => setVisibility('private')}
          name="private"
          checked={visibility === 'private'}
        />
        <label>Private</label>
      </div>

      <div className={styles.buttonWrapper}>
        <div
          className={styles.closeButton}
          onClick={() => setCreateModalIsOpen(false)}
        >
          <p className={styles.close}>Cancel</p>
        </div>
        <Button
          buttonCopy={'Create Item'}
          onClick={(e: any) => handleSubmit(e)}
        />
      </div>
    </form>
  );
};

export default CreateItemForm;
