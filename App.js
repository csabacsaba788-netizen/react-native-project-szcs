import { useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Bejegyzes from './components/Bejegyzes.jsx';
import { useBejegyzesek } from './hooks/useBejegyzesek.jsx';

export default function App() {
  const { bejegyzesek, loading, addBejegyzes, toggleKedvenc } = useBejegyzesek();

  const [ujCim, setUjCim] = useState('');
  const [ujHely, setUjHely] = useState('');
  const [ujLeiras, setUjLeiras] = useState('');

  const handleHozzaad = () => {
    if (!ujCim.trim() || !ujHely.trim()) {
      return;
    }
    addBejegyzes(ujCim, ujHely, ujLeiras);
    setUjCim('');
    setUjHely('');
    setUjLeiras('');
  };

  const osszesSzam = bejegyzesek.length;
  const kedvencSzam = bejegyzesek.filter((item) => item.kedvenc).length;

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.loadingText}>Adatok betöltése...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Útinapló</Text>
        <Text style={styles.statsText}>
          Összes bejegyzés: {osszesSzam} | Kedvenc: {kedvencSzam}
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Új bejegyzés hozzáadása</Text>
        <TextInput style={styles.input} placeholder="Cím..." value={ujCim} onChangeText={setUjCim} />
        <TextInput style={styles.input} placeholder="Helyszín..." value={ujHely} onChangeText={setUjHely} />
        <TextInput
          style={styles.input}
          placeholder="Leírás (opcionális)..."
          value={ujLeiras}
          onChangeText={setUjLeiras}
        />
        <Button title="Hozzáadás" onPress={handleHozzaad} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {bejegyzesek.map((item) => (
          <Bejegyzes
            key={item.id}
            cim={item.cim}
            hely={item.hely}
            leiras={item.leiras}
            kedvenc={item.kedvenc}
            onToggleKedvenc={() => toggleKedvenc(item.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  header: {
    padding: 16,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statsText: {
    fontSize: 14,
    color: '#e3f2fd',
    marginTop: 4,
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  scrollContainer: {
    paddingBottom: 16,
  },
});
