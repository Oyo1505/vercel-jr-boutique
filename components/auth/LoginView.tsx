// eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus

import { validate } from 'email-validator';
import { useCallback, useEffect, useState } from 'react';
import useLogin from '../../app/api/auth/use-login';
import Button from '../ui/Button/Button';
import Input from '../ui/Input/Input';
import Logo from '../ui/Logo/Logo';
import { useUI } from '../ui/context';

const LoginView: React.FC = () => {
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [dirty, setDirty] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { setModalView, closeModal } = useUI();

  const login = useLogin();

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (!dirty && !disabled) {
      setDirty(true);
      handleValidation();
    }

    try {
      setLoading(true);
      setMessage('');
      await login({
        email,
        password
      });
      closeModal();
    } catch ({ errors }) {
      if (errors instanceof Array) {
        setMessage(errors.map((e: any) => e.message).join('<br/>'));
      } else {
        setMessage('Unexpected error');
      }
      setDisabled(false);
    } finally {
      setLoading(false);
    }
  };

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password);
    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email) || password.length < 7 || !validPassword);
    }
  }, [email, password, dirty]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  return (
    <form onSubmit={handleLogin} className="flex w-80 flex-col justify-between p-3">
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-3">
        {message && (
          <div className="text-red border-red border p-3">
            {message}. Did you{' '}
            <a
              className="text-accent-9 inline cursor-pointer font-bold hover:underline"
              onClick={() => setModalView('FORGOT_VIEW')}
            >
              forgot your password?
            </a>
          </div>
        )}
        <Input type="email" placeholder="Email" onChange={setEmail} />
        <Input type="password" placeholder="Password" onChange={setPassword} />

        <Button variant="slim" type="submit" loading={loading} disabled={disabled}>
          Log In
        </Button>
        <div className="pt-1 text-center text-sm">
          <span className="text-accent-7">Don't have an account?</span>{' '}
          <a
            className="text-accent-9 cursor-pointer font-bold hover:underline"
            onClick={() => setModalView('SIGNUP_VIEW')}
          >
            Sign Up
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginView;
