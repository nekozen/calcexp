import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExp } from '../redux/expSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTranslation } from 'next-i18next';
import Exp from '../types/Exp';
import { ulid } from 'ulid';

const ExpForm = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const [expLabel, setExpLabel] = useState('');
  const [expCost, setExpCost] = useState('');
  const onExpLabelChanged = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExpLabel(e.target.value);
  };
  const onExpCostChanged = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExpCost(e.target.value);
  };
  const onClickAdd = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const label = expLabel.trim();
    if (!label || !expCost) {
      alert('費用を入力してください');
      return;
    }
    const cost = parseInt(expCost);
    const newExp: Exp = {
      id: ulid(),
      label,
      cost,
    };
    dispatch(addExp(newExp));
    setExpLabel('');
    setExpCost('');
  };
  const styleInput = {
    marginLeft: '2rem',
    marginRight: '2rem',
    marginTop: '1.5rem',
    marginBottom: '1rem',
    verticalAlign: 'middle',
  };

  return (
    <div>
      <TextField
        value={expLabel}
        onChange={onExpLabelChanged}
        variant="outlined"
        label={t('HINT_EXPENSE_ITEM')}
        sx={styleInput}
      />
      <TextField
        value={expCost}
        onChange={onExpCostChanged}
        variant="outlined"
        type="number"
        label={t('HINT_COST')}
        sx={styleInput}
      />
      <Button onClick={onClickAdd} sx={styleInput} variant="outlined">
        {t('ADD')}
      </Button>
    </div>
  );
};
export default ExpForm;
