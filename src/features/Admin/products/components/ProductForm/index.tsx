import { Button } from "@/core/components/Button";
import { MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useTranslation } from "next-i18next";
import { CategoriesSelect } from "@/core/forms/product-form/questions/CategoriesSelect";
import { TranslationInput } from "@/core/forms/_components/TranslationInput";
import { FileDropInput } from "@/core/forms/_components/FileDropInput";
import { ImagesManager } from "@/core/forms/product-form/questions/ImagesManager";

type Props = {
  onSave: () => void;
  isValid: boolean;
};

export const ProductForm: FC<Props> = (props) => {
  const { onSave, isValid } = props;
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

      <TranslationInput
        className="mb-16"
        name={"name"}
        label={t("pages:product.productName")}
        locale={editLocale}
      />

      <CategoriesSelect className="mb-16" />

      <ImagesManager className="mb-16" />

      <FileDropInput name={"images"} />

      <Button
        label={t("common:save")}
        style={"success"}
        variant={"light"}
        size={"sm"}
        className="mt-16 width-100"
        onClick={onSave}
        disabled={!isValid}
      />
    </div>
  );
};
