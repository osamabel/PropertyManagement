
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("HEREERERE")
        router.push('/');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
