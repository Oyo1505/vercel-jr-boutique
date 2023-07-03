// eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
import { validate } from 'email-validator';
import { FC, useCallback, useEffect, useState } from 'react';
import Button from '../ui/Button/Button';
import Input from '../ui/Input/Input';
import Logo from '../ui/Logo/Logo';
import { useUI } from '../ui/context';

const ForgotPassword: FC = () => {
  // Form State
  const [email, setEmail] = useState('');
  const [loading] = useState(false);
  const [message] = useState('');
  const [dirty, setDirty] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { setModalView } = useUI();

  const handleResetPassword = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (!dirty && !disabled) {
      setDirty(true);
      handleValidation();
    }
  };

  const handleValidation = useCallback(() => {
    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email));
    }
  }, [email, dirty]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  return (
    <form onSubmit={handleResetPassword} className="flex w-80 flex-col justify-between p-3">
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-4">
        {message && <div className="text-red border-red border p-3">{message}</div>}

        <Input placeholder="Email" onChange={setEmail} type="email" />
        <div className="flex w-full flex-col pt-2">
          <Button variant="slim" type="submit" loading={loading} disabled={disabled}>
            Recover Password
          </Button>
        </div>

        <span className="pt-3 text-center text-sm">
          <span className="text-accent-7">Do you have an account?</span>{' '}
          <a
            role="submit"
            className="text-accent-9 cursor-pointer font-bold hover:underline"
            onClick={() => setModalView('LOGIN_VIEW')}
            onKeyDown={() => setModalView('LOGIN_VIEW')}
          >
            Log In
          </a>
        </span>
      </div>
    </form>
  );
};

export default ForgotPassword;
