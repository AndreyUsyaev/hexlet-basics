import { ActionIcon, Group } from '@mantine/core';
import dayjs from 'dayjs';
import { Github, Link } from 'lucide-react';
import { DataTable } from 'mantine-datatable';
import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import AppAnchor from '@/components/Elements/AppAnchor';
import useDataTableProps from '@/hooks/useDataTableProps';
import AdminLayout from '@/pages/layouts/AdminLayout';
import * as Routes from '@/routes.js';
import type { Grid, LanguageLesson } from '@/types';

type Props = PropsWithChildren & {
  lessons: LanguageLesson[];
  grid: Grid;
};

export default function Index({ grid, lessons }: Props) {
  const { t } = useTranslation();
  const { gridProps } = useDataTableProps<LanguageLesson, {}>(grid);

  const renderActions = (item: LanguageLesson) => {
    return (
      <Group gap="xs">
        {/* <AppAnchor */}
        {/*   me="xs" */}
        {/*   href={Routes.edit_admin_language_category_path(item.id)} */}
        {/* > */}
        {/*   <ActionIcon variant="default" size="xs"> */}
        {/*     <Edit /> */}
        {/*   </ActionIcon> */}
        {/* </AppAnchor> */}
        <AppAnchor
          external
          href={Routes.language_lesson_path(item.language!.slug!, item.slug!)}
        >
          <ActionIcon variant="default" size="xs">
            <Link />
          </ActionIcon>
        </AppAnchor>
        <AppAnchor external href={item.source_code_url!}>
          <ActionIcon variant="default" size="xs">
            <Github />
          </ActionIcon>
        </AppAnchor>
        {/* <Link */}
        {/*   onClick={confirmDeleting} */}
        {/*   className="btn btn-link link-body-emphasis p-0 m-0" */}
        {/*   method="delete" */}
        {/*   href={Routes.admin_language_category_path(data.id)} */}
        {/* > */}
        {/*   {<i className="bi bi-file-x" />} */}
        {/* </Link> */}
      </Group>
    );
  };

  return (
    <AdminLayout header={t('admin.language_lessons.index.header')}>
      <DataTable
        records={lessons}
        columns={[
          { accessor: 'id' },
          { accessor: 'language.slug' },
          { accessor: 'slug' },
          {
            accessor: 'created_at',
            render: (r) => dayjs(r.created_at).format('LL'),
          },
          {
            accessor: 'actions',
            title: 'actions',
            render: renderActions,
          },
        ]}
        {...gridProps}
      />
    </AdminLayout>
  );
}
