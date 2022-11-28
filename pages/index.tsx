import * as React from 'react';
import Box from '@mui/material/Box';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ExpTable from '../components/ExpTable';
import store from '../redux/store';
import { Provider } from 'react-redux';
import ExpForm from '../components/ExpForm';
import ExpAppBar from '../components/ExpAppBar';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <Provider store={store}>
      <Box sx={{ flexGrow: 1 }}>
        <ExpAppBar />
        <ExpForm />
        <ExpTable />
      </Box>
    </Provider>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'ja' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
