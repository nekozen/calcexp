import * as React from 'react';
import { useSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import OutputIcon from '@mui/icons-material/Output';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { clearExp } from '../redux/expSlice';
import { calSum } from './ExpTable';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ExpAppBar = () => {
  const [copied, setCopied] = React.useState(false);
  const { t } = useTranslation('common');
  const exps = useSelector((state) => {
    return state.exps;
  });
  const dispatch = useDispatch();
  const onDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(clearExp(null));
  };
  const onOutput = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCopied(true);
  };
  const onCopiedAlertClosed = () => {
    setCopied(false);
  };
  React.useEffect(() => {
    if (copied && exps.length > 0) {
      let text = `${t('EXPENSE_ITEM')},${t('COST')}\n`;
      text += exps
        .map((exp) => `${exp.label},${exp.cost}\n`)
        .reduce((acc, val) => {
          return acc + val;
        });
      text += `${t('TOTAL')},${calSum(exps)}\n`;
      navigator.clipboard.writeText(text);
    }
  }, [copied]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('APP_NAME')}
        </Typography>
        <IconButton
          size="large"
          aria-label="Delete"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={onDelete}
          color="inherit"
          disabled={exps.length === 0}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          size="large"
          aria-label="Output"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={onOutput}
          color="inherit"
          disabled={exps.length === 0}
        >
          <OutputIcon />
        </IconButton>
      </Toolbar>
      <Snackbar
        open={copied}
        autoHideDuration={1000}
        onClose={onCopiedAlertClosed}
      >
        <Alert
          onClose={onCopiedAlertClosed}
          severity="success"
          sx={{ width: '100%' }}
        >
          {t('COPIED_MESSAGE')}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};
export default ExpAppBar;
