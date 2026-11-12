import { Text, View, Button, StyleSheet } from 'react-native';

export default function Bejegyzes({ id, cim, hely, leiras, kedvenc, onKedvencValtas }) {
  return (
    <View style={[styles.card, kedvenc && styles.kedvencCard]}>
      <Text style={styles.title}>
        {cim} {kedvenc ? '⭐' : ''}
      </Text>
      <Text>Helyszín: {hely}</Text>
      {leiras ? <Text>{leiras}</Text> : null}
      <View style={styles.buttonContainer}>
        <Button
          title={kedvenc ? 'Eltávolítás a kedvencekből' : 'Megjelölés kedvencként'}
          onPress={() => onKedvencValtas(id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  kedvencCard: {
    backgroundColor: '#fff9c4',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 5,
  },
});
