import { AppContainer, Title, SubTitle } from './App.styled.jsx';
import { ContactForm } from 'components/ContactForm/ContactForm.jsx';
import { Filter } from 'components/Filter/Filter.jsx';
import { ContactList } from 'components/ContactList/ContactList.jsx';

export const App = () => {
  return (
    <AppContainer>
      <Title>Phonebook</Title>
      <ContactForm />
      <ContactList>
        <SubTitle>Contacts</SubTitle>
        <Filter />
      </ContactList>
    </AppContainer>
  );
};
