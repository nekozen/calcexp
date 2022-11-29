import { useSelector } from '../redux/store';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'next-i18next';
import Exp from '../types/Exp';
import ExpItem from './ExpItem';

const ExpTable = () => {
  const { t } = useTranslation('common');
  const exps = useSelector((state) => {
    return state.exps;
  });

  const styleTable = {
    paddingLeft: '2rem',
    paddingRight: '2rem',
    paddingTop: '0.5rem',
    paddingBottom: '1rem',
  };
  const styleTableHeader = {
    color: 'white',
    backgroundColor: 'navy',
  };
  const styleTotalLine = {
    backgroundColor: 'lavender',
  };

  return (
    <TableContainer component={Paper} sx={styleTable}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={styleTableHeader}>
              {t('EXPENSE_ITEM')}
            </TableCell>
            <TableCell align="right" sx={styleTableHeader}>
              {t('COST')}
            </TableCell>
            <TableCell sx={styleTableHeader} size="small"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exps.map((exp) => (
            <ExpItem exp={exp} key={exp.id} />
          ))}
          <TableRow sx={styleTotalLine}>
            <TableCell>{t('TOTAL')}</TableCell>
            <TableCell align="right">{calSum(exps)}</TableCell>
            <TableCell size="small"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const calSum = (exps: Exp[]): number => {
  if (exps.length == 0) {
    return 0;
  }
  return exps
    .map((exp) => {
      return exp.cost;
    })
    .reduce((acc, val) => {
      return acc + val;
    });
};

export default ExpTable;
