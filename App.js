import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import Bejegyzes from './components/Bejegyzes.jsx';

export default function App() {
  const [bejegyzesek, setBejegyzesek] = useState([
    { id: 1, cim: 'Első bejegyzés', hely: 'Budapest', leiras: 'Ez az első bejegyzés leírása.', kedvenc: false },
    { id: 2, cim: 'Második bejegyzés', hely: 'Debrecen', leiras: 'Ez a második bejegyzés leírása.', kedvenc: true },
    { id: 3, cim: 'Harmadik bejegyzés', hely: 'Szeged', leiras: '', kedvenc: false },
  ]);

  const [ujCim, setUjCim] = useState('');
  const [ujHely, setUjHely] = useState('');
  const [ujLeiras, setUjLeiras] = useState('');

  const osszesBejegyzes = bejegyzesek.length;
  const kedvencekSzama = bejegyzesek.filter((b) => b.kedvenc).length;

  const hozzaadBejegyzes = () => {
    if (!ujCim.trim() || !ujHely.trim()) return;
    const ujElem = {
      id: Date.now(),
      cim: ujCim,
      hely: ujHely,
      leiras: ujLeiras,
      kedvenc: false,
    };
    setBejegyzesek((b) => [...b, ujElem]);
    setUjCim('');
    setUjHely('');
    setUjLeiras('');
  };

  const kedvencValtas = (id) => {
    setBejegyzesek((b) =>
      b.map((bejegyzes) => (bejegyzes.id === id ? { ...bejegyzes, kedvenc: !bejegyzes.kedvenc } : bejegyzes)),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Útinapló</Text>
      <Text>Összes bejegyzés: {osszesBejegyzes}</Text>
      <Text>Kedvencek száma: {kedvencekSzama}</Text>

      <View style={styles.form}>
        <TextInput placeholder="Cím" value={ujCim} onChangeText={setUjCim} style={styles.input} />
        <TextInput placeholder="Hely" value={ujHely} onChangeText={setUjHely} style={styles.input} />
        <TextInput placeholder="Leírás (opcionális)" value={ujLeiras} onChangeText={setUjLeiras} style={styles.input} />
        <Button title="Új bejegyzés hozzáadása" onPress={hozzaadBejegyzes} />
      </View>

      {bejegyzesek.map((bejegyzes) => (
        <Bejegyzes
          key={bejegyzes.id}
          id={bejegyzes.id}
          cim={bejegyzes.cim}
          hely={bejegyzes.hely}
          leiras={bejegyzes.leiras}
          kedvenc={bejegyzes.kedvenc}
          onKedvencValtas={kedvencValtas}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  form: {
    marginVertical: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
});
