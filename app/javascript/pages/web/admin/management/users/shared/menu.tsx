import { useTranslation } from 'react-i18next';
import {
  CrudHorizontalMenu,
  type CrudHorizontalMenuItem,
} from '@/components/CrudHorizontalMenu';
import * as Routes from '@/routes.js';
import type { User } from '@/types/serializers';

type Props = {
  data?: User;
};

export function Menu({ data }: Props) {
  const { t: tHelpers } = useTranslation('helpers');

  const items: CrudHorizontalMenuItem[] = [
    {
      href: Routes.admin_management_users_path(),
      label: tHelpers('crud.list'),
    },
  ];

  if (data) {
    items.push({
      href: Routes.edit_admin_management_user_path(data.id),
      label: tHelpers('crud.editing'),
    });
  }

  return <CrudHorizontalMenu items={items} />;
}
