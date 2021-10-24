import React, { useState } from 'react';
import { CollectionInterface } from '../../Interfaces/CollectionInterface';
import { createItem } from '../api/ItemApi';
import { TagOption, TagOptions } from '../../constants/Tags';
import MultiSelect from '../../components/ui/MultiSelect';

type Props = {
  collections: Array<CollectionInterface> | [];
  email: string;
  name: string;
  _id: string;
};

const CreateItemForm = (props: Props) => {
  const { collections, email, name, _id } = props;
  const [itemName, setItemName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [tags, setTags] = useState<String[]>([]);

  console.log('visibility: ', visibility);

  const handleMultiSelectChange = (items: Array<TagOption>) => {
    const itemValues = items.map((item) => item.value);
    setTags(itemValues);
    console.log('itemValues: ', itemValues);
  };

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
      collectionId: '',
    };
    console.log('item: ', item);

    const result = await createItem(item);
    console.log('result: ', result);
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
      <MultiSelect {...{ handleMultiSelectChange }} options={TagOptions} />
      <button onClick={(e) => handleSubmit(e)}>Create Item</button>
    </form>
  );
};

export default CreateItemForm;
