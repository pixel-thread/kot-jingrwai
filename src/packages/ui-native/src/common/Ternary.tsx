type TernaryProps = {
  condition: boolean;
  ifTrue: React.ReactNode;
  ifFalse: React.ReactNode;
};

export const Ternary = ({ condition, ifTrue, ifFalse }: TernaryProps): React.ReactNode => {
  return condition ? ifTrue : ifFalse;
};
