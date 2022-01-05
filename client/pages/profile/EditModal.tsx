import { useState } from 'react';

import Modal from '../ui/Modal';
import Mask from '../ui/Mask';
import { handleUpdateSocials } from '../auth/api/AuthApi';
import { useEffect } from 'react';

interface Props {
  modalIsOpen: boolean;
  id: string;
  toggle: () => void;
  github: string;
  twitter: string;
  portfolio: string;
  role: string;
}
const EditModal = (props: Props) => {
  const {
    modalIsOpen,
    id,
    toggle,
    github: g,
    twitter: t,
    portfolio: p,
    role: r,
  } = props;
  const [github, setGithub] = useState(g);
  const [twitter, setTwitter] = useState(t);
  const [portfolio, setPortfolio] = useState(p);
  const [role, setRole] = useState(r);

  useEffect(() => {}, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await handleUpdateSocials(
      github,
      twitter,
      portfolio,
      role,
      id
    );
    const JSONResponse = await response.json();
    const { data, status, error } = JSONResponse;

    if (error) alert(error);

    if (!error && status === 'ok') {
      alert(data);
      toggle();
    }
  };
  return (
    <Mask isOpen={modalIsOpen}>
      <Modal isOpen={modalIsOpen}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Add Socials</h1>
          <div>
            <label>Github</label>
            <input value={github} onChange={(e) => setGithub(e.target.value)} />
          </div>

          <div>
            <label>Twitter</label>
            <input
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>

          <div>
            <label>Portfolio</label>
            <input
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
            />
          </div>

          <div>
            <label>Role/Job Title</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </Modal>
    </Mask>
  );
};

export default EditModal;
