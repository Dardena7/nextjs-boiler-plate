export const getStylesCSSClasses = (
  classNames: string[],
  styles: { readonly [key: string]: string }
) => {
  const formattedClassNames = classNames.map((style: string) => styles[style]);
  return formattedClassNames.join(' ');
};

export const priceFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
});
