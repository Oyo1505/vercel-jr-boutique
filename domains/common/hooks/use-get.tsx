import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponseHeaders } from 'axios';
import { useEffect, useState } from 'react';
import HttpStatus from '../constant/httpStatus';


export interface IUseGetParameters<TData, TOnFinishGetParameters = void>
{
  url?: string,
  config?: AxiosRequestConfig,
  dependencies? : any[],
  /// TODO: il aurait fallu que onSuccess et onError prennent un objet en paramètre
  // eslint-disable-next-line no-unused-vars
  onSuccess? : (data : TData, parameters?: TOnFinishGetParameters, status?: HttpStatus, headers?: AxiosResponseHeaders) => void,

  // eslint-disable-next-line no-unused-vars
  onError? : (error : any, parameters?: TOnFinishGetParameters, status?: HttpStatus) => void,
  // Nécéssaire pour réaliser de l'UI optimiste : c’est à dire partir du principe que votre requête va fonctionner et la rollback en cas d’erreur, cela permet de mettre à jour votre UI tout de suite sans devoir à attendre que votre requête se termine. On peut utiliser de l’UI optimiste que dans les cas on peut prévoir à l’avance le résultat de la réponse de succès. C’est également une alternative à ajouter des loadeurs lorsque la requête est entrain de se lancer.
  // eslint-disable-next-line no-unused-vars
  onBeforeGet? : (parameters?: TOnFinishGetParameters) => void,
  onFinish?: () => void,
  httpClient? : AxiosInstance,
  enabled?: boolean
}

interface IUseGetResponse<TData, TOnFinishGetParameters = void>
{
  // eslint-disable-next-line
  data? : TData,
  isLoading : boolean,
  isFetched: boolean,
  // eslint-disable-next-line
  error?: any,
  isNotFound: boolean,
  status?: HttpStatus,
  // eslint-disable-next-line no-unused-vars
  refetch : (refetchParameters? : IRefetchParameters<TOnFinishGetParameters>) => void,
}

export interface IRefetchParameters<TData, TOnFinishGetParameters = void> {
  refetchUrl? : string,
  refetchConfig? : AxiosRequestConfig
  callbacksParameters?: TOnFinishGetParameters // paramètres applicable à onSuccess, onError, onBeforeGet
  // eslint-disable-next-line no-unused-vars
  onSuccess? : (data : TData, parameters?: TOnFinishGetParameters, status?: HttpStatus, headers?: AxiosResponseHeaders) => void,

  // eslint-disable-next-line no-unused-vars
  onError? : (error : any, parameters?: TOnFinishGetParameters, status?: HttpStatus) => void,
  // Nécéssaire pour réaliser de l'UI optimiste : c’est à dire partir du principe que votre requête va fonctionner et la rollback en cas d’erreur, cela permet de mettre à jour votre UI tout de suite sans devoir à attendre que votre requête se termine. On peut utiliser de l’UI optimiste que dans les cas on peut prévoir à l’avance le résultat de la réponse de succès. C’est également une alternative à ajouter des loadeurs lorsque la requête est entrain de se lancer.
  // eslint-disable-next-line no-unused-vars
  onBeforeGet? : (parameters?: TOnFinishGetParameters) => void,
  onFinish?: () => void,
}

const useGet = <TData, TOnFinishGetParameters = void>(
  {
    url,
    config,
    dependencies = [],
    onSuccess,
    onError,
    onFinish,
    onBeforeGet,
    httpClient,
    enabled = true,
  } : IUseGetParameters<TData, TOnFinishGetParameters>,
) => {
  const [response, setResponse] = useState<IUseGetResponse<TData, TOnFinishGetParameters>>({
    isLoading: false,
    isFetched: false,
    isNotFound: false,
    refetch: () => {},
  });

  const refetch = async (refetchParameters? : IRefetchParameters<TData, TOnFinishGetParameters>) => {
    try {
      onBeforeGet?.(refetchParameters?.callbacksParameters);
      refetchParameters?.onBeforeGet?.(refetchParameters?.callbacksParameters);

      setResponse({
        ...response,
        error: undefined,
        isLoading: true,
      });
      const { data, status, headers } = await (httpClient ?? axios).get((refetchParameters?.refetchUrl ?? url)!, refetchParameters?.refetchConfig ?? config);

      onSuccess?.(data, refetchParameters?.callbacksParameters, status, headers);
      refetchParameters?.onSuccess?.(data, refetchParameters?.callbacksParameters, status, headers);

      setResponse({
        ...response,
        isLoading: false,
        status,
        isNotFound: false,
        data,
        isFetched: true,
      });
    } catch (error : any) {
      const status = error?.response?.status;

      onError?.(error, refetchParameters?.callbacksParameters, status);
      refetchParameters?.onError?.(error, refetchParameters?.callbacksParameters, status);

      setResponse({
        ...response,
        isLoading: false,
        isNotFound: status === HttpStatus.NOT_FOUND,
        status,
        data: undefined,
        error,
      });
    } finally {
      onFinish?.();
      refetchParameters?.onFinish?.();
    }
  };

  useEffect(() => {
    if (enabled) refetch();
    // eslint-disable-next-line
  }, [enabled, ...dependencies]);

  return { ...response, refetch };
};

export default useGet;
