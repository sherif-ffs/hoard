import React, { useState } from 'react';
import { createCollection } from './api/CollectionsApi';
import { TagOption, TagOptions } from '../constants/Tags';
import MultiSelect from '../components/ui/MultiSelect';
import { useAppContext } from '../components/AppWrapper';
import { useItemContext } from '../contexts/ItemsContext';
import Button from '../components/ui/Button';
import styles from '../items/components/CreateContentForm.module.scss';
import PanelHeader from '../items/components/ItemPanel/PanelHeader';

interface Props {
  context: string;
}

const CreateCollectionForm = (props: Props) => {
  const { user, setCreateModalIsOpen } = useAppContext();
  const { closeCreateCollectionModal } = useItemContext();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [tags, setTags] = useState<String[]>([]);

  const { context } = props;

  const generateOnClickEvent = () => {
    if (context === 'collections-panel') {
      closeCreateCollectionModal();
    } else {
      setCreateModalIsOpen(false);
    }
  };

  const handleSelectTags = (items: Array<TagOption>) => {
    const itemValues = items.map((item) => item.value);
    setTags(itemValues);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setTags([]);
    setVisibility('public');
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const collection = {
      title: name,
      author: user.email,
      userId: user._id,
      description: description,
      tags: tags,
      items: [],
      isPrivate: visibility === 'private',
      likes: 0,
    };
    const result = await createCollection(collection);
    const data = await result.json();
    const { status } = data;
    if (status === 'ok') {
      alert('collection Created Successfully');
      resetForm();
      return;
    }
    console.error('error');
    return;
  };

  return (
    <form className={styles.form}>
      <div className={styles.inputWrapper}>
        <label>Collection Name</label>
        <input
          className={styles.input}
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label>Select Tags</label>
        <MultiSelect
          handleChange={handleSelectTags}
          options={TagOptions}
          placeholder="select tags..."
        />
      </div>
      <div className={styles.inputWrapper}>
        <label>Whats this about</label>
        <input
          className={styles.input}
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {/* <div className={styles.radioWrapper}>
        <input
          type="radio"
          className={styles.radio}
          onChange={() => setVisibility('public')}
          name="public"
          checked={visibility === 'public'}
        />
        <label>public</label>
      </div>
      <div className={styles.radioWrapper}>
        <input
          type="radio"
          className={styles.radio}
          onChange={() => setVisibility('private')}
          name="private"
          checked={visibility === 'private'}
        />
        <label>private</label>
      </div> */}

      <div className={styles.buttonWrapper}>
        <button
          className={styles.closeButton}
          onClick={() => generateOnClickEvent()}
        >
          Cancel
        </button>
        <button onClick={(e: any) => handleSubmit(e)} className={styles.submit}>
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateCollectionForm;
