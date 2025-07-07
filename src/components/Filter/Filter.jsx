import { useSelector, useDispatch } from 'react-redux';
import { filterContacts } from '../../redux/filterSlice';
import { selectFilterValue } from '../../redux/selectors';
import { LabelFilter, InputFilter } from './Filter.styled';

export const Filter = () => {
  const filter = useSelector(selectFilterValue);
  const dispatch = useDispatch();

  return (
    <LabelFilter>
      Find contacts by name
      <InputFilter
        type="search"
        name="filter"
        title="Сontact search field"
        value={filter}
        onChange={e => dispatch(filterContacts(e.target.value))}
        required
      />
    </LabelFilter>
  );
};
