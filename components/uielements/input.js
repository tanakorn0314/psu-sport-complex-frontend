import { Input } from 'antd';
import {
  InputWrapper,
  InputGroupWrapper,
  InputSearchWrapper,
  TextAreaWrapper,
} from './styles/input.style';
// import WithDirection from '../../config/withDirection';

const { Search, TextArea, Group } = Input;

const WDStyledInput = InputWrapper(Input);
const StyledInput = WDStyledInput;

const WDInputGroup = InputGroupWrapper(Group);
const InputGroup = WDInputGroup;

const WDInputSearch = InputSearchWrapper(Search);
const InputSearch = WDInputSearch;

const WDTextarea = TextAreaWrapper(TextArea);
const Textarea = WDTextarea;

export default StyledInput;
export { InputSearch, InputGroup, Textarea };
