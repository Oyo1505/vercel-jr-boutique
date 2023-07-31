import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import HttpStatus from '../constant/httpStatus';


export interface IUseMutationRequest<TData, TOnFinishGetParameters = void> {
  httpClient?: AxiosInstance,
  config?: AxiosRequestConfig,
  /// TODO: il aurait fallu que onSuccess et onError prennent un objet en paramètre
  // eslint-disable-next-line no-unused-vars
  onSuccess?: (data?: TData, parameters?: TOnFinishGetParameters, status?: HttpStatus) => void,
  // eslint-disable-next-line no-unused-vars
  onError?: (error: any, parameters?: TOnFinishGetParameters, status?: HttpStatus) => void,
  // Nécéssaire pour réaliser de l'UI optimiste : c’est à dire partir du principe que votre requête va fonctionner et la rollback en cas d’erreur, cela permet de mettre à jour votre UI tout de suite sans devoir à attendre que votre requête se termine. On peut utiliser de l’UI optimiste que dans les cas on peut prévoir à l’avance le résultat de la réponse de succès. C’est également une alternative à ajouter des loadeurs lorsque la requête est entrain de se lancer.
  onFinish?:()=>void,
  // eslint-disable-next-line no-unused-vars
  onBeforeMutate?: (parameters?: TOnFinishGetParameters) => void,
  mutateOnMount?: boolean,
  enabled?: boolean
}

interface IUseMutationResponse<TData, TOnFinishGetParameters> {
  // eslint-disable-next-line no-unused-vars
  mutate: (mutateParameters?: IMutateParameters<TOnFinishGetParameters>) => Promise<TData | undefined>
  data?: TData,
  isCalled: boolean,
  isLoading: boolean,
  // eslint-disable-next-line
  error?: any,
  isNotFound?: boolean,
  status?: HttpStatus,
}

export interface IMutateParameters<TData, TOnFinishGetParameters = void> {
  config?: AxiosRequestConfig,
  url?: string,
  callbacksParameters?: TOnFinishGetParameters // paramètres applicable à onSuccess, onError, onBeforeMutate
  // eslint-disable-next-line no-unused-vars
  onSuccess?: (data?: TData, parameters?: TOnFinishGetParameters, status?: HttpStatus) => void,
  // eslint-disable-next-line no-unused-vars
  onError?: (error: any, parameters?: TOnFinishGetParameters, status?: HttpStatus) => void,
  // Nécéssaire pour réaliser de l'UI optimiste : c’est à dire partir du principe que votre requête va fonctionner et la rollback en cas d’erreur, cela permet de mettre à jour votre UI tout de suite sans devoir à attendre que votre requête se termine. On peut utiliser de l’UI optimiste que dans les cas on peut prévoir à l’avance le résultat de la réponse de succès. C’est également une alternative à ajouter des loadeurs lorsque la requête est entrain de se lancer.
  onFinish?:()=>void,
  // eslint-disable-next-line no-unused-vars
  onBeforeMutate?: (parameters?: TOnFinishGetParameters) => void,
}

const UseMutation = <TData, TOnFinishGetParameters = void>({
  config,
  onSuccess,
  onError,
  onFinish,
  onBeforeMutate,
  httpClient,
  mutateOnMount,
  enabled,
}: IUseMutationRequest<TData, TOnFinishGetParameters>) => {
  const [response, setResponse] = useState<IUseMutationResponse<TData, TOnFinishGetParameters>>({
    // eslint-disable-next-line no-promise-executor-return
    mutate: async () => new Promise((resolve) => resolve(undefined)),
    isCalled: false,
    isLoading: false,
  });

  // @ts-ignore
  async function mutate(mutateParameters? : IMutateParameters<TData, TOnFinishGetParameters>) : Promise<TData|undefined> {
    try {
      onBeforeMutate?.(mutateParameters?.callbacksParameters);
      mutateParameters?.onBeforeMutate?.(mutateParameters?.callbacksParameters);

      setResponse({
        ...response,
        error: undefined,
        isLoading: true,
        isNotFound: false,
        isCalled: false,
      });

      const data = await (httpClient ?? axios).request(
        {
          ...config,
          ...mutateParameters?.config,
          url: mutateParameters?.url ?? mutateParameters?.config?.url ?? config?.url,
        },
      );

      onSuccess?.(data?.data, mutateParameters?.callbacksParameters, data?.status);
      mutateParameters?.onSuccess?.(data?.data, mutateParameters?.callbacksParameters, data?.status);

      setResponse({
        ...response,
        data: data?.data,
        isCalled: true,
        isLoading: false,
        isNotFound: false,
        status: data?.status,
        error: false,
      });

    } catch (error: any) {
      const status = error?.response?.status;

      onError?.(error, mutateParameters?.callbacksParameters, status);
      mutateParameters?.onError?.(error, mutateParameters?.callbacksParameters, status);

      setResponse({
        ...response,
        data: undefined,
        isLoading: false,
        isNotFound: status === HttpStatus.NOT_FOUND,
        status,
        error,
      });
    } finally {
      onFinish?.();
      mutateParameters?.onFinish?.();
    }
  }

  useEffect(() => { if (mutateOnMount) mutate(); }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (enabled) mutate(); }, [enabled]);

  return {
    ...response,
    mutate,
  };
};

export default UseMutation;
