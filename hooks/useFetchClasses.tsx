import { fetchClasses } from '@/utils/fetchStudent';
import React, { useEffect, useState } from 'react'; // Assuming React usage

interface Klasses {
  id: string;
  institute: string;
  name: string;
  group: string | null;
  branch: string | null;
  teachers: string[];
}

export default function useFetchClasses() {
  const [classes, setClasses] = useState<string[]>([]);

  useEffect(() => {
    const getClasses = async () => {
      try {
        const klasses = await fetchClasses();
        if (klasses instanceof Array) { // Type guard for klasses as array
          const data = klasses.map((klass: Klasses) => klass.name);
          setClasses(data);
        } else {
          setClasses([])
        }
      } catch (err) {
        setClasses([])
      }
    };

    getClasses();
  }, []);

  return classes;
}
