import { useState } from 'react';
import { RolesType } from '../Types/RoleType';
import FetchData from './FetchData';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../Types/UserType';
import ErrorMessage from './ErrorMessage';
import FormInput from './FormInput';
import { URL } from '../helpers/getUrl';

type NewUserType = {
  username: string;
  password?: string;
  confirmPassword?: string;
  role: string;
};

type UserForm = {
  user?: UserType;
  apiEndPoint: string;
  fetchMethod: 'PUT' | 'POST';
};

type ResponseError = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
};

export default function UserForm({ apiEndPoint, fetchMethod, user }: UserForm) {
  const { data } = FetchData<RolesType[]>(`${URL}/cms/roles`);
  const [userData, setUserData] = useState<NewUserType | undefined>(user ?? undefined);
  const [responseError, setResponseError] = useState<ResponseError | undefined>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="form-util">
      <FormInput
        name="username"
        placeholder="Username"
        value={userData?.username}
        onChange={(e) => handleOnChange(e, 'username')}>
        <ErrorMessage error={responseError?.username} />
      </FormInput>
      {!user && (
        <>
          <FormInput
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleOnChange(e, 'password')}>
            <ErrorMessage error={responseError?.password} />
          </FormInput>
          <FormInput
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => handleOnChange(e, 'confirmPassword')}>
            <ErrorMessage error={responseError?.confirmPassword} />
          </FormInput>
        </>
      )}
      {data.length && (
        <div className="user-roles">
          Pick a user role:
          {data.map((role) => (
            <FormInput
              key={role.role}
              type="radio"
              name="role"
              title={role.role}
              id={role.role}
              value={role.role}
              checked={userData?.role === role.role}
              onChange={(e) => handleOnChange(e, 'role')}></FormInput>
          ))}
          <ErrorMessage error={responseError?.role} />
        </div>
      )}
      <button disabled={loading}>Submit</button>
    </form>
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(apiEndPoint, {
        method: fetchMethod,
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const resResult = await res.json();

      if (res.status >= 400) {
        setResponseError(resResult);
        return;
      }

      navigate('/users');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement>,
    prop: 'username' | 'password' | 'confirmPassword' | 'role'
  ) {
    setUserData({ ...userData, [prop]: e.target.value } as NewUserType);
  }
}
