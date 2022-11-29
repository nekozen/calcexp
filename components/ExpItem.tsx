import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Exp from '../types/Exp';
import { useDispatch } from 'react-redux';
import { removeExp } from '../redux/expSlice';

type ExpItemProps = {
  exp: Exp;
};

const ExpItem: React.FC<ExpItemProps> = (props) => {
  const exp = props.exp;
  const dispatch = useDispatch();
  const onDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(removeExp(exp));
  };

  return (
    <TableRow key={exp.id}>
      <TableCell>{exp.label}</TableCell>
      <TableCell align="right">{exp.cost}</TableCell>
      <TableCell size="small" sx={{ textAlign: 'center' }}>
        <IconButton
          size="medium"
          aria-label="Delete"
          onClick={onDelete}
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ExpItem;
