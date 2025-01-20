import { useToast } from '@/components/ui/use-toast';
import { Klasses } from '@/lib/TypeOF';
import { fetchClasses } from '@/utils/fetchStudent';
import React, { useEffect, useState } from 'react'; // Assuming React usage



export default function useFetchClasses() {
  const [classes, setClasses] = useState<string[]>([]);
  const [classObject, setClassObject] = useState<Klasses[] | []>([])
  const {toast} = useToast();

  useEffect(() => {
    const getClasses = async () => {
      try {
        const klasses = await fetchClasses();
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
  }, []);

  return {classes, classObject};
}
