import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  toByteArray as rnqbToByteArray,
  fromByteArray as rnqbFromByteArray,
} from "react-native-quick-base64";
import { toByteArray, fromByteArray } from "base64-js";
import { Base64 } from "js-base64";
import { useCallback, useState } from "react";

// base 64 hello world
const TO_BE_ENCODED = "aGVsbG8gd29ybGQ=";
const ITERATIONS = 100000;

type Base64Implentation =
  | "react-native-quick-base64"
  | "base64-js"
  | "js-base64";
type PerfTest = Record<Base64Implentation, () => void>;

const perfTests: PerfTest = {
  "react-native-quick-base64": () => {
    const encoded = rnqbToByteArray(TO_BE_ENCODED);
    rnqbFromByteArray(encoded);
  },
  "base64-js": () => {
    const encoded = toByteArray(TO_BE_ENCODED);
    fromByteArray(encoded);
  },
  "js-base64": () => {
    const encoded = Base64.toUint8Array(TO_BE_ENCODED);
    Base64.fromUint8Array(encoded);
  },
};

export default function App() {
  const [results, setResults] = useState<
    Record<Base64Implentation, number | undefined>
  >({
    "react-native-quick-base64": undefined,
    "base64-js": undefined,
    "js-base64": undefined,
  });

  const runPerfTest = useCallback((impl: Base64Implentation) => {
    const start = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
      perfTests[impl]();
    }
    const end = performance.now();
    setResults((prev) => ({
      ...prev,
      [impl]: end - start,
    }));
  }, []);

  return (
    <View style={styles.container}>
      {Object.keys(results).map((impl) => (
        <View key={impl} style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => runPerfTest(impl as Base64Implentation)}
            style={styles.button}
          >
            <Text>{`Run ${impl}`}</Text>
          </TouchableOpacity>
          <Text>Results:</Text>
          {results[impl as Base64Implentation] ? (
            <>
              <Text>
                {results[impl as Base64Implentation]!.toFixed(2)}ms for{" "}
                {ITERATIONS} roundtrips
              </Text>
              <Text>
                {(results[impl as Base64Implentation]! / ITERATIONS).toFixed(4)}
                ms for a single roundtrip
              </Text>
            </>
          ) : (
            <Text>Not run yet</Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    paddingHorizontal: 16,
    gap: 16,
  },
  itemContainer: {
    gap: 8,
  },
  button: {
    flexShrink: 1,
    backgroundColor: "lightblue",
    padding: 8,
    borderRadius: 8,
  },
});
