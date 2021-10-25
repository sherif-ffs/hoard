import React, { useEffect, useState } from 'react';
import { CollectionInterface } from '../../Interfaces/CollectionInterface';
import { createItem } from '../api/ItemApi';
import { TagOption, TagOptions } from '../../constants/Tags';
import MultiSelect from '../../components/ui/MultiSelect';
import { useQuery } from 'react-query';
import { fetchCollectionsById } from '../../collections/api/CollectionsApi';

type Props = {
  email: string;
  name: string;
  _id: string;
  collections: any;
};

const CreateItemForm = (props: Props) => {
  console.log('props: ', props);
  const { email, name, _id, collections } = props;
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
    <form>
      <input
        className="name"
        type="text"
        placeholder="name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        className="url"
        type="text"
        placeholder="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        className="description"
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="radio"
        onChange={() => setVisibility('public')}
        name="public"
        checked={visibility === 'public'}
      />{' '}
      Public
      <input
        type="radio"
        onChange={() => setVisibility('private')}
        name="private"
        checked={visibility === 'private'}
      />{' '}
      Private
      <MultiSelect
        handleChange={handleCollectionChange}
        options={collectionOptions}
      />
      <MultiSelect handleChange={handleSelectTags} options={TagOptions} />
      <button onClick={(e) => handleSubmit(e)}>Create Item</button>
    </form>
  );
};

export default CreateItemForm;
