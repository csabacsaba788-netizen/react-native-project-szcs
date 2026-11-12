import { useState, useEffect } from 'react';

export function useBejegyzesek() {
  const [bejegyzesek, setBejegyzesek] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBejegyzesek([
        {
          id: '1',
          cim: 'Balatoni naplemente',
          hely: 'Balatonfüred',
          leiras: 'Csodás kilátás a Tagore sétányról.',
          kedvenc: true,
        },
        {
          id: '2',
          cim: 'Városnézés',
          hely: 'Budapest',
          leiras: 'Séta a Várkert Bazárban és a Lánchídon.',
          kedvenc: false,
        },
        {
          id: '3',
          cim: 'Hétvégi pihenés',
          hely: 'Eger',
          kedvenc: false,
        },
      ]);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const addBejegyzes = (cim, hely, leiras = '') => {
    const ujElem = {
      id: Date.now().toString(),
      cim,
      hely,
      leiras,
      kedvenc: false,
    };
    setBejegyzesek((b) => [...b, ujElem]);
  };

  const toggleKedvenc = (id) => {
    setBejegyzesek((b) => b.map((item) => (item.id === id ? { ...item, kedvenc: !item.kedvenc } : item)));
  };

  return {
    bejegyzesek,
    loading,
    addBejegyzes,
    toggleKedvenc,
  };
}
