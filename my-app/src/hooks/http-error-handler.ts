import {useState,useEffect} from 'react';
import { AxiosInstance } from 'axios';

export default (httpClient:AxiosInstance):
[string,()=>void]=>{
    const [error, setError] = useState<string>("");

    const reqInterceptor: number = httpClient.interceptors.request.use((req) => {
      setError("");
      return req;
    });
    const resInterceptor: number = httpClient.interceptors.response.use(
      (res) => res,
      (error) => {
        setError(error.message);
      }
    );

    useEffect(() => {
      return () => {
        httpClient.interceptors.request.eject(reqInterceptor);
        httpClient.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);
    const errorConfirmedHandler = ():void => {
      setError("");
    };
    return [error,errorConfirmedHandler]
}