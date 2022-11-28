import { useSelector } from '../redux/store';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'next-i18next';
import Exp from '../types/Exp';

const ExpTable = () => {
  const { t } = useTranslation('common');
  const exps = useSelector((state) => {
    return state.exps;
  });

  return (
    <TableContainer component={Paper} className="tableList">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" className="tableHeader">
              {t('EXPENSE_ITEM')}
            </TableCell>
            <TableCell align="right" className="tableHeader">
              {t('COST')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exps.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell>{exp.label}</TableCell>
              <TableCell align="right">{exp.cost}</TableCell>
            </TableRow>
          ))}
          <TableRow className="totalLine">
            <TableCell>{t('TOTAL')}</TableCell>
            <TableCell align="right">{calSum(exps)}</TableCell>
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
