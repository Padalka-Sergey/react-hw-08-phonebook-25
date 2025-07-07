import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContactsAll } from '../../redux/operations';
import { selectContacts } from '../../redux/selectors';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import { Loader } from 'components/Loader/Loader';
import { ContactsListBox } from './ContactList.styled';

export const ContactList = ({ children }) => {
  const dispatch = useDispatch();
  const { value: contacts, isLoading, error } = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContactsAll());
  }, [dispatch]);

  return (
    <ContactsListBox>
      {isLoading && <Loader />}
      {error && (
        <p>
          <b>{error}</b>
        </p>
      )}
      {contacts.length > 0 && (
        <>
          {children}
          <ul>
            <ContactListItem />
          </ul>
        </>
      )}
    </ContactsListBox>
  );
};
