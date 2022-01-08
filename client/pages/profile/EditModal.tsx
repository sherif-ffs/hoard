import { useState, useEffect } from 'react';
import classNames from 'classnames';

import { handleUpdateSocials } from '../auth/api/AuthApi';
import Modal from '../ui/Modal';
import Mask from '../ui/Mask';

import buttonStyles from '../../styles/button.module.scss';
import styles from './EditModal.module.scss';

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
    <Mask isOpen={modalIsOpen} close={toggle}>
      <Modal isOpen={modalIsOpen}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <h1>Add Socials</h1>
          <div className={styles.inputWrapper}>
            <label>Github</label>
            <input
              className={styles.input}
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label>Twitter</label>
            <input
              className={styles.input}
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label>Portfolio</label>
            <input
              className={styles.input}
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label>Role/Job Title</label>
            <input
              className={styles.input}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className={styles.buttons}>
            <button
              type="button"
              onClick={toggle}
              className={classNames(
                buttonStyles.button,
                buttonStyles.secondary
              )}
            >
              Close
            </button>
            <button
              type="submit"
              value="Submit"
              className={buttonStyles.button}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </Mask>
  );
};

export default EditModal;
