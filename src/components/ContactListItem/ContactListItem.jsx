import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/operations';
import { selectContacts } from '../../redux/selectors';
import { selectFilterValue } from '../../redux/selectors';
import { NameBox, Button } from './ContactListItem.styled';

export const ContactListItem = () => {
  const dispatch = useDispatch();

  const { value: contacts } = useSelector(selectContacts);
  const filter = useSelector(selectFilterValue);

  const filterNames = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return filterNames.map(contact => (
    <li key={contact.id}>
      <NameBox>
        {contact.name}: {contact.phone}
      </NameBox>

      <Button type="button" onClick={() => dispatch(deleteContact(contact.id))}>
        Delete
      </Button>
    </li>
  ));
};
