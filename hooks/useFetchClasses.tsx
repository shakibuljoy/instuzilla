import AuthContext from '@/app/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Klasses } from '@/lib/TypeOF';
import { fetchClasses } from '@/utils/fetchStudent';
import React, { cache, useContext, useEffect, useState } from 'react'; // Assuming React usage



export default function useFetchClasses() {
  const [classes, setClasses] = useState<string[]>([]);
  const [classObject, setClassObject] = useState<Klasses[] | []>([])
  const {user} = useContext(AuthContext);
  const {toast} = useToast();

  useEffect(() => {
    const getClasses = async () => {
      try {
        let klasses;
        if(user){
          const authenticated = true;
          klasses = await fetchClasses(undefined, authenticated);
        }else{
          klasses = await fetchClasses();
        }
        
        if (klasses instanceof Array) { // Type guard for klasses as array
          setClassObject(klasses);
          const data = klasses.map((klass: Klasses) => `${klass.full_klass}`);
          setClasses(data);
        } else {
          setClasses([])
          setClassObject([])
        }
      } catch (err: any) {
        setClasses([])
        setClassObject([])
        toast({
          variant: 'destructive',
          title: 'Error',
          description: err.message
        })
        
      }
    };

    getClasses();
  }, [user]);

  return {classes, classObject};
}
