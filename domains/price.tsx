const Price = ({
  amount,
  currencyCode = '€',
  className,
  ...props
}: {
  amount: string;
  currencyCode: string;
  className?: string | undefined;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} {...props} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(parseFloat(amount))}`}
  </p>
);

export default Price;
