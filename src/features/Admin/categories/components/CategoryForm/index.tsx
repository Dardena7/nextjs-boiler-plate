import { Button } from '@/core/components/Button';
import { MenuItem, Select } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { TranslationInput } from '@/core/forms/_components/TranslationInput';
import { BannerManager } from '@/core/forms/category-form/BannerManager';
import { FileDropInput } from '@/core/forms/_components/FileDropInput';

type Props = {
  onSave: () => void;
};

export const CategoryForm: FC<Props> = (props) => {
  const { onSave } = props;
  const router = useRouter();
  const { locales, locale } = router;

  const { t } = useTranslation();

  const [editLocale, setEditLocale] = useState(locale);

  return (
    <div>
      <Select
        variant="standard"
        size="small"
        value={editLocale}
        onChange={(ev) => setEditLocale(ev.target.value)}
        className="mb-16"
      >
        {locales?.map((l) => {
          return (
            <MenuItem key={`edit-locale-${l}`} value={l}>
              {l.toLocaleUpperCase()}
            </MenuItem>
          );
        })}
      </Select>

      <BannerManager className="mb-16" />

      <TranslationInput
        className="mb-16"
        name={'name'}
        label={t('pages:category.categoryName')}
        locale={editLocale}
      />

      <Button
        label={t('common:save')}
        style={'success'}
        variant={'light'}
        size={'sm'}
        className="mt-16 width-100"
        onClick={onSave}
      />
    </div>
  );
};
