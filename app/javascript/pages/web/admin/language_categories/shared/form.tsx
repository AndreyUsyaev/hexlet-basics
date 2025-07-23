import {
  Box,
  Button,
  Checkbox,
  Fieldset,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useAppForm } from '@/hooks/useAppForm';
import type {
  HttpRouterMethod,
  LanguageCategoryCrudWithAttrs,
  LanguageCategoryItemCrud,
  LanguageCategoryQnaItemCrud,
} from '@/types';

type Props = {
  data: LanguageCategoryCrudWithAttrs;
  url: string;
  method?: HttpRouterMethod;
};

export default function Form({ data, url, method }: Props) {
  const { t } = useTranslation();
  const { t: tHelpers } = useTranslation('helpers');

  const { getInputProps, getSelectProps, submit, useArrayField, formState } =
    useAppForm<LanguageCategoryCrudWithAttrs>({
      url,
      method: method ?? 'post',
      container: data, // передаём контейнер целиком
    });

  const itemsField = useArrayField('items_attributes');
  const qnaItemsField = useArrayField('qna_items_attributes');

  const defaultItemValues: LanguageCategoryItemCrud = {
    id: null,
    language_category_id: null,
    language_landing_page_id: null,
    _destroy: false,
  };
  const defaultQnaValues: LanguageCategoryQnaItemCrud = {
    id: null,
    question: '',
    answer: '',
    _destroy: false,
  };

  return (
    <form onSubmit={submit}>
      <Fieldset p="lg" mb="xl">
        <legend>Main</legend>
        <TextInput {...getInputProps('name')} autoFocus />
        <TextInput {...getInputProps('header')} />
        <TextInput {...getInputProps('slug')} />
        <Textarea {...getInputProps('description')} rows={5} />
      </Fieldset>

      <Fieldset p="lg" mb="xl">
        <legend>Items</legend>
        {itemsField.fields.map((field, index) => (
          <Box key={field._internalId} mb="xl">
            <input
              type="hidden"
              {...getInputProps(`items_attributes.${index}.id`)}
            />
            <Select
              {...getSelectProps(
                `items_attributes.${index}.language_landing_page_id`,
                data.meta.landingPagesForCategories,
                'id',
                'header',
              )}
            />
            <Checkbox
              {...getInputProps(`items_attributes.${index}._destroy`)}
            />
            {!field.id && (
              <Button
                variant="outline"
                color="red"
                mt="xs"
                onClick={() => itemsField.remove(index)}
              >
                {tHelpers('crud.remove')}
              </Button>
            )}
          </Box>
        ))}
        <Button
          variant="light"
          mt="sm"
          onClick={() => itemsField.append(defaultItemValues)}
        >
          {tHelpers('crud.add')}
        </Button>
      </Fieldset>

      <Fieldset p="lg" mb="xl">
        <legend>QNAItems</legend>
        {qnaItemsField.fields.map((field, index) => (
          <Box key={field._internalId} mb="xl">
            <input
              type="hidden"
              {...getInputProps(`qna_items_attributes.${index}.id`)}
            />
            <TextInput
              {...getInputProps(`qna_items_attributes.${index}.question`)}
            />
            <Textarea
              {...getInputProps(`qna_items_attributes.${index}.answer`)}
              rows={5}
            />
            <Checkbox
              {...getInputProps(`qna_items_attributes.${index}._destroy`)}
            />
            {!field.id && (
              <Button
                variant="outline"
                color="red"
                mt="xs"
                onClick={() => qnaItemsField.remove(index)}
              >
                {tHelpers('crud.remove')}
              </Button>
            )}
          </Box>
        ))}
        <Button
          variant="light"
          mt="sm"
          onClick={() => qnaItemsField.append(defaultQnaValues)}
        >
          {tHelpers('crud.add')}
        </Button>
      </Fieldset>

      <Button type="submit" mt="xl" loading={formState.isSubmitting}>
        {tHelpers('submit.save')}
      </Button>
    </form>
  );
}
