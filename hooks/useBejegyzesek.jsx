import { useEffect, useRef, useState } from 'react';

export function useBejegyzesek() {
  const [bejegyzesek, setBejegyzesek] = useState([]);
  const [loading, setLoading] = useState(true);
  const kovetkezoId = useRef(4);

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
          leiras: '',
          kedvenc: false,
        },
      ]);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  function addBejegyzes(cim, hely, leiras = '') {
    const ujBejegyzes = {
      id: String(kovetkezoId.current++),
      cim,
      hely,
      leiras,
      kedvenc: false,
    };

    setBejegyzesek((elozo) => [...elozo, ujBejegyzes]);
  }

  function toggleKedvenc(id) {
    setBejegyzesek((elozo) =>
      elozo.map((item) =>
        item.id === id ? { ...item, kedvenc: !item.kedvenc } : item
      )
    );
  }

  return { bejegyzesek, loading, addBejegyzes, toggleKedvenc };
}